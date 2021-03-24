import ISendMailDTO from '@shared/container/providers/MailProvider/dtos/ISendMailDTO';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import { inject, injectable } from 'tsyringe';

interface IMail {
  sendEmail(data: ISendMailDTO): void;
}

@injectable()
class Mail implements IMail {
  constructor(@inject('MailProvider') private mailProvider: IMailProvider) {}

  public sendEmail({ from, subject, templateData, to }: ISendMailDTO): void {
    this.mailProvider.sendMail({
      subject,
      templateData,
      to,
      from,
    });
  }
}

export default Mail;
