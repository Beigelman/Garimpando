interface IMailConfig {
  driver: 'trap' | 'sendGrid';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}
export default {
  driver: process.env.MAIL_DRIVER || 'trap',
  defaults: {
    from: {
      name: 'Garimpando',
      email: 'daniel_b.b@hotmail.com',
    },
  },
} as IMailConfig;
