import { Schema, SchemaFactory, Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocmuent = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ required: true })
  libelle: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  pu: number;

  @Prop({ required: true })
  stock: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
