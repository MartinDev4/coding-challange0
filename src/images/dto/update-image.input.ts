import { IsAlphanumeric, IsNumber } from 'class-validator';
import { CreateImageInput } from './create-image.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateImageInput extends PartialType(CreateImageInput) {
  @IsAlphanumeric()
  @Field({ nullable: true })
  url?: string;

  @IsNumber()
  @Field((type) => Int, { nullable: true })
  priority?: number;
}
