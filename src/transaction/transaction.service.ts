import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTransactionDto } from 'src/dto/create-transaction.dto';
import { UpdateTransactionDto } from 'src/dto/update-transaction.dto';
import { DetailTransaction } from 'src/schema/detailtransaction.schema';
import { Transaction } from 'src/schema/transaction.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(DetailTransaction.name)
    private detailTransationModel: Model<DetailTransaction>,
    ) {}

  async getAll(): Promise<Transaction[]> {
    return await this.transactionModel.find().exec();
  }

  async total(): Promise<number> {
    return await this.transactionModel.countDocuments().exec();
  }

  async getTransactionWithClient(): Promise<any> {
    const transactionsWithClient = await this.transactionModel
      .find()
      .populate('client', 'nom_client adresse_client mail_client telephone_client')
      .exec();

    return await transactionsWithClient.map((transaction) => ({
      _id: transaction._id,
      date_transaction: transaction.date_transaction,
      ref: transaction.ref,
      montant_transaction: transaction.montant_transaction,
      nom_client: transaction.client ? transaction.client.nom_client : '',
      adresse_client: transaction.client ? transaction.client.adresse_client : '',
      mail_client: transaction.client ? transaction.client.mail_client : '',
      telephone_client: transaction.client ? transaction.client.telephone_client : '',
    }));
  }

  async getTransactionWithClientFacture(id: string): Promise<any> {
    const transactionsWithClient = await this.transactionModel
      .find({ _id: id })
      .populate('client', 'nom_client adresse_client mail_client telephone_client')
      .exec();

    return await transactionsWithClient.map((transaction) => ({
      _id: transaction._id,
      date_transaction: transaction.date_transaction,
      ref: transaction.ref,
      montant_transaction: transaction.montant_transaction,
      nom_client: transaction.client ? transaction.client.nom_client : '',
      adresse_client: transaction.client ? transaction.client.adresse_client : '',
      mail_client: transaction.client ? transaction.client.mail_client : '',
      telephone_client: transaction.client ? transaction.client.telephone_client : '',
    }));
  }

  async getTransactionWithClientById(id: string): Promise<any> {
    const transactionsWithClient = await this.transactionModel
      .find({ _id: id })
      .populate('client', 'nom_client')
      .exec();

    return await transactionsWithClient.map((transaction) => ({
      _id: transaction._id,
      date_transaction: transaction.date_transaction,
      ref: transaction.ref,
      montant_transaction: transaction.montant_transaction,
      nom_client: transaction.client ? transaction.client.nom_client : '',
    }));
  }

  async getById(id: string): Promise<Transaction> {
    return await this.transactionModel.findById(id).exec();
  }

  async getLatest(limit: number): Promise<any[]> {
    const latest = await this.transactionModel
      .find()
      .sort({ date_transaction: -1 }) // Triez par ordre décroissant pour obtenir les dernières transactions en premier.
      .limit(limit)
      .populate('client', 'nom_client')
      .exec();

    return await latest.map((transaction) => ({
      _id: transaction._id,
      date_transaction: transaction.date_transaction,
      ref: transaction.ref,
      montant_transaction: transaction.montant_transaction,
      nom_client: transaction.client ? transaction.client.nom_client : '',
    }));
  }

  async create(createTransaction: CreateTransactionDto): Promise<Transaction> {
    const currentDate = new Date();
    const y = currentDate.getFullYear().toString();
    const random9DigitNumber = Math.floor(Math.random() * 90000 + 10000);
    const ref = y + random9DigitNumber;

    const newTransaction = new this.transactionModel({
      date_transaction: createTransaction.date_transaction,
      ref,
      montant_transaction: 0,
      client: createTransaction.client,
    });
    return await newTransaction.save();
  }

  async seachTransaction(startDate: Date, endDate: Date): Promise<any> {
    const transactions = await this.transactionModel
      .find({ date_transaction: { $gte: startDate, $lte: endDate } })
      .populate('client', 'nom_client')
      .exec();

    return await transactions.map((transaction) => ({
      _id: transaction._id,
      date_transaction: transaction.date_transaction,
      ref: transaction.ref,
      montant_transaction: transaction.montant_transaction,
      nom_client: transaction.client ? transaction.client.nom_client : '',
    }));
  }

  async update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
  ): Promise<Transaction> {
    return await this.transactionModel
      .findByIdAndUpdate(id, updateTransactionDto, { new: true })
      .exec();
  }
  async delete(id: string): Promise<Transaction> {
    await this.detailTransationModel.deleteMany({ id }).exec();

    return await this.transactionModel.findByIdAndDelete(id);
  }

}
