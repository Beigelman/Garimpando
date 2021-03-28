import { container } from 'tsyringe';
import mailConfig from '@config/mail';
import MailTrapMailProvider from './implementations/MailTrapMailProvider';
import SendGridMailProvider from './implementations/SendGridMailProvider';
import IMailProvider from './models/IMailProvider';

const providers = {
  trap: container.resolve(MailTrapMailProvider),
  sendGrid: container.resolve(SendGridMailProvider),
};

container.registerInstance<IMailProvider>(
  'MailProvider',
  providers[mailConfig.driver]
);
