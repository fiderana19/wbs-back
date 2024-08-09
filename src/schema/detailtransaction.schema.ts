import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from './product.schema';
import { Transaction } from './transaction.schema';

export type DetailTransactionDocument = HydratedDocument<DetailTransaction>;

@Schema()
export class DetailTransaction {
  @Prop({ required: true })
  quantite: number;

  @Prop({ required: true })
  montant_brut: number;

  @Prop({ required: true })
  remise: number;

  @Prop({ required: true })
  montant_total: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Product" })
  product: Product;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Transaction" })
  transaction: Transaction;
}

export const DetailTransactionSchema =
  SchemaFactory.createForClass(DetailTransaction);
