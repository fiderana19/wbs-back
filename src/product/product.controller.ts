import { Controller } from '@nestjs/common';
import { ProductService } from './product.service';
import {
  Get,
  Post,
  Delete,
  Body,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common/decorators';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAll() {
    return await this.productService.getAll();
  }

  @Get('/total')
  @UseGuards(AuthGuard())
  async total() {
    return await this.productService.total();
  }

  @Get('/pu/:id')
  @UseGuards(AuthGuard())
  async pu(@Param() param) {
    return await this.productService.getpuById(param.id);
  }

  @Get('/find/:id')
  @UseGuards(AuthGuard())
  async getById(@Param() param) {
    return await this.productService.getById(param.id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() data: CreateProductDto) {
    return await this.productService.create(data);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateItemDto: UpdateProductDto) {
    return this.productService.update(id, updateItemDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async delete(@Param() param) {
    return await this.productService.delete(param.id);
  }
}
