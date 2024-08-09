import { Controller, Param, Get, BadRequestException } from '@nestjs/common';
import { MailerService } from './mailer.service';

@Controller('mailer')
export class MailController {
  constructor(private readonly mailerService: MailerService) {}

  @Get('/:transaction')
  async sendEmail(@Param('transaction') transaction: string) {
    try {
      await this.mailerService.sendEmailWithDatabaseData(transaction);
      return { message: 'E-mail envoyé avec succès' };
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
