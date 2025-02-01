import { Controller } from '@nestjs/common';
import { DetailtransactionService } from './detailtransaction.service';
import { Body, Get, Param, Post, UseGuards } from '@nestjs/common/decorators';
import { CreateDetailTransactionDto } from 'src/dto/create-detailtransaction.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('detailtransaction')
export class DetailtransactionController {
  constructor(private detailTransactionService: DetailtransactionService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getAll() {
    return await this.detailTransactionService.getAll();
  }

  @Get('/trans/:transaction')
  @UseGuards(AuthGuard())
  async getByIdTrans(@Param() param) {
    return await this.detailTransactionService.getByIdTrans(param.transaction);
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() data: CreateDetailTransactionDto) {
    return await this.detailTransactionService.create(data);
  }
}
