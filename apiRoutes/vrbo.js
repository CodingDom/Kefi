const axios = require("axios");
const cheerio = require('cheerio');

module.exports = function(router) {
    router.get('/vrbo/:id', function(req, res) {
        const id = req.params.id;
        const url = `http://api.allorigins.win/get?url=https%3A//www.vrbo.com/${id}&callback=?`;
        axios.get(url, {
                headers: {
                    "Content-Type": "text/json"
                }
            })
            .then(function(resp) {
                const cleanedHtml = "<fake>" + resp.data + "</fake>";
                const $ = cheerio.load(cleanedHtml);
                const dataScript = $("script:contains('window.__INITIAL_STATE__ =')").html();
                const startIndex = dataScript.indexOf("{");
                const endIndex = dataScript.indexOf(";");
                const dataObj = dataScript.substring(startIndex, endIndex)
                    .replace(/{\\"/g, `{"`).replace(/\\"}/g, `"}`)
                    .replace(/\\":/g, `":`).replace(/:\\"/g, `:"`)
                    .replace(/,\\"/g, `,"`).replace(/\\",/g, `",`)
                    .replace(/\[\\"/g, `["`).replace(/\\"\]/g, `"]`);
                const uselessIndex = dataObj.indexOf(`,"abacusTestsReducer`);
                const info = JSON.parse(dataObj.substring(0, uselessIndex) + "}");
                res.send(info);
            })
            .catch(function(err) {
                res.status(500).send(err.message);
            });
    });
}