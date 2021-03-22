/* eslint-disable no-param-reassign */
/* eslint-disable no-plusplus */
import IResultDTO from '@modules/search/dtos/IResultDTO';
import ISearchProductParamsDTO from '@modules/search/dtos/ISearchProductParamsDTO';
import IResearcherProvider from '../models/IResearcherProvider';

async function getRandom<T>(arr: Array<T>, n: number): Promise<Array<T>> {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

async function getFiltered(
  arr: IResultDTO[],
  max_price?: number,
  min_price?: number
): Promise<IResultDTO[]> {
  if (max_price && !min_price) return arr.filter(i => i.price < max_price);
  if (!max_price && min_price) return arr.filter(i => i.price > min_price);
  if (max_price && min_price)
    return arr.filter(i => i.price > min_price && i.price < max_price);
  return arr;
}

class FakeResearcherProvider implements IResearcherProvider {
  products: IResultDTO[] = [
    {
      title: 'monitor dell p2419h led 24" preto 100v/240v',
      price: 1179.25,
      link:
        'https://www.mercadolivre.com.br/monitor-dell-p2419h-led-24-preto-100v240v/p/MLB15119354?pdp_filters=category:MLB99245#searchVariation=MLB15119354&position=1&type=product&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: 'monitor dell 23,8 se2419hr',
      price: 919.58,
      link:
        'https://produto.mercadolivre.com.br/MLB-1474494335-monitor-dell-238-se2419hr-_JM?searchVariation=52692199856#searchVariation=52692199856&position=4&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: 'monitor dell 24 se2419hr + teclado mouse sem fio dell km636',
      price: 1048.33,
      link:
        'https://produto.mercadolivre.com.br/MLB-1665127332-monitor-dell-24-se2419hr-teclado-mouse-sem-fio-dell-km636-_JM?searchVariation=64663529637#searchVariation=64663529637&position=7&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: 'monitor dell 24 se2419hr + mouse sem fio bluetooth ms3320w',
      price: 1028.67,
      link:
        'https://produto.mercadolivre.com.br/MLB-1665127323-monitor-dell-24-se2419hr-mouse-sem-fio-bluetooth-ms3320w-_JM?searchVariation=64663529156#searchVariation=64663529156&position=10&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: '02un monitor dell ultrasharp u2410 full hd (com detalhes)',
      price: 1000.99,
      link:
        'https://produto.mercadolivre.com.br/MLB-1748373517-02un-monitor-dell-ultrasharp-u2410-full-hd-com-detalhes-_JM?searchVariation=71281179031#searchVariation=71281179031&position=12&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: 'monitor dell 24 polegadas ultrasharp u2410f vl.unitário-pç',
      price: 1200.99,
      link:
        'https://produto.mercadolivre.com.br/MLB-1759419736-monitor-dell-24-polegadas-ultrasharp-u2410f-vlunitario-pc-_JM?searchVariation=72531914097#searchVariation=72531914097&position=16&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: 'monitor lcd dell ultrasharp 2407 (12x sem juros)',
      price: 1450.83,
      link:
        'https://produto.mercadolivre.com.br/MLB-1492457268-monitor-lcd-dell-ultrasharp-2407-12x-sem-juros-_JM#position=23&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: 'monitor dell se2416h led 24 preto e alumínio 100v/240v',
      price: 800.67,
      link:
        'https://produto.mercadolivre.com.br/MLB-1818801655-monitor-dell-se2416h-led-24-preto-e-aluminio-100v240v-_JM#position=24&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: 'monitor profissional full hd ips 23,8 widescreen dell p2419h',
      price: 1179.25,
      link:
        'https://produto.mercadolivre.com.br/MLB-1085532565-monitor-profissional-full-hd-ips-238-widescreen-dell-p2419h-_JM?searchVariation=47135054108#searchVariation=47135054108&position=32&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: 'kit monitor dell 24 p2419h + teclado e mouse wireless',
      price: 1218.5,
      link:
        'https://produto.mercadolivre.com.br/MLB-1719014273-kit-monitor-dell-24-p2419h-teclado-e-mouse-wireless-_JM?searchVariation=68257846035#searchVariation=68257846035&position=33&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: 'monitor gamer dell s2421hgf',
      price: 1535.92,
      link:
        'https://produto.mercadolivre.com.br/MLB-1752239334-monitor-gamer-dell-s2421hgf-_JM?searchVariation=71961400348#searchVariation=71961400348&position=37&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: 'monitor dell 24 gamer s2421hgf',
      price: 1510.83,
      link:
        'https://produto.mercadolivre.com.br/MLB-1821376816-monitor-dell-24-gamer-s2421hgf-_JM?searchVariation=78591854802#searchVariation=78591854802&position=38&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: 'monitor gamer dell s2421hgf',
      price: 1399.89,
      link:
        'https://produto.mercadolivre.com.br/MLB-1752665711-monitor-gamer-dell-s2421hgf-_JM?searchVariation=72029100710#searchVariation=72029100710&position=39&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: 'monitor gamer dell s2421hgf',
      price: 1443.07,
      link:
        'https://produto.mercadolivre.com.br/MLB-1752609423-monitor-gamer-dell-s2421hgf-_JM?searchVariation=72023355088#searchVariation=72023355088&position=40&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: 'monitor gamer dell s2421hgf',
      price: 1465.08,
      link:
        'https://produto.mercadolivre.com.br/MLB-1751915110-monitor-gamer-dell-s2421hgf-_JM?searchVariation=71964602108#searchVariation=71964602108&position=43&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: 'monitor dell p2419h led 24 preto 100v/240v',
      price: 1275.11,
      link:
        'https://produto.mercadolivre.com.br/MLB-1809815859-monitor-dell-p2419h-led-24-preto-100v240v-_JM?searchVariation=77378329329#searchVariation=77378329329&position=44&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: 'monitor gamer dell 23.8 s2421hgf',
      price: 1450.83,
      link:
        'https://produto.mercadolivre.com.br/MLB-1800360712-monitor-gamer-dell-238-s2421hgf-_JM?searchVariation=76569157928#searchVariation=76569157928&position=46&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: 'monitor dell 24 polegadas ultrasharp u2412m - cor real',
      price: 1100.67,
      link:
        'https://produto.mercadolivre.com.br/MLB-1811862688-monitor-dell-24-polegadas-ultrasharp-u2412m-cor-real-_JM?searchVariation=77520213110#searchVariation=77520213110&position=47&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
    {
      title: 'monitor dell ultrasharp u2412mb - cores reais',
      price: 1000.33,
      link:
        'https://produto.mercadolivre.com.br/MLB-1817434760-monitor-dell-ultrasharp-u2412mb-cores-reais-_JM?searchVariation=78176513621#searchVariation=78176513621&position=48&type=item&tracking_id=b6ddacde-8f4d-4784-9558-bd1223c38574',
    },
  ];

  findProduct({
    max_price,
    min_price,
  }: ISearchProductParamsDTO): Promise<IResultDTO[]> {
    if (max_price || min_price)
      return getFiltered(this.products, max_price, min_price);
    return getRandom<IResultDTO>(this.products, 5);
  }
}

export default FakeResearcherProvider;
