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

  // async findImagesByProductId(productId: number) {
  //   return await this.imagesService.findImagesByProductId(productId);
  // }

  async addImage(newImage: Image) {
    const product = await this.findOne(newImage.productId);

    if (!product) return null;

    if (!product.images) product.images = [];
    product.images.push(newImage);
    return this.productsRepository.save(product).then((savedProduct) => {
      console.log(savedProduct);
      return savedProduct;
    });
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
