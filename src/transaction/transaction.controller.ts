import { Controller } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import {
  Get,
  Post,
  Body,
  Param,
  Req,
  Delete,
  Patch,
} from '@nestjs/common/decorators';
import { CreateTransactionDto } from 'src/dto/create-transaction.dto';
import { SearchTransactionDto } from 'src/dto/search-transaction.dto';
import { UpdateTransactionDto } from 'src/dto/update-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  // @Get()
  // async getAll() {
  //   return await this.transactionService.getAll();
  // }

  @Get()
  async getTransactionWithClient() {
    return await this.transactionService.getTransactionWithClient();
  }

  @Get('/latest')
  async getLatest() {
    return await this.transactionService.getLatest(4);
  }

  @Get('/total')
  async total() {
    return await this.transactionService.total();
  }

  @Post('/search')
  async searchTransaction(@Body() data: SearchTransactionDto) {
    const { start, end } = data;
    const transactions = await this.transactionService.seachTransaction(
      new Date(start),
      new Date(end),
    );

    return transactions;
  }

  @Get('/find/:id')
  async getById(@Param() param) {
    return await this.transactionService.getTransactionWithClientById(param.id);
  }

  @Get('/findfacture/:id')
  async getByFactureId(@Param() param) {
    return await this.transactionService.getTransactionWithClientFacture(
      param.id,
    );
  }

  @Post()
  async create(@Body() data: CreateTransactionDto, @Req() req) {
    console.log(req);

    return await this.transactionService.create(data);
  }

  @Patch('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return await this.transactionService.update(id, updateTransactionDto);
  }

  @Delete('/:id')
  async delete(@Param() param) {
    return this.transactionService.delete(param.id);
  }
}
