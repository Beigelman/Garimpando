/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import puppeteer from 'puppeteer';
import IPuppeteerParamsDTO from '@modules/search/dtos/IPuppeteerParamsDTO';
import IResultDTO from '@modules/search/dtos/IResultDTO';
import IPuppeteerResearcherProvider from '../models/IPuppeteerResearcherProvider';

export default class OlxProvider implements IPuppeteerResearcherProvider {
  public async findTags({
    pages,
    product_description,
  }: IPuppeteerParamsDTO): Promise<IResultDTO[]> {
    const browser = await puppeteer.launch({
      defaultViewport: { width: 1920, height: 1080 },
    });
    // Criando nova aba
    const page = await browser.newPage();
    // Redirecionando para o url desejada
    await page.goto('https://df.olx.com.br/', {
      waitUntil: 'networkidle2',
    });
    try {
      // Selecionando o campo de pesquisa
      await page.waitForSelector('input');
      await page.focus('input');
      // Escrevendo o item procurado
      await page.keyboard.type(product_description);

      // Apertando o botão de pesquisa
      await page.keyboard.press('Enter');

      const products = [];
      // Procurando nas paginas
      for (let i = 0; i < pages; i++) {
        await page.waitForSelector('li.sc-1fcmfeb-2');
        const info = await page.evaluate(() => {
          const elements = document.querySelectorAll('li.sc-1fcmfeb-2');
          const list = Array.from(elements);
          return list.map(
            item =>
              ({
                title: item.querySelector<HTMLElement>('h2.fnmrjs-10')
                  ?.innerText,
                price: item.querySelector<HTMLElement>('p.fnmrjs-16')
                  ? item
                      .querySelector<HTMLElement>('p.fnmrjs-16')
                      ?.innerText.replace('R$ ', '')
                      .replace('.', '')
                  : '',
                link: item
                  .querySelector<HTMLElement>('a.fnmrjs-0')
                  ?.getAttribute('href'),
              } as IResultDTO)
          );
        });

        products.push(...info);

        try {
          await page.waitForSelector('a.sc-1m4ygug-2');
          await page.click('a.sc-1m4ygug-2');
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
