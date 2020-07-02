import puppeteer from "puppeteer";

const FindInOlx = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("https://df.olx.com.br/", { waitUntil: "networkidle2" });
  await page.waitForSelector("input.sc-1ppbg7c-1.jfvJlv");
  await page.focus("input.sc-1ppbg7c-1.jfvJlv");
  await page.keyboard.type("fone sony");

  await page.waitForSelector("button");

  await page.click("button");

  const names = await page.evaluate(() => {
    const elements = document.querySelectorAll(".sc-1fcmfeb-2.ggOGTJ");
    const list = Array.from(elements);
    const mylist = list.map((item) => ({
      name: item.querySelector<HTMLElement>("h2.fnmrjs-10.deEIZJ")?.innerText,
    }));
    return mylist;
  });

  await browser.close();
  console.log(names);
};

FindInOlx();
