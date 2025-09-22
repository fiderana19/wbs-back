import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DetailTransaction } from 'src/schema/detailtransaction.schema';
import { Product } from 'src/schema/product.schema';
import { CreateDetailTransactionDto } from 'src/dto/create-detailtransaction.dto';
import { Transaction } from 'src/schema/transaction.schema';

@Injectable()
export class DetailtransactionService {
  constructor(
    @InjectModel(DetailTransaction.name)
    private detailTransationModel: Model<DetailTransaction>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  async getAll(): Promise<any> {
    const details = await this.detailTransationModel
      .find()
      .populate('product', 'libelle')
      .exec();

    return details.map((detail) => ({
      product: detail.product ? detail.product.libelle : '',
      quantite: detail.quantite,
      montant_brut: detail.montant_brut,
      remise: detail.remise,
      montant_total: detail.montant_total,
    }));
  }

  async getByIdTrans(transaction: string): Promise<any> {
    const detail = await this.detailTransationModel
      .find({ transaction })
      .populate('product', 'libelle')
      .exec();

    return detail.map((detail) => ({
      product: detail.product ? detail.product.libelle : '',
      quantite: detail.quantite,
      montant_brut: detail.montant_brut,
      remise: detail.remise,
      montant_total: detail.montant_total,
    }));
  }

  async create(
    createDetailTransactionDto: CreateDetailTransactionDto,
  ): Promise<DetailTransaction> {
    const product = await this.productModel.findById(
      createDetailTransactionDto.product,
    );
    const transaction = await this.transactionModel.findById(
      createDetailTransactionDto.transaction,
    );

    if (!product) {
      throw new Error("Produit introuvable !");
    }
    await product.save();

    //Automatic calcul of amount
    const montant_brut = product.pu * createDetailTransactionDto.quantite;
    const montant_total =
      montant_brut - (montant_brut * createDetailTransactionDto.remise) / 100;

    //Updating the amount level
    if (!transaction) {
      throw new Error("Transaction introuvable !");
    }
    transaction.montant_transaction += montant_total;
    await transaction.save();

    //creating the detail
    const createdDetail = new this.detailTransationModel({
      quantite: createDetailTransactionDto.quantite,
      montant_brut,
      remise: createDetailTransactionDto.remise,
      montant_total,
      product: createDetailTransactionDto.product,
      transaction: createDetailTransactionDto.transaction,
    });
    return await createdDetail.save();
  }
}
