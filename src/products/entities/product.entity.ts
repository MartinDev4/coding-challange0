import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Image } from 'src/images/entities/image.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field((type) => Float)
  price: number;

  @Column({ default: 'active' })
  @Field()
  status?: 'active' | 'inactive';

  @OneToMany(() => Image, (image) => image.product)
  @Field((type) => [Int], { defaultValue: [] })
  images?: number[];
}
