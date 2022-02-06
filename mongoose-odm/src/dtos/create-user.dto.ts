import { ApiProperty } from '@nestjs/swagger';

export default class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    required: true,
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'User birthday',
    required: true,
    type: String,
  })
  birthday: string;

  @ApiProperty({
    description: 'Array of hobbys',
    required: true,
    type: [String],
  })
  hobbys: string[];

  @ApiProperty({
    description: 'Array of friends ids',
    required: false,
    type: [String],
  })
  friendsIds: string[];
}
