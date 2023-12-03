import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async getAllProducts() {
    const products = await this.productsService.findAll();

    return { products };
  }

  @Get(':id')
  async getProductById(@Param('id') id: number) {
    const product = await this.productsService.findOne(id);

    if (!product) {
      throw new NotFoundException('Image not found');
    }

    return { product };
  }

  @Post()
  async createProduct(@Body() data: CreateProductInput) {
    const newProduct = await this.productsService.create(data);
    return { newProduct };
  }

  @Patch(':id')
  async updateProduct(
    @Body() data: UpdateProductInput,
    @Param('id') id: number,
  ) {
    return await this.productsService.update(id, data);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    return await this.productsService.remove(id);
  }
}
