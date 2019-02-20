const adsSdk = require('facebook-nodejs-business-sdk');

// Access token must be a user's token that is connected to their ad account
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

// Instantiate facebook variables
const api = adsSdk.FacebookAdsApi.init(ACCESS_TOKEN);
const AdAccount = adsSdk.AdAccount;
const Campaign = adsSdk.Campaign;
const account = new AdAccount('act_850527055283741');

console.log(account.id); // fields can be accessed as properties

account
  .createCampaign([Campaign.Fields.Id], {
    [Campaign.Fields.name]: 'Page likes campaign', // Each object contains a fields map with a list of fields supported on that object.
    [Campaign.Fields.status]: Campaign.Status.paused,
    [Campaign.Fields.objective]: Campaign.Objective.page_likes
  })
  .then(result => {})
  .catch(error => {
    console.log(error);
  });
