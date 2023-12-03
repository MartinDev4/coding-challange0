import { Injectable } from '@nestjs/common';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { ProductsService } from 'src/products/products.service';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,
    private readonly productsService: ProductsService,
  ) {}

  async create(createImageInput: CreateImageInput) {
    let newImage = this.imagesRepository.create(createImageInput);

    // if (newImage.productId) await this.productsService.addImage(newImage);

    return this.imagesRepository.save(newImage);
  }

  findAll() {
    return this.imagesRepository.find();
  }

  findOne(id: number) {
    return this.imagesRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  getProduct(productId: number): Promise<Product> {
    return this.productsService.findOne(productId);
  }

  // async findImagesByProductId(productId: number) {
  //   return (await this.imagesRepository.find()).filter(
  //     (image) => image.productId === productId,
  //   );
  // }

  async update(id: number, updateImageInput: UpdateImageInput) {
    let image = await this.findOne(id);
    Object.assign(image, updateImageInput);
    return await this.imagesRepository.save(image);
  }

  async remove(id: number) {
    let image = await this.findOne(id);
    return await this.imagesRepository.remove(image);
  }
}
