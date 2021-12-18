const axios = require("axios");
const cheerio = require('cheerio');

module.exports = function(router) {
    router.get('/travel-news', function(req, res) {
        axios.get("https://www.travelpulse.com/destinations/")
            .then(function(resp) {
                const $ = cheerio.load(resp.data);
                const destinations = [];

                $(".regional_news li").each((index, elem) => {
                    const locationLink = $(elem).find("> p").first().find("a");
                    const locationName = locationLink.text();
                    const locationUrl = locationLink.attr("href");
                    const thumbnail = $(elem).find("> a").find("img");
                    const thumbnailAlt = thumbnail.attr("alt");
                    const thumbnailSrc = thumbnail.data("src");
                    const titleLink = $(elem).find("> a").next().find("a");
                    const titleUrl = titleLink.attr("href");
                    const titleText = titleLink.text();
                    const categoryLink = $(elem).find("> p").last().find("a");
                    const categoryText = categoryLink.text();
                    const categoryUrl = categoryLink.attr("href");

                    destinations.push({
                        location: {
                            url: locationUrl,
                            title: locationName
                        },
                        thumbnail: {
                            alt: thumbnailAlt,
                            src: thumbnailSrc
                        },
                        category: {
                            url: categoryUrl,
                            title: categoryText
                        },
                        headline: titleText,
                        url: titleUrl
                    });
                });

                res.send(destinations);
            })
            .catch(function(err) {
                console.log(err);
                res.status(500).send(err.message);
            });
    });

    router.get('/travel-news/all', function(req, res) {
        axios.get("https://travelpulse.com/destinations")
            .then(function(resp) {
                const $ = cheerio.load(resp.data);
                const categoryRequests = [];
                $(".categories").find("a").each((index, elem) => {
                    const href = $(elem).attr("href");
                    if (href && href.trim() != "")
                        categoryRequests.push(axios.get(href));
                });

                // Grabbing info from every destination category.
                axios.all(categoryRequests)
                    .then(axios.spread((...responses) => {
                        const destinations = [];
                        responses.forEach(destinationResp => {
                            const $$ = cheerio.load(destinationResp.data);
                            $$(".regional_news li").each((index, elem) => {
                                const locationLink = $$(elem).find("> p").first().find("a");
                                const locationName = locationLink.text();
                                const locationUrl = locationLink.attr("href");
                                const thumbnail = $$(elem).find("> a").find("img");
                                const thumbnailAlt = thumbnail.attr("alt");
                                const thumbnailSrc = thumbnail.data("src");
                                const titleLink = $$(elem).find("> a").next().find("a");
                                const titleUrl = titleLink.attr("href");
                                const titleText = titleLink.text();
                                const categoryLink = $$(elem).find("> p").last().find("a");
                                const categoryText = categoryLink.text();
                                const categoryUrl = categoryLink.attr("href");

                                destinations.push({
                                    location: {
                                        url: locationUrl,
                                        title: locationName
                                    },
                                    thumbnail: {
                                        alt: thumbnailAlt,
                                        src: thumbnailSrc
                                    },
                                    category: {
                                        url: categoryUrl,
                                        title: categoryText
                                    },
                                    headline: titleText,
                                    url: titleUrl
                                });
                            });
                        });
                        res.send(destinations);
                    }))
                    .catch(errors => {
                        console.log(errors);
                        if (destinations.length == 0) {
                            res.status(500).end();
                        } else {
                            res.send(destinations);
                        }
                    });

            })
            .catch(function(err) {
                console.log(err);
                res.status(500).send(err.message);
            });
    });
}