import { container } from 'tsyringe';
import Mail from '../../../lib/Mail';

export default {
  key: 'SendNotificationEmail',
  async handle({ data }: any): Promise<void> {
    const email = container.resolve(Mail);

    email.sendEmail(data);
  },
};
