import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as nodemailer from 'nodemailer';
import { DetailTransaction } from 'src/schema/detailtransaction.schema';
import { Transaction } from 'src/schema/transaction.schema';

@Injectable()
export class MailerService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(DetailTransaction.name)
    private detailTransactionModel: Model<DetailTransaction>,
  ) {}

  async sendEmailWithDatabaseData(transaction: string) {
    //Recuperation a propos du client pour la facture
    const transactionsWithClient = await this.transactionModel
      .find({ _id: transaction })
      .populate('client', 'nom_client adresse_client mail_client telephone_client')
      .exec();

    let mailreceiver;

    if (transactionsWithClient.length > 0) {
      mailreceiver = transactionsWithClient[0].client.mail_client;
    } else {
      // Gérer le cas où aucune transaction n'est trouvée
      mailreceiver = 'wbs.caisse@gmail.com';
    }

    //Recuperation des details de transaction
    const detailtransaction = await this.detailTransactionModel
      .find({ transaction })
      .populate('product', 'libelle')
      .exec();

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secureConnection: false,
      port: 587,
      tls: {
        ciphers: 'SSLv3',
      },
      auth: {
        user: 'wbs.caisse@gmail.com',
        pass: 'lwytsxavmtdbhdkn',
      },
    });

    const emailContent = `
    <div>
        <h2>WORLD BUSINNESS SOLUTION WBS</h2>
        ${transactionsWithClient
          .map(
            (trclient) => `
            <h3>Facture , le ${trclient.date_transaction} , ref : ${trclient.ref} </h3>
            </hr>
            <div>
                <p>Doit: ${trclient.client.nom_client}</p>
                <p>Adresse: ${trclient.client.adresse_client}</p>
                <p>Mail: ${trclient.client.mail_client}</p>
                <p>Telephone: ${trclient.client.telephone_client}</p>
            </div>
        `,
          )
          .join('')}
        <h6>---------------------------</h6>
        <ul>
        ${detailtransaction
          .map(
            (dt) => `
            <li>${dt.quantite} pcs de ${dt.product.libelle} , montant brut: ${dt.montant_brut} MGA , remise ${dt.remise} % , montant total: ${dt.montant_total} MGA </li>
        `,
          )
          .join('')}
        </ul>
        <h6>---------------------------</h6>
        ${transactionsWithClient
          .map(
            (trclient) => `
        <p>TOTAL: ${trclient.montant_transaction} MGA</p>
        `,
          )
          .join('')}
        </br>
        <h6>---------------------------</h6>
        <h6>WBS vous remercie pour votre confiance</h6>
    </div>
    `;

    const mailOptions = {
      from: 'wbs.caisse@gmail.com',
      to: mailreceiver,
      subject: 'Facture',
      html: emailContent,
    };

    return transporter.sendMail(mailOptions);
  }
  async sendmail() {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      secureConnection: false,
      port: 587,
      tls: {
        ciphers: 'SSLv3',
      },
      auth: {
        user: 'wbs.caisse@gmail.com',
        pass: 'lwytsxavmtdbhdkn',
      },
    });

    const emailContent = `
    <div>
        <h6>WBS vous remercie pour votre confiance</h6>
    </div>
    `;

    const mailOptions = {
      from: 'wbs.caisse@gmail.com',
      to: '',
      subject: 'Facture',
      html: emailContent,
    };

    return transporter.sendMail(mailOptions);
  }
}
