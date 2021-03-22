import FakeResearchesRepository from '@modules/search/repositories/fakes/FakeResearchesRepository';
import AppError from '@shared/errors/AppError';
import FakeResearcherProvider from '../providers/ResearcherProvider/fakes/FakeResearcherProvider';
import FakeResultsRepository from '../repositories/fakes/FakeResultsRepository';
import CreateRecurrentSearchService from './CreateRecurrentProductSearchService';

let fakerResearchesRepository: FakeResearchesRepository;
let createRecurrentSearch: CreateRecurrentSearchService;
let fakeResearcherProvider: FakeResearcherProvider;
let fakeResultsRepository: FakeResultsRepository;

describe('CreateRecurrentSearch', () => {
  beforeEach(() => {
    fakerResearchesRepository = new FakeResearchesRepository();
    fakeResearcherProvider = new FakeResearcherProvider();
    fakeResultsRepository = new FakeResultsRepository();

    createRecurrentSearch = new CreateRecurrentSearchService(
      fakerResearchesRepository,
      fakeResearcherProvider,
      fakeResultsRepository
    );
  });

  it('should be able to create a search', async () => {
    const search = await createRecurrentSearch.execute({
      frequency: 2,
      user_id: 'user_id',
      params: {
        pages: 1,
        platform: {
          ml: true,
          olx: true,
        },
        product_description: 'Fone de ouvido',
      },
    });

    expect(search).toHaveLength(5);
    expect(search[0]).toHaveProperty('title');
  });

  it('should not be able to create a search that already exists', async () => {
    fakerResearchesRepository.create({
      frequency: 2,
      user_id: 'user_id',
      params: JSON.stringify({
        pages: 1,
        platform: {
          ml: true,
          olx: true,
        },
        product_description: 'Fone de ouvido',
        max_price: 1000,
        min_price: 500,
      }),
    });

    await expect(
      createRecurrentSearch.execute({
        frequency: 2,
        user_id: 'user_id',
        params: {
          pages: 1,
          platform: {
            ml: true,
            olx: true,
          },
          product_description: 'Fone de ouvido',
          max_price: 1000,
          min_price: 500,
        },
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should warn if no products were found', async () => {
    await expect(
      createRecurrentSearch.execute({
        frequency: 2,
        user_id: 'user_id',
        params: {
          pages: 1,
          platform: {
            ml: true,
            olx: true,
          },
          product_description: 'Fone de ouvido',
          max_price: 1,
        },
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});
