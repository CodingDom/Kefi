const _ = require('lodash');
const axios = require("axios");
const BASE_URL = 'https://api.airdna.co';
const token = process.env.AIRDNA_API_KEY;

module.exports = function (router) {
    router.get('/locations', function (req, res) {
        axios.get(`${BASE_URL}/v1/market/search?access_token=${token}&term=${req.query.location}`)
            .then(function (resp) {
                res.send(resp.data);
            })
            .catch(function (err) {
                res.status(500).send(err.message);
            });
    });

    router.get('/properties', function (req, res) {
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

        axios.get(`${BASE_URL}/v1/market/property_list?access_token=${token}&city_id=${req.query.cityId}&start_month=${startMonth}&start_year=${startYear}&number_of_months=${numberOfMonths}&currency=${currency}${extras}`)
            .then(function (resp) {
                res.send(resp.data);
            })
            .catch(function (err) {
                res.status(500).send(err.message);
            });
    });

    router.get('/properties/:id', async function (req, res) {
        const id = req.params.id;

        if (!id) {
            return res.status(404).send('No property ID provided!');
        }

        try {
            // First API call to search for the property
            const searchResp = await axios.get(`${BASE_URL}/api/search/v1/strs/verbose?q=${id}&limit=1`, {
                headers: {
                    'Cookie': `mmm-cookie=${token};`
                }
            });

            // Extract the cleanId using lodash
            const cleanId = _.get(searchResp, 'data.payload.search_results[0].document.staticCombinedPropertyId', '');

            if (!cleanId) {
                return res.status(404).send('Property not found!');
            }

            // Second API call using the cleanId to get the property details
            const propertyResp = await axios.get(`${BASE_URL}/api/explorer/v1/listing/${cleanId}?access_token=${token}&currency=usd&use_native_currency=false`);

            res.send(propertyResp.data);
        } catch (err) {
            res.status(err.response?.status || 500).send(err.message);
        }
    });
}