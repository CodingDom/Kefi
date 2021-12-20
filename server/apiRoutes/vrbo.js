const axios = require("axios");
const cheerio = require('cheerio');

module.exports = function(router) {
    router.get('/vrbo/:id', function(req, res) {
        const id = req.params.id;
        const url = `http://www.vrbo.com/${id}`;
        axios.get(url)
            .then(function(resp) {
                const cleanedHtml = "<fake>" + resp.data + "</fake>";
                const $ = cheerio.load(cleanedHtml);
                const dataScript = $("script:contains('window.__INITIAL_STATE__ =')").html();
                const startIndex = dataScript.indexOf("{");
                const endIndex = dataScript.indexOf("};") + 1;
                const dataObj = dataScript.substring(startIndex, endIndex);
                const info = JSON.parse(dataObj);
                res.send(info);
            })
            .catch(function(err) {
                console.log(err);
                res.status(500).send(err.message);
            });
    });
}