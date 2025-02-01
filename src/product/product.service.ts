import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { DetailTransaction } from 'src/schema/detailtransaction.schema';
import { Product } from 'src/schema/product.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(DetailTransaction.name)
    private detailTransationModel: Model<DetailTransaction>,
  ) {}

  async getAll(): Promise<Product[]> {
    return await this.productModel.find().exec();
  }

  async total(): Promise<number> {
    return await this.productModel.countDocuments().exec();
  }

  async getpuById(id: string): Promise<any> {
    const product = await this.productModel.findById(id).exec();
    return { pu: product.pu };
  }

  async getById(id: string): Promise<Product> {
    return await this.productModel.findById(id).exec();
  }

  async create(data): Promise<Product> {
    const newProduct = new this.productModel(data);
    return await newProduct.save();
  }

  async delete(id: string): Promise<any> {
    await this.detailTransationModel.deleteMany({ id }).exec();

    await this.productModel.findByIdAndDelete(id);
  }

  async update(id: string, updateItemDto: UpdateProductDto): Promise<Product> {
    return this.productModel
      .findByIdAndUpdate(id, updateItemDto, { new: true })
      .exec();
  }
}
