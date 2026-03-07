import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';

@Schema()
export class Users extends Document {
  @Prop({})
  first_name: string;

  @Prop({})
  last_name: string;

  @Prop({
    required: [true, 'Email is required'],
    unique: [true, 'Email already exists'],
  })
  email: string;

  @Prop({ required: [true, 'Password is required'] })
  password: string;

  @Prop({ default: 'user', enum: ['user', 'admin'] })
  role: string;

  @Prop({ default: 0, min: [0, 'Age must be a positive number'] })
  age: number;

  @Prop({ type: SchemaTypes.ObjectId, default: null, ref: 'carts' })
  cart: string;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
