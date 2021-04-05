/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
/* eslint-disable no-loop-func */
/* eslint-disable no-await-in-loop */
import puppeteer from 'puppeteer';
import IPuppeteerParamsDTO from '@modules/search/dtos/IPuppeteerParamsDTO';
import IResultDTO from '@modules/search/dtos/IResultDTO';
import IPuppeteerResearcherProvider from '../models/IPuppeteerResearcherProvider';

export default class OlxProvider implements IPuppeteerResearcherProvider {
  provider = 'olx';

  public async findTags({
    pages,
    product_description,
  }: IPuppeteerParamsDTO): Promise<IResultDTO[]> {
    const chromeOptions = {
      headless: true,
      defaultViewport: null,
      args: ['--incognito', '--no-sandbox', '--single-process', '--no-zygote'],
    };
    const browser = await puppeteer.launch(chromeOptions);
    // Criando nova aba
    const page = await browser.newPage();
    // Redirecionando para o url desejada
    await page.goto('https://df.olx.com.br/', {
      waitUntil: 'networkidle2',
    });
    try {
      // Selecionando o campo de pesquisa
      await page.waitForSelector('input[placeholder=Buscar]');
      await page.focus('input[placeholder=Buscar]');
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
                  `${
                    item.querySelector<HTMLElement>('p[weight=bold]')
                      ? item
                          .querySelector<HTMLElement>('p[weight=bold]')
                          ?.innerText.replace('R$ ', '')
                          .replace('.', '')
                      : 0
                  }`
                ),
                link: item
                  .querySelector<HTMLElement>('a[data-lurker-detail=list_id]')
                  ?.getAttribute('href'),
              } as IResultDTO)
          );
        });

        products.push(...info);

        try {
          await page.waitForSelector('a[data-lurker-detail=next_page]');
          await page.click('a[data-lurker-detail=next_page]');
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
