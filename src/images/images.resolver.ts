import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';
import { CreateImageInput } from './dto/create-image.input';
import { UpdateImageInput } from './dto/update-image.input';
import { Product } from 'src/products/entities/product.entity';

@Resolver(() => Image)
export class ImagesResolver {
  constructor(private readonly imagesService: ImagesService) {}

  @Mutation(() => Image)
  createImage(@Args('createImageInput') createImageInput: CreateImageInput) {
    return this.imagesService.create(createImageInput);
  }

  @Query(() => [Image])
  images() {
    return this.imagesService.findAll();
  }

  @Query(() => Image)
  image(@Args('id', { type: () => Int }) id: number) {
    return this.imagesService.findOne(id);
  }

  @Mutation(() => Image)
  updateImage(
    @Args('updateImageInput') updateImageInput: UpdateImageInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    let { url, priority } = updateImageInput;
    return this.imagesService.update(id, { url, priority });
  }

  @ResolveField((returns) => Product)
  product(@Parent() image: Image): Promise<Product> {
    return this.imagesService.getProduct(image.productId);
  }

  @Mutation(() => Image)
  removeImage(@Args('id', { type: () => Int }) id: number) {
    return this.imagesService.remove(id);
  }
}
