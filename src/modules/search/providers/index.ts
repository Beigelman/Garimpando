import { container } from 'tsyringe';
import IResearcherProvider from '@modules/search/providers/ResearcherProvider/models/IResearcherProvider';
import PuppeteerResearcherProvider from '@modules/search/providers/ResearcherProvider/implementations/PuppeteerResearcherProvider';

container.registerSingleton<IResearcherProvider>(
  'ResearcherProvider',
  PuppeteerResearcherProvider
);
