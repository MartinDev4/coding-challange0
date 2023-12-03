import { Field, InputType } from '@nestjs/graphql';
import { Image } from 'src/images/entities/image.entity';

@InputType()
export class CreateProductInput {
  @Field()
  name: string;
  @Field()
  price: number;
  @Field({ nullable: true, defaultValue: 'active' })
  status?: 'active' | 'inactive' = 'active';
}
