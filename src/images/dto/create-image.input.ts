import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsAlphanumeric,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateImageInput {
  @IsString()
  @Field()
  url: string;

  @IsInt()
  @Field((type) => Int)
  priority: number = 1000;

  @IsInt()
  @IsOptional()
  @Field((type) => Int, { nullable: true })
  productId?: number;
}
