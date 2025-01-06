const NodeHelper = require("node_helper");
const https = require('https');

module.exports = NodeHelper.create({
  start: function () {
    console.log("Starting Garbage Pickup module");
  },

  getPickupData: function (callback) {
    const url = "https://dataservice.deafvalapp.nl/dataservice/DataServiceServlet?type=ANDROID&service=OPHAALSCHEMA&land=NL&postcode=5702SG&straatId=0&huisnr=59&huisnrtoev=";

    https.get(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          callback(jsonData);
        } catch (e) {
          console.log("Error parsing data", e);
        }
      });
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  }
});
