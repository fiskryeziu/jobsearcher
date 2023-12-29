// pages/api/gjirafa.ts
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

        await page.goto('https://kosovajob.com/?jobIndustry=15');

        const html = await page.content();

        const $ = cheerio.load(html);

        const listings = $('.listCnt > .jobListCnts')
            .map((idx, element) => {

                const link = $(element).find('a').attr('href') || ''

                const imgUrl = $(element).find('a').children('.jobListImage').attr('data-background-image');

                const title = $(element).find('a').children('.jobListCntsInner').children('.jobListTitle').text().trim()

                const country = $(element).find('a').children('.jobListCntsInner').children('.jobListCity').text().trim()

                const expireDate = $(element).find('a').children('.jobListCntsInner').children('.jobListExpires').text().trim()


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
