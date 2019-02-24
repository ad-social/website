const FB = require('fb');

const appId = '604130970011271';
const appSecret = '06f55f6235b1ab9a9a60e8fe9404f35d';
const shortLivedToken =
  'EAAIldDPdhocBAAoma1ZACtzV5LsEWdNIJSRPZAa2llZChFZAegl1LXKEz6dCJlJCrXNRaXqID7EgAZAlkHeBXZBFWPVWSPOlA43TnQW6mpbmH4sZCr1nx3QPotHQnYXGnaRToD87r9owu7znnppO9WygwpOeQt3t7DKJzGjPttxXUpRN1dEWwCXdjJICieqorgy2ScMIdZCHGgZDZD';

FB.api(
  'oauth/access_token',
  {
    grant_type: 'fb_exchange_token',
    client_id: appId,
    client_secret: appSecret,
    fb_exchange_token: shortLivedToken
  },
  res => {
    if (!res || res.error) {
      console.log(!res ? 'error occurred' : res.error);
      return;
    }

    const accessToken = res.access_token;
    console.log('NewToken: ', accessToken);
    console.log('Result: ', res);
  }
);
