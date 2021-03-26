import FakeResearchesRepository from '@modules/search/repositories/fakes/FakeResearchesRepository';
import AppError from '@shared/errors/AppError';
import CreateRecurrentSearchService from './CreateRecurrentProductSearchService';

let fakerResearchesRepository: FakeResearchesRepository;
let createRecurrentSearch: CreateRecurrentSearchService;

describe('CreateRecurrentSearch', () => {
  beforeEach(() => {
    fakerResearchesRepository = new FakeResearchesRepository();

    createRecurrentSearch = new CreateRecurrentSearchService(
      fakerResearchesRepository
    );
  });

  it('should be able to create a search', async () => {
    const research = await createRecurrentSearch.execute({
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

    expect(research.params).toBe(
      JSON.stringify({
        pages: 1,
        platform: {
          ml: true,
          olx: true,
        },
        product_description: 'Fone de ouvido',
      })
    );
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
});
