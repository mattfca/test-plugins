import React from 'react';
import Ads from '../components/SimpleAds';
import defineSlots from '../components/SimpleAds/defineSlots';
import initializeGpt from '../components/SimpleAds/initializeGpt';

const gamConfig = {
  DEBUG: true,
  ADOMIK_ENABLED: true,
};

const gamUser = {
  country: 'us',
  gender: 'm',
  age: 55
};

const adUnits = [
  {
    id: "hook2",
    units: [
      {
        unit: "/4595/nfl.test.open/hook2a",
        constraints: { country: 'us' }
      }, 
      {
        unit: "/4595/nfl.test.open/hook2",
        constraints: { country: 'uk' }
      }
    ],
    sizes: [[728, 90]],
  },
];

function AdView() {
  const units = defineSlots(adUnits, gamUser);
  initializeGpt();

  React.useEffect(() => {
    
  });

  return (
    <div className="App">
      test
      { <Ads gamUser={gamUser} id='hook2' units={units} /> }
      { <Ads gamUser={gamUser} id='hook2b' units={units} /> }
    </div>
  );
}

export default AdView;
