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


}