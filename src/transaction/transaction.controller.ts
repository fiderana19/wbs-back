import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from 'src/dto/create-transaction.dto';
import { SearchTransactionDto } from 'src/dto/search-transaction.dto';
import { UpdateTransactionDto } from 'src/dto/update-transaction.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}

  @Get()
  @UseGuards(AuthGuard())
  async getTransactionWithClient() {
    return await this.transactionService.getTransactionWithClient();
  }

  @Get('/latest')
  @UseGuards(AuthGuard())
  async getLatest() {
    return await this.transactionService.getLatest(4);
  }

  @Get('/total')
  @UseGuards(AuthGuard())
  async total() {
    return await this.transactionService.total();
  }

  @Post('/search')
  @UseGuards(AuthGuard())
  async searchTransaction(@Body() data: SearchTransactionDto) {
    const { start, end } = data;
    const transactions = await this.transactionService.seachTransaction(
      new Date(start),
      new Date(end),
    );

    return transactions;
  }

  @Get('/find/:id')
  @UseGuards(AuthGuard())
  async getById(@Param() param) {
    return await this.transactionService.getTransactionWithClientById(param.id);
  }

  @Get('/findfacture/:id')
  @UseGuards(AuthGuard())
  async getByFactureId(@Param() param) {
    return await this.transactionService.getTransactionWithClientFacture(
      param.id,
    );
  }

  @Post()
  @UseGuards(AuthGuard())
  async create(@Body() data: CreateTransactionDto, @Req() req) {
    console.log(req);

    return await this.transactionService.create(data);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  async update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    return await this.transactionService.update(id, updateTransactionDto);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async delete(@Param() param) {
    return this.transactionService.delete(param.id);
  }
}
