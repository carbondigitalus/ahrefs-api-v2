// Core Modules
const fs = require('fs');

// NPM Modules
const superagent = require('superagent');
const dotenv = require('dotenv');

// Setup Config File
dotenv.config({
  path: './config.env'
});

const ahrefsToken = process.env.AHREFS_TOKEN;
const ahrefsDomain = process.env.DOMAIN;
const ahrefsLimitRecords = 1000;
const ahrefsOutputFormat = 'json';
const ahrefsMode = 'domain';
const ahrefsTable = 'anchors';

const ahrefsAPIURL = `https://apiv2.ahrefs.com?token=${ahrefsToken}&target=${ahrefsDomain}&limit=${ahrefsLimitRecords}&output=${ahrefsOutputFormat}&from=${ahrefsTable}&mode=${ahrefsMode}`;

(async () => {
  try {
    const res = await superagent.get(ahrefsAPIURL).parse();
    const jsonData = JSON.stringify(res, null, 2);
    fs.writeFileSync(`${__dirname}/results.json`, jsonData, err => {
      if (err) throw err;
      console.log('The file has been saved!');
      console.log(res);
    });
  } catch (err) {
    console.error(err);
  }
})();

// list of all paths
// [
// 'ahrefs_rank'
// 'anchors'
// 'anchors_refdomains'
// 'backlinks'
// 'backlinks_new_lost'
// 'backlinks_new_lost_counters'
// 'backlinks_one_per_domain'
// 'broken_backlinks'
// 'broken_links'
// 'domain_rating'
// 'linked_anchors'
// 'linked_domains'
// 'linked_domains_by_type'
// 'metrics'
// 'metrics_extended'
// 'pages'
// 'pages_extended'
// 'pages_info'
// 'positions_metrics'
// 'refdomains'
// 'refdomains_by_type'
// 'refdomains_new_lost'
// 'refdomains_new_lost_counters'
// 'refips'
// 'subscription_info'
// ]
