import React from 'react';
import A from '../components/Ads/Ads';

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
    id: "test5",
    units: [
      {
        unit: "/4595/nfl.test.open/bar-us",
        constraints: { country: 'us' }
      }, 
      {
        unit: "/4595/nfl.test.open/bar",
        constraints: { country: 'uk' }
      }
    ],
    sizes: [[728, 90]],
  },
  {
    id: "test6",
    units: [
      {
        unit: "/4595/nfl.test.open/bar-us",
        constraints: { country: 'us' }
      }, 
      {
        unit: "/4595/nfl.test.open/bar",
        constraints: { country: 'uk' }
      }
    ],
    sizes: [[728, 90]],
  },
];

function Ads() {
  const ads = new A(adUnits, gamUser, gamConfig);

  React.useEffect(() => {
    ads.init();
  });

  return (
    <div className="App">
      ads
      { ads.AdUnit("test5") }
      { ads.AdUnit("test6") }
    </div>
  );
}

export default Ads;
