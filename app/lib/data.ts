import puppeteer from "puppeteer";
import * as cheerio from 'cheerio';
import { TJobListing } from '@/app/lib/definitions';



export async function getGjirafaJobListings() {
    let browser

    try {
        browser = await puppeteer.launch({
            headless: 'new'
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

        return listings
    } catch (error) {
        throw new Error("Internal Server Error");
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
export async function getKosovaJobListings() {
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

        return listings
    } catch (error) {
        throw new Error("Internal Server Error");
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

export async function getTelegrafiJobListings() {
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

        return listings
    } catch (error) {
        throw new Error("Internal Server Error");
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

export async function getOfertaPuneJobListings() {
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

        return listings
    } catch (error) {
        throw new Error("Internal Server Error");
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}
export async function getSuperpunaJobListings() {
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

        return listings
    } catch (error) {
        throw new Error("Internal Server Error");
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}