import { IsAlphanumeric, IsInt } from 'class-validator';
import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class UpdateImageInput {
  @IsAlphanumeric()
  @Field({ nullable: true })
  url?: string;

  @IsInt()
  @Field((type) => Int, { nullable: true })
  priority?: number;
}
