/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Model, Types } from 'mongoose';
import { Users } from '../schema/users.schema';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private usersModel: Model<Users>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Users> {
    try {
      const createdUser = new this.usersModel(createUserDto);
      return await createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException(`Email already exists`);
      }
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Users[]> {
    return this.usersModel.find().exec();
  }

  async findByEmail(email: string): Promise<Users> {
    const user = await this.usersModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findOne(id: string): Promise<Users> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid user ID');
      }
      const user = await this.usersModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Users> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid user ID');
      }
      const updatedUser = await this.usersModel
        .findByIdAndUpdate(id, updateUserDto)
        .exec();
      if (!updatedUser) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return updatedUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: string): Promise<Users> {
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid user ID');
      }
      const deletedUser = await this.usersModel.findByIdAndDelete(id).exec();
      if (!deletedUser) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return deletedUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
