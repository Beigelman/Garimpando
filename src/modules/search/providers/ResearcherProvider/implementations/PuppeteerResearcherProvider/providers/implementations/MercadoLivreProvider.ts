/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */

import puppeteer from 'puppeteer';
import IPuppeteerParamsDTO from '@modules/search/dtos/IPuppeteerParamsDTO';
import IResultDTO from '@modules/search/dtos/IResultDTO';
import IPuppeteerResearcherProvider from '../models/IPuppeteerResearcherProvider';

export default class MercadoLivreProvider
  implements IPuppeteerResearcherProvider {
  public async findTags({
    pages,
    product_description,
  }: IPuppeteerParamsDTO): Promise<IResultDTO[]> {
    const browser = await puppeteer.launch({ headless: false });
    // Criando nova aba
    const page = await browser.newPage();
    // Redirecionando para o url desejada
    await page.goto('https://www.mercadolivre.com.br/', {
      waitUntil: 'networkidle2',
    });
    try {
      // Selecionando o campo de pesquisa
      await page.waitForSelector('input.nav-search-input');
      await page.focus('input.nav-search-input');
      // Escrevendo o item procurado
      await page.keyboard.type(product_description);

      // Apertando o botão de pesquisa
      await page.keyboard.press('Enter');

      const products = [];
      // Procurando nas paginas
      for (let i = 0; i < pages; i++) {
        await page.waitForSelector('li.results-item');
        const info = await page.evaluate(() => {
          const elements = document.querySelectorAll('li.results-item');
          const list = Array.from(elements);
          return list.map(
            item =>
              ({
                title: item.querySelector<HTMLElement>('span.main-title')
                  ?.innerText,
                price: `${item
                  .querySelector<HTMLElement>('span.price__fraction')
                  ?.innerText.replace('.', '')}${
                  item.querySelector<HTMLElement>('span.price__decimals')
                    ? `.${
                        item.querySelector<HTMLElement>('span.price__decimals')
                          ?.innerText
                      }`
                    : ''
                }`,
                link: item
                  .querySelector<HTMLElement>('a.item__info-link')
                  ?.getAttribute('href'),
              } as IResultDTO)
          );
        });

        products.push(...info);

        try {
          await page.waitForSelector('a.andes-pagination__link.prefetch');
          await page.click('a.andes-pagination__link.prefetch');
        } catch {
          i = pages;
        }
      }
      // Fechando o browser
      // await browser.close();

      return products;
    } catch {
      await browser.close();

      return [];
    }
  }
}
