import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

export type ClientDocument = HydratedDocument<Client>;

@Schema()
export class Client {
  @Prop({ required: true })
  nom_client: string;

  @Prop({ required: true })
  adresse_client: string;

  @Prop({ required: false })
  mail_client: string;

  @Prop({ required: true })
  telephone_client: string;
}

export const ClientSchema = SchemaFactory.createForClass(Client);
