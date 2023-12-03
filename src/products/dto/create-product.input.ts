import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsEnum, IsNumber } from 'class-validator';
import { status } from './status.enum';

@InputType()
export class CreateProductInput {
  @Field()
  @IsAlpha()
  name: string;

  @IsNumber()
  @Field(() => Float)
  price: number;

  @IsEnum(status)
  @Field({ defaultValue: 'active' })
  status: 'active' | 'inactive' = 'active';
}
