import puppeteer from "puppeteer";

interface Params {
  product: string;
  pages: number;
}

export const FindInML = async ({ product, pages }: Params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      //Criando nova aba
      const page = await browser.newPage();
      //Redirecianando para o url desejada
      await page.goto("https://www.mercadolivre.com.br/", {
        waitUntil: "networkidle2",
      });

      // Seleciando o campo de pesquisa
      await page.waitForSelector("input.nav-search-input");
      await page.focus("input.nav-search-input");
      //Escrevendo o item procurado
      await page.keyboard.type(product);

      //Apertando o botão de pesquisa
      await page.keyboard.press("Enter");

      const products = [];

      //Procurando nas paginas
      for (let i = 0; i < pages; i++) {
        await page.waitForSelector("li.results-item");
        const info = await page.evaluate(() => {
          const elements = document.querySelectorAll("li.results-item");
          const list = Array.from(elements);
          return list.map((item) => ({
            name: item.querySelector<HTMLElement>("span.main-title")?.innerText,
            price: `${
              item.querySelector<HTMLElement>("span.price__fraction")?.innerText
            }${
              item.querySelector<HTMLElement>("span.price__decimals")
                ? `,${
                    item.querySelector<HTMLElement>("span.price__decimals")
                      ?.innerText
                  }`
                : ""
            }`,
            link: item
              .querySelector<HTMLElement>("a.item__info-link")
              ?.getAttribute("href"),
          }));
        });
        products.push(...info);
        try {
          await page.waitForSelector("a.andes-pagination__link.prefetch");
          await page.click("a.andes-pagination__link.prefetch");
        } catch {
          i = pages;
        }
      }
      //Fechando o browser
      await browser.close();
      console.log(products);
      //Retornando os resultados
      resolve({ products });
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

FindInML({ product: "sony wh", pages: 4 });
