const axios = require("axios");
const UserServices = require("./userInfoService");
const config = require("../config");

function callback(req, res) {
  const body = {
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code: req.query.code,
  };
  const options = { headers: { accept: "application/json" } };
  axios
    .post(`${config.oauthUrl}/access_token`, body, options)
    .then((resp) => resp.data["access_token"])
    .then((accessToken) => {
      UserServices.getUserInfo(accessToken).then(user => {
        return res.json({
          data: {
            login: user.login,
            githubId: user.id,
            avatar: user.avatar_url,
            email: user.email,
            name: user.name,
            location: user.location,
          },
        });
      });
    })
    .catch((err) => res.status(500).json({ message: err.message }));
}

module.exports = {
  callback: callback,
};
