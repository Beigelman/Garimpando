import { container } from 'tsyringe';

import '@modules/users/providers';
import '@modules/search/providers';
import './providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import IResearchesRepository from '@modules/search/repositories/IResearchesRepository';
import ResearchesRepository from '@modules/search/infra/typeorm/repositories/ResearchesRepository';

import IResultsRepository from '@modules/search/repositories/IResultsRepository';
import ResultsRepository from '@modules/search/repositories/fakes/FakeResultsRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository
);

container.registerSingleton<IResearchesRepository>(
  'ResearchesRepository',
  ResearchesRepository
);

container.registerSingleton<IResultsRepository>(
  'ResultsRepository',
  ResultsRepository
);
