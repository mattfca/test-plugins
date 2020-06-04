import React from "react";
import Ads from '../../components/SimpleAds';
import defineSlots from '../../components/SimpleAds/defineSlots';
import initializeGpt from '../../components/SimpleAds/initializeGpt';
import doHeaderBidding from '../../components/SimpleAds/doHeaderBidding';
import adUnits from './adUnits';

const adUser = {
  country: 'us',
  gender: 'm',
  age: 55
};

const adSettings = {
  TIMEOUT: 300,
  DEBUG: true,
  ADOMIK_ENABLED: true,
  A9_ENABLED: false,
  A9_PUBID: '3121',
  PBJS_ENABLED: true,
  ONETRUST_ENABLED: true,
  BIDDER_APPNEXUS_ENABLED: true,
  BIDDER_APPNEXUS_PLACEMENTID: '11092385',
  BIDDER_AOL_ENABLED: true,
  BIDDER_AOL_PLACEMENT: '4523445',
  BIDDER_AOL_NETWORK: '9457.1',
  BIDDER_IX_ENABLED: true,
  BIDDER_IX_ID: '11',
  BIDDER_IX_SITEID: '195628',
  BIDDER_CRITEO_ENABLED: true,
  BIDDER_CRITEO_ZONEID: '815048',
  BIDDER_RUBICON_ENABLED: true,
  BIDDER_RUBICON_ACCOUNTID: '4612',
  BIDDER_RUBICON_SITEID: '211234',
  BIDDER_RUBICON_ZONEID: '1037942',
  BIDDER_OPENX_ENABLED: true,
  BIDDER_OPENX_UNIT: '539911301',
  BIDDER_OPENX_DELDOMAIN: 'match-d.openx.net',
}

function ExampleTwo() {
  const units = defineSlots(adUnits, adUser);
  initializeGpt();
  doHeaderBidding(units, adSettings, adUser);

  return (
    <div className="App">
      test
      <Ads id='example2-a' gamUser={adUser} units={units} />
      <Ads id='example2-b' gamUser={adUser} units={units} />
    </div>
  );
}

export default ExampleTwo;
