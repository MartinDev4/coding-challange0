import { Field, InputType, Int } from '@nestjs/graphql';
import { Image } from 'src/images/entities/image.entity';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;
  @Field(() => Int)
  price: number;
  @Field({ nullable: true, defaultValue: 'active' })
  status?: 'active' | 'inactive' = 'active';
}
