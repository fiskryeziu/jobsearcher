import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import { TJobListing } from '@/app/lib/definitions';

export async function GET() {
    let browser

    try {
        browser = await puppeteer.launch({
            headless: 'new',
        });

        const page = await browser.newPage();

        await page.goto('https://gjirafa.com/Top/Pune?k=Teknologji%20Informative%20-%20IT');

        const html = await page.content();

        const $ = cheerio.load(html);

        const listings = $('.listView.fullRelLeft.mrrjp > li')
            .map((idx, element): TJobListing => {

                const link = $(element).find('a').attr('href') || ''

                const title = $(element).find('#titulli a').text().trim();

                const format = (arr: string[]) => {
                    return arr.map((item) => {
                        const [_, value] = item.split(":")

                        return value.trim()
                    })
                }
                const styleAttributeValue = $(element).find('div.mp_img').attr('style');

                let urlMatch
                if (styleAttributeValue) urlMatch = /url\('([^']+)'\)/.exec(styleAttributeValue);

                const imgUrl = urlMatch && urlMatch[1];

                const jobInfo1 = $(element).find('.half.mrrjp_ct').eq(0).find('p').map((idx, innerElement) => {
                    const pText = $(innerElement).text().trim();
                    return pText
                }).toArray()

                const jobInfo2 = $(element).find('.half.mrrjp_ct').eq(1).find('p').map((idx, innerElement) => {
                    const pText = $(innerElement).text().trim();
                    return pText
                }).toArray()

                const country = format(jobInfo1)[1]
                const expireDate = format(jobInfo2)[2]

                return { idx, link, title, country, expireDate, imgUrl };
            })
            .get();

        return Response.json(listings);
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Internal Server Error' });
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
