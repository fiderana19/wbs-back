import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import {
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
} from '@nestjs/common/decorators';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getAll() {
    return await this.productService.getAll();
  }

  @Get('/total')
  async total() {
    return await this.productService.total();
  }

  @Get('/pu/:id')
  async pu(@Param() param) {
    return await this.productService.getpuById(param.id);
  }

  @Get('/find/:id')
  async getById(@Param() param) {
    return await this.productService.getById(param.id);
  }

  @Post()
  async create(@Body() data: CreateProductDto) {
    return await this.productService.create(data);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateProductDto) {
    return this.productService.update(id, updateItemDto);
  }

  @Delete('/:id')
  async delete(@Param() param) {
    return await this.productService.delete(param.id);
  }
}
