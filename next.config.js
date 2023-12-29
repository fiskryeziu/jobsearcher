/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'noah.gjirafa.com',
            },
            {
                protocol: 'https',
                hostname: 'kosovajob.com',
            },
            {
                protocol: 'https',
                hostname: 'ofertapune.net',
            },
            {
                protocol: 'https',
                hostname: 'jobs.telegrafi.com',
            },
        ],
    },
}

module.exports = nextConfig
