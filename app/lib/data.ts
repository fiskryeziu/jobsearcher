import * as cheerio from 'cheerio';
import { TJobListing } from '@/app/lib/definitions';
import axios from "axios";
import { unstable_noStore as noStore } from "next/cache";



export async function getKosovaJobListings() {
    noStore()

    try {
        const html = await axios.get('https://kosovajob.com/?jobIndustry=15')

        const $ = cheerio.load(html.data);

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
    }
}

export async function getTelegrafiJobListings() {
    noStore()

    try {
        const html = await axios.get('https://jobs.telegrafi.com/?q=&vendi=&kategoria=Teknologji+Informative+-+IT')

        const $ = cheerio.load(html.data);

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
    }
}

export async function getOfertaPuneJobListings() {
    noStore()

    try {
        const html = await axios.get('https://ofertapune.net/kategori-pune/teknologji-e-informacionit/')

        const $ = cheerio.load(html.data);

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
    }
}
