const axios = require("axios");
const BASE_URL = 'https://randomuser.me/api/';

module.exports = function (router) {
    router.get('/reviewers', function (req, res) {
        const { page, results, seed } = req.query;
        axios({
            method: 'get',
            url: `${BASE_URL}?page=${page}&results=${results}&seed=${seed}`,
            timeout: 1000
        })
        .then(function (resp) {
            res.send(resp.data);
        })
        .catch(function () {
            const today = new Date();
            const pastDate = new Date();
            pastDate.setFullYear(today.getFullYear() - 2);

            const mockUsers = new Array(parseInt(results)).fill('').map((_, i) => ({
                name: {
                    first: "Demo",
                    last: "User " + ((i + 1) * page)
                },
                picture: {
                    thumbnail: ""
                },
                registered: {
                    date: new Date(pastDate.getTime() + Math.random() * (today.getTime() - pastDate.getTime())).toISOString()
                }
            }));
            const data = {
                results: mockUsers
            };
            res.send(data);
        });
    });
}