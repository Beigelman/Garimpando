import FakeResearchesRepository from '@modules/search/repositories/fakes/FakeResearchesRepository';
import AppError from '@shared/errors/AppError';
import FakeResearcherProvider from '../providers/ResearcherProvider/fakes/FakeResearcherProvider';
import FakeResultsRepository from '../repositories/fakes/FakeResultsRepository';
import SearchForProductService from './SearchForProductService';

let fakerResearchesRepository: FakeResearchesRepository;
let searchForProductService: SearchForProductService;
let fakeResearcherProvider: FakeResearcherProvider;
let fakeResultsRepository: FakeResultsRepository;

describe('CreateRecurrentSearch', () => {
  beforeEach(() => {
    fakerResearchesRepository = new FakeResearchesRepository();
    fakeResearcherProvider = new FakeResearcherProvider();
    fakeResultsRepository = new FakeResultsRepository();

    searchForProductService = new SearchForProductService(
      fakeResearcherProvider,
      fakerResearchesRepository,
      fakeResultsRepository
    );
  });

  it('should be able to create a search', async () => {
    const research = await fakerResearchesRepository.create({
      frequency: 2,
      user_id: 'user_id',
      params: JSON.stringify({
        pages: 1,
        platform: {
          ml: true,
          olx: true,
        },
        product_description: 'Fone de ouvido',
      }),
    });

    const search = await searchForProductService.execute({
      research_id: research.id,
    });

    expect(search).toHaveLength(5);
    expect(search[0]).toHaveProperty('title');
  });

  it('should throw an erro if the research was not found', async () => {
    await expect(
      searchForProductService.execute({
        research_id: '123456',
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('it should return the old values is no new values were found', async () => {
    const research = await fakerResearchesRepository.create({
      frequency: 2,
      user_id: 'user_id',
      params: JSON.stringify({
        pages: 1,
        platform: {
          ml: true,
          olx: true,
        },
        product_description: 'Fone de ouvido',
        max_price: 1200,
        min_price: 800,
      }),
    });

    await searchForProductService.execute({
      research_id: research.id,
    });

    await expect(
      searchForProductService.execute({
        research_id: research.id,
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
