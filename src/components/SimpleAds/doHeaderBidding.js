import log from './log';

const pbjsConfig = {
  cache: {
    url: 'https://prebid.adnxs.com/pbc/v1/cache',
  },
  s2sConfig: {
    endpoint: 'https://prebid.adnxs.com/pbs/v1/auction',
    syncEndpoint: 'https://prebid.adnxs.com/pbs/v1/cookie_sync',
  },
  enableSendAllBids: true,
  priceGranularity: 'dense',
};

let settings = {};
let units = {};
let user = {};
let loaded = {
  a9: true,
  pbjs: false,
}
let pbjsLoaded = false;

export default (adUnits, adSettings = {}, adUser = {}) => {
  log("HB Init")
  settings = adSettings;
  units = adUnits;
  user = adUser;

  if(settings.PBJS_ENABLED) initializePbjs();
  if(settings.PBJS_ENABLED) fetchBidsPbjs();
}

const initializePbjs = () => {
  log('HB initializePbjs');
  if(!pbjsLoaded){
    pbjsLoaded = true;
    if (settings.ONETRUST_ENABLED) {
      pbjsConfig.consentManagement = {
        cmpApi: 'iab',
        timeout: 8000,
        allowAuctionWithoutConsent: true,
      };
    }

    window.pbjs = window.pbjs || { que: [] };

    log("HB initializePbjs pbjs.setConfig PRE")
    window.pbjs.que.push(() => {
      log("HB initializePbjs pbjs.setConfig POST")
      window.pbjs.setConfig(pbjsConfig);
    });
  }
}

const fetchBidsPbjs = () => {
  log('HB fetchBidsPbjs');

  let adUnits = [];

  for(let i=0; i<units.length; i++) {
    let bidders = generateBidders(units[i].sizes);

    adUnits.push({
      code: units[i].unit,
      bids: bidders,
      sizes: units[i].sizes,
      mediaTypes: {
        banner: {
          sizes: units[i].sizes,
        }
      }
    })
  }

  window.pbjs.que.push(() => {
    window.pbjs.addAdUnits(adUnits);
    log('HB fetchBidsPbjs requesting from pbjs');
    window.pbjs.requestBids({
        bidsBackHandler: () => bidResponsePbjs(),
        timeout: settings.TIMEOUT
    });
  });
}

const bidResponsePbjs = () => {
  log("HB bidResponsePbjs");

  log("HB bidResponsePbjs "+ loaded.pbjs)

  if (loaded.pbjs) return;
    loaded.pbjs = true;

    window.googletag = window.googletag || {};
    window.googletag.cmd = window.googletag.cmd || [];
    window.googletag.cmd.push(() => {
      window.pbjs.que.push(() => {
          log("HB bidResponsePbjs setTargetingForGPTAsync");
          window.pbjs.setTargetingForGPTAsync();
      });
    });

    if(loaded.pbjs && loaded.a9){
      log('HB bidResponsePbjs calling displayAds');
      displayAds();
    }
}

const displayAds = () => {
  window.googletag.cmd.push(() => {
    for (let i=0; i < units.length; i++){
      log("HB displayAds "+ units[i].id);
    }

    window.googletag.pubads().refresh();
    loaded = { a9: true, pbjs: false }
    
    log('HB displayAds done');
  });
}

const generateBidders = (sizes) => {
  let bidders = [];

  if(settings.BIDDER_APPNEXUS_ENABLED) bidders.push({
    bidder: 'appnexus',
    user: {
      gender: user.gender === 'm' ? 1 : user.gender === 'f' ? 2 : 0,
      age: user.age || 0
    },
    allowSmallerSizes: true,
    params: {
      placementId: settings.BIDDER_APPNEXUS_PLACEMENTID,
    }
  });

  if(settings.BIDDER_AOL_ENABLED) bidders.push({
    bidder: 'aol',
    params: {
      placement: settings.BIDDER_AOL_PLACEMENT,
      network: settings.BIDDER_AOL_NETWORK,
    }
  });

  if(settings.BIDDER_IX_ENABLED) bidders.push({
    bidder: 'ix',
    params: {
      id: settings.BIDDER_IX_ID,
      siteId: settings.BIDDER_IX_SITEID,
      size: sizes[0],
    }
  });

  if(settings.BIDDER_CRITEO_ENABLED) bidders.push({
    bidder: 'criteo',
    params: {
      zoneId: settings.BIDDER_CRITEO_ZONEID,
    }
  });

  if(settings.BIDDER_RUBICON_ENABLED) bidders.push({
    bidder: 'rubicon',
    params: {
      accountId: settings.BIDDER_RUBICON_ACCOUNTID,
      siteId: settings.BIDDER_RUBICON_SITEID,
      zoneId: settings.BIDDER_RUBICON_ZONEID
    }
  });

  if(settings.BIDDER_OPENX_ENABLED) bidders.push({
    bidder: 'openx',
    params: {
      unit: settings.BIDDER_OPENX_UNIT,
      delDomain: settings.BIDDER_OPENX_DELDOMAIN
    }
  });

  return bidders;
}