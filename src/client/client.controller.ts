import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from 'src/dto/create-client.dto';
import { UpdateClientDto } from 'src/dto/update-client.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('client')
export class ClientController {
  constructor(private clientService: ClientService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAll() {
    return await this.clientService.getAll();
  }

  @Get('/total')
  @UseGuards(AuthGuard())
  async total() {
    const count = await this.clientService.total();

    return count;
  }

  @Get('/find/:id')
  @UseGuards(AuthGuard())
  async getById(@Param() param) {
    return await this.clientService.getById(param.id);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() data: CreateClientDto) {
    return await this.clientService.create(data);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  update(@Param('id') id: string, @Body() updateItemDto: UpdateClientDto) {
    return this.clientService.update(id, updateItemDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async delete(@Param() param) {
    await this.clientService.delete(param.id);
  }
}
