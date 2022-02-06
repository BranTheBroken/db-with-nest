import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import CreateCatDto from 'src/dtos/create-cat.dto';
import UpdateCatDto from 'src/dtos/update-cat.dto';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Get()
  async getAllCats() {
    return await this.catsService.getAllCats();
  }

  @Get(':id')
  async getCatById(@Param('id') id: number) {
    return await this.catsService.getCatById(id);
  }

  @Post()
  async createCat(@Body() createCatDto: CreateCatDto) {
    return await this.catsService.createCat(createCatDto);
  }

  @Patch()
  async updateCat(@Body() updateCatDto: UpdateCatDto) {
    return await this.catsService.updateCat(updateCatDto);
  }

  @Delete(':id')
  async deleteCat(@Param('id') id: number) {
    return await this.catsService.deleteCat(id);
  }
}
