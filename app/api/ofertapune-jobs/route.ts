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

        await page.goto('https://ofertapune.net/kategori-pune/teknologji-e-informacionit/');

        const html = await page.content();

        const $ = cheerio.load(html);

        const listings = $('.job_listings > li')
            .map((idx, element) => {

                const link = $(element).find('a').attr('href') || ''

                const imgUrl = $(element).find('.job_listing-logo').children('img').attr('src')

                const title = $(element).find('.job_listing-about').children('.job_listing-position').children('.job_listing-title').text().trim()
                const country = $(element).find('.job_listing-location').text().trim()

                const dateEl = $(element).find('.job_listing-meta').children('.application-deadline').text().trim()
                const [_, date] = dateEl.split(':')
                const expireDate = date.trim()

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
