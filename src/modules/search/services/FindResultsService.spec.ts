import FakeResearchesRepository from '@modules/search/repositories/fakes/FakeResearchesRepository';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeResultsRepository from '../repositories/fakes/FakeResultsRepository';
import FindResultsService from './FindResultsService';

let fakerResearchesRepository: FakeResearchesRepository;
let fakeUserRepository: FakeUsersRepository;
let fakeResultsRepository: FakeResultsRepository;

let findResultsService: FindResultsService;

describe('CreateRecurrentSearch', () => {
  beforeEach(async () => {
    fakerResearchesRepository = new FakeResearchesRepository();
    fakeResultsRepository = new FakeResultsRepository();
    fakeUserRepository = new FakeUsersRepository();

    findResultsService = new FindResultsService(
      fakerResearchesRepository,
      fakeResultsRepository,
      fakeUserRepository
    );
  });

  it('should add jobs to the find product queue', async () => {
    const user = await fakeUserRepository.create({
      email: 'test@gmail.com',
      name: 'user1',
      password: '1234',
    });

    const research = await fakerResearchesRepository.create({
      frequency: 2,
      params: 'teste',
      user_id: user.id,
    });

    await fakeResultsRepository.create({
      research_id: research.id,
      results: [
        {
          link: 'http://www.teste.com.br',
          price: 1000,
          title: 'teste1',
        },
        {
          link: 'http://www.teste.com.br',
          price: 1100,
          title: 'teste2',
        },
      ],
    });

    const results = await findResultsService.execute({
      research_id: research.id,
      user_id: user.id,
    });

    expect(results).toHaveLength(2);
    expect(results[0].title).toBe('teste1');
  });

  it('should not find results if que user is not authorized', async () => {
    const research = await fakerResearchesRepository.create({
      frequency: 2,
      params: 'teste',
      user_id: 'user_id',
    });

    await fakeResultsRepository.create({
      research_id: research.id,
      results: [
        {
          link: 'http://www.teste.com.br',
          price: 1000,
          title: 'teste1',
        },
        {
          link: 'http://www.teste.com.br',
          price: 1100,
          title: 'teste2',
        },
      ],
    });

    await expect(
      findResultsService.execute({
        research_id: research.id,
        user_id: 'not_user_id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should warn if the research is not found', async () => {
    await expect(
      findResultsService.execute({
        research_id: 'not_research_id',
        user_id: 'not_user_id',
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
