const axios = require("axios");

const base = "https://www.reddit.com";
const timeFrame = "month";
const maxPosts = "100";
const topListingsUrl = `${base}/r/deadbydaylight/top/.json?t=${timeFrame}&limit=${maxPosts}`;
const listingReq = (permalink) => axios.get(`${base}${permalink}.json`);

async function main() {
  // get top listings
  const topListings = await axios
    .get(topListingsUrl)
    .then((res) => res.data.data.children);
  // get each individual listing
  const listingResponses = await axios.all(
    topListings.map((listing) => listingReq(listing.data.permalink))
  );
  const listings = listingResponses.map((res) => res.data);
}

main();
