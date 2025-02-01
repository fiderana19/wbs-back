import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Client } from './client.schema';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema()
export class Transaction {
  @Prop({ required: true })
  date_transaction: Date;

  @Prop({ required: true })
  ref: string;

  @Prop({ required: true })
  montant_transaction: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true })
  client: Client;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
