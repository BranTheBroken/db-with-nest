import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateCatDto from 'src/dtos/create-cat.dto';
import UpdateCatDto from 'src/dtos/update-cat.dto';
import { Repository } from 'typeorm';
import CatPg from '../entities/cat.entity';
import { CatMg } from 'src/models/cat.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class CatsService {
  private logger = new Logger(CatsService.name);

  constructor(
    @InjectRepository(CatPg) private catRepository: Repository<CatPg>,
    @InjectModel('Cat') private readonly catModel: Model<CatMg>,
  ) {}

  async getAllCats() {
    const catsPg = await this.catRepository.find();
    const catsMg = await this.catModel.find();

    return { catsPg, catsMg };
  }

  async getCatById(id: number) {
    let catPg = await this.catRepository.findOne(id);
    try {
      if (!catPg) {
        throw new Error('Cat not found in postgre database');
      }
    } catch (error) {
      this.logger.error(error);
      catPg = null;
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }

    let catMg = await this.catModel.findOne({ postgreId: id });
    try {
      if (!catMg) {
        throw new Error('Cat not found in mongoose database');
      }
    } catch (error) {
      this.logger.error(error);
      catMg = null;
      throw new HttpException(error, HttpStatus.NOT_FOUND);
    }

    return { catPg, catMg };
  }

  async createCat(cat: CreateCatDto) {
    const newCatPostgre = this.catRepository.create(cat);
    const catObjForMongo = { postgreId: newCatPostgre.id, ...cat };
    const newCatMongo = new this.catModel(catObjForMongo);

    Promise.allSettled([
      this.catRepository.save(newCatPostgre),
      newCatMongo.save(),
    ]);

    return { newCatPostgre, newCatMongo };
  }

  async updateCat(updateCatInfo: UpdateCatDto) {
    await this.catRepository.update(updateCatInfo.id, updateCatInfo);
    await this.catModel.findOneAndUpdate(
      { postgreId: updateCatInfo.id },
      updateCatInfo,
    );

    await this.getCatById(Number(updateCatInfo.id));
  }

  async deleteCat(id: number) {
    Promise.allSettled([
      this.catRepository.delete(id),
      this.catModel.deleteOne({ id }),
    ]);
  }
}
