import React from 'react';
import Ads from '../components/Ads';
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
    id: "test1",
    units: [
      {
        unit: "/4595/nfl.test.open/hook-us",
        constraints: { country: 'us' }
      }, 
      {
        unit: "/4595/nfl.test.open/foobar",
        constraints: { country: 'uk' }
      }
    ],
    sizes: [[728, 90]],
  },
  {
    id: "test2",
    units: [
      {
        unit: "/4595/nfl.test.open/foobar2-us",
        constraints: { country: 'us' }
      }, 
      {
        unit: "/4595/nfl.test.open/foobar",
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
      { <Ads gamUser={gamUser} id='test1' units={units} /> }
    </div>
  );
}

export default AdView;
