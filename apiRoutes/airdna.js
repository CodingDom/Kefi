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
        axios.get(`https://api.airdna.co/v1/market/property_list?access_token=${token}&city_id=${req.query.cityId}&start_month=5&start_year=2021&number_of_months=2&currency=native`)
            .then(function(resp) {
                res.send(resp.data);
            })
            .catch(function(err) {
                res.status(500).send(err.message);
            });
    });
}