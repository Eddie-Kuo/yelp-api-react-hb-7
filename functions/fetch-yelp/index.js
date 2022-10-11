const fetch = require('node-fetch');
require('dotenv').config({ path: `.env.development.local` });

const handler = async (event) => {
  const zip = event.queryStringParameters.zip;
  const search = event.queryStringParameters.search;
  // add code here to fetch data from yelp API
  try {
    const response = await fetch(
      `https://api.yelp.com/v3/businesses/search?categories=restaurants&location=${zip}&term=${search}`,

      //everything after the ? is setting a param for the user to access
      //before the = is the param from the API and after is what we set to the user
      // example, were setting locations to the zip the user types in
      // console.log('response', response),
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
    console.error(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'failed to fetch data' }),
    };
  }
  // be sure to include the parameters from event.queryStringParameters
};

module.exports = { handler };
