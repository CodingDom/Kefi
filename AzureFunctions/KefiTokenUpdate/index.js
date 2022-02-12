const axios = require("axios");
require("dotenv").config();

module.exports = async function (context, req) {

    try {
        const { token } = await axios.post("https://www.airdna.co/api/v1/account/login", 
            {
                username: process.env.AIRDNA_EMAIL,
                password: process.env.AIRDNA_PASSWORD,
                remember_me: false
        });

        await axios.patch("https://api.heroku.com/apps/88a262b1-d1ab-4da1-b9c4-b543aff1e29d/config-vars",
        {
            AIRDNA_API_KEY: token
        },
        {
            headers: {
                'Authorization': "Bearer " + process.env.HEROKU_AUTH_TOKEN || req.body.heroku_auth_token,
                'Accept': "application/vnd.heroku+json; version=3"
            }
        });
        context.res = {
            body: "Successfully updated token!"
        }
        return context.res;
    }
    catch(e) {
        context.res = {
            status: 500,
            body: e.message
        }
        return context.res;
    }
}