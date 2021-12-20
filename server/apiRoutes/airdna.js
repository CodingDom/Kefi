const axios = require("axios");
const token = process.env.AIRDNA_API_KEY;

module.exports = function(router) {
    router.get('/locations', function(req, res) {
        axios.get(`https://api.airdna.co/v1/market/search?access_token=${token}&term=${req.query.location}`)
            .then(function(resp) {
                res.send(resp.data);
            })
            .catch(function(err) {
                res.status(500).send(err.message);
            });
    });

    router.get('/properties', function(req, res) {
        let startMonth, startYear, numberOfMonths, currency;
        const startDate = req.query.startDate ? new Date(req.query.startDate) : new Date();
        startMonth = startDate.getMonth() + 1;
        startYear = startDate.getFullYear();
        numberOfMonths = req.query.months ? parseInt(req.query.months) : 1;
        currency = req.query.currency || "usd";

        let extras = "";
        if (req.query.room_types)
            extras += `&room_types=${req.query.room_types}`;
        if (req.query.accommodates)
            extras += `&accommodates=${req.query.accommodates}`;

        axios.get(`https://api.airdna.co/v1/market/property_list?access_token=${token}&city_id=${req.query.cityId}&start_month=${startMonth}&start_year=${startYear}&number_of_months=${numberOfMonths}&currency=${currency}${extras}`)
            .then(function(resp) {
                res.send(resp.data);
            })
            .catch(function(err) {
                res.status(500).send(err.message);
            });
    });
}