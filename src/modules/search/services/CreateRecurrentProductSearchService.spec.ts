import FakeResearchesRepository from '@modules/search/repositories/fakes/FakeResearchesRepository';
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
    const search = await createRecurrentSearch.execute({
      user_id: '#493480341!#@',
      params: {
        product_description: 'fone de ouvido',
        platform: {
          olx: true,
          ml: false,
        },
        pages: 2,
        max_price: 100,
        min_price: 10,
      },
      frequency: 1,
    });

    expect(search).toHaveProperty('params');
    expect(search.user_id).toEqual('#493480341!#@');
  });
});
