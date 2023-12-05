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

  async findOne(id: number): Promise<Product> {
    if (!id) return null;
    return await this.productsRepository.findOne({
      where: { id },
    });
  }

  async assignImageToProduct(
    productId: number,
    imageId: number,
  ): Promise<Product> {
    const product = await this.productsRepository.findOneOrFail({
      where: { id: productId },
      relations: ['images'],
    });

    if (!product) return null;

    if (!product.images) {
      product.images = [imageId]; // Initialize the array with the first image ID
    } else {
      if (!product.images.includes(imageId)) {
        product.images.push(imageId); // Add the image ID to the array if it's not already included
      }
    }

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
