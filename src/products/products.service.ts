import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Image } from 'src/images/entities/image.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  create(createProductInput: CreateProductInput) {
    let newProduct = this.productsRepository.create(createProductInput);

    return this.productsRepository.save(newProduct);
  }

  findAll() {
    return this.productsRepository.find();
  }

  findOne(id: number): Promise<Product> {
    return this.productsRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async assignImageToProduct(productId: number, imageId: number) {
    const product: Product = await this.findOne(productId);

    if (!product) return null;

    console.log(product);

    if (!product.images) product.images = [];

    product.images = [...product.images, imageId];
    return this.productsRepository.save(product);
  }

  async update(id: number, updateProductInput: UpdateProductInput) {
    let product = await this.findOne(id);
    Object.assign(product, updateProductInput);
    return await this.productsRepository.save(product);
  }

  async remove(id: number) {
    let product = await this.findOne(id);
    return await this.productsRepository.remove(product);
  }
}
