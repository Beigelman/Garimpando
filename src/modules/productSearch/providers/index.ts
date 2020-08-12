import { container } from 'tsyringe';
import IResearcherProvider from '@modules/productSearch/providers/ResearcherProvider/models/IResearcherProvider';
import PuppeteerResearcherProvider from '@modules/productSearch/providers/ResearcherProvider/implementations/PuppeteerResearcherProvider';

container.registerSingleton<IResearcherProvider>(
  'ResearcherProvider',
  PuppeteerResearcherProvider
);
