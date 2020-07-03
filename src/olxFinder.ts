import puppeteer from "puppeteer";
interface Params {
  product: string;
  pages: number;
}

export const FindInOlx = async ({ product, pages }: Params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      //Criando nova aba
      const page = await browser.newPage();
      //Redirecianando para o url desejada
      await page.goto("https://df.olx.com.br/", { waitUntil: "networkidle2" });

      //Seleciando o campo de pesquisa
      await page.waitForSelector("input.sc-1ppbg7c-1.jfvJlv");
      await page.focus("input.sc-1ppbg7c-1.jfvJlv");
      //Escrevendo o item procurado
      await page.keyboard.type(product);

      //Apertando o botão de pesquisa
      await page.keyboard.press("Enter");

      const products = [];
      //Procurando nas paginas
      for (let i = 0; i < pages; i++) {
        await page.waitForSelector(".sc-1fcmfeb-2.ggOGTJ");
        const info = await page.evaluate(() => {
          const elements = document.querySelectorAll(".sc-1fcmfeb-2.ggOGTJ");
          const list = Array.from(elements);
          return list.map((item) => ({
            name: item.querySelector<HTMLElement>("h2.fnmrjs-10.deEIZJ")
              ?.innerText,
            price: item
              .querySelector<HTMLElement>("p.fnmrjs-16.jqSHIm")
              ?.innerText.replace("R$ ", ""),
            link: item
              .querySelector<HTMLElement>("a.fnmrjs-0.iZLVht")
              ?.getAttribute("href"),
          }));
        });
        products.push(...info);
        try {
          await page.waitForSelector("a.sc-1m4ygug-2.iDkXSM");
          await page.click("a.sc-1m4ygug-2.iDkXSM");
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

FindInOlx({ product: "sony wh", pages: 4 });
