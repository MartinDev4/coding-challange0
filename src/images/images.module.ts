import { Module, forwardRef } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesResolver } from './images.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './entities/image.entity';
import { ProductsModule } from 'src/products/products.module';
import { ImagesController } from './images.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    forwardRef(() => ProductsModule),
  ],
  providers: [ImagesResolver, ImagesService],
  controllers: [ImagesController],
  exports: [ImagesService],
})
export class ImagesModule {}
