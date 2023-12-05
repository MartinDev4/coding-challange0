import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { IsAlpha, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { status } from './status.enum';

@InputType()
export class CreateProductInput {
  @Field()
  @IsAlpha()
  name: string;

  @IsNumber()
  @Field(() => Float)
  price: number;

  @IsOptional()
  @IsEnum(status)
  @Field({ defaultValue: 'active', nullable: true })
  status?: 'active' | 'inactive' = 'active';

  @IsOptional()
  @Field((type) => [Int], { defaultValue: [], nullable: true })
  images?: number[];
}
