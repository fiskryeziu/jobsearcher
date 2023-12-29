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

        await page.goto('https://jobs.telegrafi.com/?q=&vendi=&kategoria=Teknologji+Informative+-+IT');

        const html = await page.content();

        const $ = cheerio.load(html);

        const listings = $('.col-lg-8.col-md-12 > .job-info.item-job')
            .map((idx, element): TJobListing => {

                const link = $(element).find('a').attr('href') || ''

                const imgUrl = $(element).find('a').children('img').attr('src');

                const title = $(element).find('a').children('.job-name').children('h3').text().trim()
                const country = $(element).find('a').children('.job-name').children('.puna-location').text().trim()
                const expireDate = $(element).find('a').children('.job-schedule').children('span').text().trim()




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
