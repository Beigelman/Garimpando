import Mail from 'lib/Mail';
import { container } from 'tsyringe';

export default {
  key: 'SendNotificationEmail',
  async handle({ data }: any): Promise<void> {
    const email = container.resolve(Mail);

    email.sendEmail(data);
  },
};
