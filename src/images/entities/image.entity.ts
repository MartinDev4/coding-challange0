import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Image {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  url: string;

  @Column({
    type: 'int',
    default: 1000,
  })
  @Field((type) => Int)
  priority: number;

  @Column()
  @Field((type) => Int, { nullable: true })
  productId?: number;

  @ManyToOne(() => Product, (product) => product.images)
  @Field((type) => Product)
  product: Product;
}
