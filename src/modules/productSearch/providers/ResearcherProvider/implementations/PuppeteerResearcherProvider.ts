/* eslint-disable no-await-in-loop */
/* eslint-disable no-loop-func */
import puppeteer from 'puppeteer';
import IResearchParamsDTO from '@modules/productSearch/dtos/IResearchParamsDTO';
import IResultDTO from '@modules/productSearch/dtos/IResultDTO';
import IResearcherProvider from '../models/IResearcherProvider';

export default class PuppeteerResearcherProvider
  implements IResearcherProvider {
  public async findProduct({
    site_url,
    input_tag,
    product_description,
    item_tag,
    title_tag,
    price_tag,
    product_link,
    next_page_tag,
  }: IResearchParamsDTO): Promise<IResultDTO> {
    const browser = await puppeteer.launch();
    // Criando nova aba
    const page = await browser.newPage();
    // Redirecionando para o url desejada
    await page.goto(site_url, { waitUntil: 'networkidle2' });

    // Selecionando o campo de pesquisa
    await page.waitForSelector(input_tag);
    await page.focus(input_tag);
    // Escrevendo o item procurado
    await page.keyboard.type(product_description);

    // Apertando o botão de pesquisa
    await page.keyboard.press('Enter');

    const products = [];
    // Procurando nas paginas
    for (let i = 0; i < pages; i++) {
      await page.waitForSelector(item_tag);
      const info = await page.evaluate(() => {
        const elements = document.querySelectorAll(item_tag);
        const list = Array.from(elements);
        return list.map(item => ({
          name: item.querySelector<HTMLElement>(title_tag)?.innerText,
          price: item.querySelector<HTMLElement>(price_tag)
            ? item
                .querySelector<HTMLElement>(price_tag)
                ?.innerText.replace('R$ ', '')
                .replace('.', '')
            : '',
          link: item
            .querySelector<HTMLElement>(product_link)
            ?.getAttribute('href'),
        }));
      });
      products.push(...info);
      try {
        await page.waitForSelector(next_page_tag);
        await page.click(next_page_tag);
      } catch {
        i = pages;
      }
    }
    // Fechando o browser
    await browser.close();
  }
}
