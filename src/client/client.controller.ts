import { Controller } from '@nestjs/common';
import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common/decorators';
import { ClientService } from './client.service';
import { CreateClientDto } from 'src/dto/create-client.dto';
import { UpdateClientDto } from 'src/dto/update-client.dto';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  async getAll() {
    return await this.clientService.getAll();
  }

  @Get('/total')
  async total() {
    const count = await this.clientService.total();

    return count;
  }

  @Get('/find/:id')
  async getById(@Param() param) {
    return await this.clientService.getById(param.id);
  }

  @Post()
  async create(@Body() data: CreateClientDto) {
    return await this.clientService.create(data);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateItemDto: UpdateClientDto) {
    return this.clientService.update(id, updateItemDto);
  }

  @Delete('/:id')
  async delete(@Param() param) {
    await this.clientService.delete(param.id);
  }
}
