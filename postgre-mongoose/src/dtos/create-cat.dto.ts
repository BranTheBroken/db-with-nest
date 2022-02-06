import { ApiProperty } from '@nestjs/swagger';

export default class CreateCatDto {
  @ApiProperty({
    description: 'Name of cat',
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Breed of cat',
    required: true,
  })
  colour: string;

  @ApiProperty({
    description: 'Sex of cat',
    required: true,
  })
  sex: string;

  @ApiProperty({
    description: 'Age of cat',
    minimum: 1,
    default: 1,
  })
  age: number;
}
