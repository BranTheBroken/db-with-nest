import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import format from 'date-fns/format';
import { Model } from 'mongoose';
import CreateUserDto from 'src/dtos/create-user.dto';
import UpdateUserDto from 'src/dtos/update-user.dto';
import { User } from 'src/models/user.model';
import MongoODM from './mongo-odm.interface';

@Injectable()
export class MongoOdmService implements MongoODM {
  private logger = new Logger(MongoOdmService.name);

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  create(userData: CreateUserDto) {
    const user = userData;
    user['birthday'] = format(new Date(userData.birthday), 'dd-MM-yyyy');

    const userWithValidBirthday = new this.userModel(user);
    this.logger.log(userWithValidBirthday);
    userWithValidBirthday.save();
  }

  async getAll() {
    return await this.userModel.find();
  }

  async findById(id: string): Promise<User> {
    const user = await this.userModel.findById(id);

    try {
      if (!user) {
        throw new Error('User not found in database.');
      }
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async findByIdAndDelete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id);
  }

  async findByIdAndUpdate(updateUserData: UpdateUserDto): Promise<User> {
    const query = { _id: updateUserData };
    return await this.userModel.findOneAndUpdate(query, updateUserData);
  }

  async findAllUsersBornBeforeDate(date: string): Promise<User[]> {
    const dateTooSoonSomebodyStillLivesSinceThen = '01-01-1900';
    const users = await this.userModel.find({
      birthday: { $gte: dateTooSoonSomebodyStillLivesSinceThen, $lte: date },
    });

    try {
      if (users.length === 0) {
        throw new Error('Users not found in database.');
      }
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }

    return users;
  }

  async findAllUsersBornAfterDate(date: string) {
    const today = format(new Date(), 'dd-MM-yyyy');
    const users = await this.userModel.find({
      birthday: { $gte: date, $lte: today },
    });

    try {
      if (users.length === 0) {
        throw new Error('Users not found in database.');
      }
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }

    return users;
  }

  async findAllUsersWhoLikesGivenItem(item: string) {
    const users = await this.userModel.find({ hobbys: item });

    try {
      if (users.length === 0) {
        throw new Error('Users not found in database.');
      }
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }

    return users;
  }

  async findAllUsersWithGivenIdInFriends(id: string) {
    const users = await this.userModel.find({ friendsIds: id });

    try {
      if (users.length === 0) {
        throw new Error('Users not found in database.');
      }
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }

    return users;
  }
}
