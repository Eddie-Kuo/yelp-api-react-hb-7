const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

exports.handler = async (event) => {
  const zip = event.queryStringParameters.zip;
  // add code here to fetch data from yelp API
  try {
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?categories=restaurants&locations=${zip}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    return {
      statusCode: 200,
      //status code indicating that request was a success
      body: JSON.stringify(data.businesses),
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'failed to fetch data' }),
    };
  }
  // be sure to include the parameters from event.queryStringParameters
};

// module.exports = { handler };
// don't need to export if line 4 specifies export?
