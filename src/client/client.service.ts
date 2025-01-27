import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateClientDto } from 'src/dto/update-client.dto';
import { Client } from 'src/schema/client.schema';
import { Transaction } from 'src/schema/transaction.schema';

@Injectable()
export class ClientService {
  constructor(@InjectModel(Client.name) private clientModel: Model<Client>,
  @InjectModel(Transaction.name) private transactionModel: Model<Transaction>) {}

  async getAll(): Promise<Client[]> {
    return await this.clientModel.find().exec();
  }

  async total(): Promise<number> {
    const count = await this.clientModel.countDocuments().exec();
    return count;
  }

  async getById(id: number): Promise<Client> {
    return await this.clientModel.findById(id).exec();
  }

  async create(data): Promise<any> {
    const newClient = new this.clientModel(data);
    return await newClient.save();
  }

  async findByEmail(email: string): Promise<Client> {
    return await this.clientModel.findOne({ email }).exec();
  }

  async update(id: string, updateItemDto: UpdateClientDto): Promise<Client> {
    return this.clientModel
      .findByIdAndUpdate(id, updateItemDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Client> {
    await this.transactionModel.deleteMany({ id }).exec();

    return this.clientModel.findByIdAndDelete(id);
  }
}
