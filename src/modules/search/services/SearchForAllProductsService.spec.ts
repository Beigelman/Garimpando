import FakeResearchesRepository from '@modules/search/repositories/fakes/FakeResearchesRepository';
import FakeQueueProvider from '@shared/container/providers/QueueProvider/fakes/FakeQueueProvider';
import AppError from '@shared/errors/AppError';
import SearchForAllProductsService from './SearchForAllProductsService';

let fakerResearchesRepository: FakeResearchesRepository;
let searchForAllProductsService: SearchForAllProductsService;
let fakeQueueProvider: FakeQueueProvider;

describe('CreateRecurrentSearch', () => {
  beforeEach(async () => {
    fakerResearchesRepository = new FakeResearchesRepository();
    fakeQueueProvider = new FakeQueueProvider();

    searchForAllProductsService = new SearchForAllProductsService(
      fakerResearchesRepository,
      fakeQueueProvider
    );
  });

  it('should warn if no research are found', async () => {
    await expect(searchForAllProductsService.execute()).rejects.toBeInstanceOf(
      AppError
    );
  });

  it('should add jobs to the find product queue', async () => {
    await fakerResearchesRepository.create({
      frequency: 2,
      params: 'params',
      user_id: 'user_id',
      deleted_at: undefined,
    });

    await fakerResearchesRepository.create({
      frequency: 1,
      params: 'params2',
      user_id: 'user_id2',
      deleted_at: undefined,
    });

    const researches = await searchForAllProductsService.execute();

    expect(researches).toHaveLength(2);
  });
});
