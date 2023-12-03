import { InputType, Field, Int, PartialType, Float } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  name?: string;
  @Field((type) => Float, { nullable: true })
  price?: number;
  @Field({ nullable: true })
  status?: 'active' | 'inactive';
}
