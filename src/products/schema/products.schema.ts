import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Products extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  code: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ default: true })
  status: boolean;

  @Prop({ default: 0, min: 0 })
  stock: number;

  @Prop({ default: 'uncategorized' })
  category: string;

  @Prop({ default: [] })
  thumbnails: string[];
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
