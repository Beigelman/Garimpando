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
    const browser = await puppeteer.launch();
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
        await page.waitForSelector('li');
        const info = await page.evaluate(() => {
          const elements = document.querySelectorAll('li');
          const list = Array.from(elements);
          return list.map(
            item =>
              ({
                title: item.querySelector<HTMLElement>('h2')?.innerText,
                price: parseFloat(
                  `${item
                    .querySelector<HTMLElement>('span.price-tag-fraction')
                    ?.innerText.replace('.', '')}${
                    item.querySelector<HTMLElement>('span.price-tag-cents')
                      ? `.${
                          item.querySelector<HTMLElement>(
                            'span.price-tag-cents'
                          )?.innerText
                        }`
                      : ''
                  }`
                ),
                link: item
                  .querySelector<HTMLElement>('a')
                  ?.getAttribute('href'),
              } as IResultDTO)
          );
        });

        products.push(...info);

        try {
          await page.waitForSelector('a[title=Próxima]');
          await page.click('a[title=Próxima]');
        } catch {
          i = pages;
        }
      }
      // Fechando o browser
      await browser.close();

      return products;
    } catch {
      await browser.close();

      return [];
    }
  }
}
