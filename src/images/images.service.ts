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

    let savedImage = await this.imagesRepository.save(newImage);

    // if (newImage.productId)
    //   await this.productsService.assignImageToProduct(
    //     newImage.productId,
    //     savedImage.id,
    //   );

    return savedImage;
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

  async findImagesByImageIds(imagesIds: number[]) {
    try {
      if (!imagesIds) return;
      const promises = imagesIds.map(async (id) => {
        const image = await this.imagesRepository.findOne({ where: { id } });
        return image;
      });

      const images = await Promise.all(promises);

      return images.filter((image) => image !== undefined);
    } catch (error) {
      console.error('Error finding images:', error);
      throw error;
    }
  }

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
