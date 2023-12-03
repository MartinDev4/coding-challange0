import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get()
  async getAllImages() {
    const images = await this.imagesService.findAll();

    return { images };
  }

  @Get(':id')
  async getImageById(@Param('id') id: number) {
    const image = await this.imagesService.findOne(id);

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    return { image };
  }

  @Post()
  async createImage(@Body() data: CreateImageInput) {
    const image = await this.imagesService.create(data);
    return { image };
  }

  @Patch(':id')
  async updateProduct(@Body() data: UpdateImageInput, @Param('id') id: number) {
    return await this.imagesService.update(id, data);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return await this.imagesService.remove(id);
  }
}
