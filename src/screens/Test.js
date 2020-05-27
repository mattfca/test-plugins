import React from 'react';
import GAM from 'react-gam';

const gamConfig = {
  DEBUG: true,
  ADOMIK_ENABLED: true,
  A9_ENABLED: false,
  A9_PUBID: '3121',
  PBJS_ENABLED: false,
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
};

const gamUser = {
  country: 'us',
  gender: 'm',
  age: 55
};

const adUnits = [
  {
    id: "test1",
    units: [
      {
        unit: "/4595/nfl.test.open/test",
        constraints: { country: 'us' }
      }, 
      {
        unit: "/4595/nfl.test.open/test",
        constraints: { country: 'uk' }
      }
    ],
    sizes: [[320, 50],[728, 90]],
    _refresh: true
  },
];



function Test() {
  const Gam = new GAM();
  Gam.init(adUnits, gamConfig, gamUser);

  // React.useEffect(() => {
  //   return () => {
  //     Gam.unMount();
  //   }
  // });

  return (
    <div className="App">
      <Gam.RenderAdUnit id="test1" />
       <a onClick={Gam.refreshBid}>Refresh</a>
    </div>
  );
}

export default Test;
