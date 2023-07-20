/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        MARKETAUX_API_KEY: process.env.MARKETAUX_API_KEY,
        ALPHAVANTAGE_API_KEY: process.env.ALPHAVANTAGE_API_KEY,
    },
};

module.exports = nextConfig;
