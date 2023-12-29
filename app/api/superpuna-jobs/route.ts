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

        await page.goto('https://superpuna.rks-gov.net/job-seeker?category_id=15');

        const html = await page.content();

        const $ = cheerio.load(html);

        const listings = $('.relative.col-span-9 > a')
            .map((idx, element): TJobListing => {

                const link = $(element).attr('href') || ''

                const imgUrl = null

                const title = $(element).find('div > h3').text().trim()
                const country = $(element).find('div > p').eq(0).children('strong').text().trim()
                const expireDate = $(element).find('div > p').eq(1).children('strong').text().trim()

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
