import { Controller } from '@nestjs/common';
import { DetailtransactionService } from './detailtransaction.service';
import {
  Body,
  Get,
  Param,
  Post,
} from '@nestjs/common/decorators';
import { CreateDetailTransactionDto } from 'src/dto/create-detailtransaction.dto';

@Controller('detailtransaction')
export class DetailtransactionController {
  constructor(private detailTransactionService: DetailtransactionService) {}

  @Get()
  async getAll() {
    return await this.detailTransactionService.getAll();
  }

  @Get('/trans/:transaction')
  async getByIdTrans(@Param() param) {
    return await this.detailTransactionService.getByIdTrans(param.transaction);
  }

  @Post()
  async create(@Body() data: CreateDetailTransactionDto) {
    return await this.detailTransactionService.create(data);
  }
}
