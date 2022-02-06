import CreateCatDto from './create-cat.dto';
import { PartialType } from '@nestjs/mapped-types';

export default class UpdateCatDto extends PartialType(CreateCatDto) {
  id: string;
}
