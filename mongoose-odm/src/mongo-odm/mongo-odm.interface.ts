import CreateUserDto from 'src/dtos/create-user.dto';
import UpdateUserDto from 'src/dtos/update-user.dto';
import { User } from '../models/user.model';

export default interface MongoODM {
  create(data: CreateUserDto): void;
  findById(id: string): Promise<User>;
  findByIdAndDelete(id: string): Promise<any>;
  findByIdAndUpdate(updateUserData: UpdateUserDto): Promise<User>;
  findAllUsersBornBeforeDate(date: string): Promise<User[]>;
  findAllUsersBornAfterDate(date: string): Promise<User[]>;
  findAllUsersWhoLikesGivenItem(item: string): Promise<User[]>;
  findAllUsersWithGivenIdInFriends(id: string): Promise<User[]>;
}
