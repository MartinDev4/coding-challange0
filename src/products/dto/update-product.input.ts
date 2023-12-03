import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';
import { IsAlpha, IsEnum, IsNumber } from 'class-validator';
import { status } from './status.enum';

@InputType()
export class UpdateProductInput {
  @IsAlpha()
  @Field({ nullable: true })
  name?: string;

  @IsNumber()
  @Field((type) => Float, { nullable: true })
  price?: number;

  @IsEnum(status)
  @Field({ nullable: true })
  status?: 'active' | 'inactive';
}
