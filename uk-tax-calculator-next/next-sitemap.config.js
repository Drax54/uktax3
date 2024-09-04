// next-sitemap.config.js

module.exports = {
    siteUrl: process.env.SITE_URL || 'http://localhost:3000', // Replace with your site's URL
    generateRobotsTxt: true, // Generate robots.txt file
    sitemapSize: 7000, // Split sitemaps after a certain size
    changefreq: 'weekly', // Default change frequency
    priority: 0.7, // Default priority
};
