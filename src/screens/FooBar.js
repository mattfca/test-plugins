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
    id: "test1",
    units: [
      {
        unit: "/4595/nfl.test.open/foobar-us",
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

function Ads() {
  const ads = new A(adUnits, gamUser, gamConfig);

  React.useEffect(() => {
    ads.init()
  });

  return (
    <div className="App">
      ads
      { ads.AdUnit("test1") }
      { ads.AdUnit("test2") }
    </div>
  );
}

export default Ads;
