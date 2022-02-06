import { string } from '@hapi/joi';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import CreateUserDto from 'src/dtos/create-user.dto';
import UpdateUserDto from 'src/dtos/update-user.dto';
import { MongoOdmService } from './mongo-odm.service';

@Controller('users')
export class MongoOdmController {
  constructor(private mongoODM: MongoOdmService) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.mongoODM.findById(id);
  }

  @Get()
  async getAllUsers() {
    return await this.mongoODM.getAll();
  }

  @Post('getUsersBornBefore')
  async getUsersBornBeforeDate(@Body() { date }: { date: string }) {
    return await this.mongoODM.findAllUsersBornBeforeDate(date);
  }

  @Post('getUsersBornAfter')
  async getUsersBornAfterDate(@Body() { date }: { date: string }) {
    return await this.mongoODM.findAllUsersBornAfterDate(date);
  }

  @Post('getUsersWhoLikeItem')
  async getUsersWhoLikeGivenItem(@Body() { item }: { item: string }) {
    return await this.mongoODM.findAllUsersWhoLikesGivenItem(item);
  }

  @Post('getUsersWithIdInFriends')
  async getUsersWithGivenIdInFriends(@Body() { id }: { id: string }) {
    return await this.mongoODM.findAllUsersWithGivenIdInFriends(id);
  }

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.mongoODM.create(createUserDto);
  }

  @Patch()
  async updateUser(@Body() updateUserDto: UpdateUserDto) {
    return await this.mongoODM.findByIdAndUpdate(updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return await this.mongoODM.findByIdAndDelete(id);
  }
}
