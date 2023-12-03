import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateImageInput {
  @Field()
  url: string;

  @Field((type) => Int)
  priority: number = 1000;

  @Field((type) => Int, { nullable: true })
  productId?: number;
}
