import React from "react";
import Ads from '../../components/SimpleAds';
import defineSlots from '../../components/SimpleAds/defineSlots';
import initializeGpt from '../../components/SimpleAds/initializeGpt';
import adUnits from './adUnits';

const gamUser = {
  country: 'us',
  gender: 'm',
  age: 55
};

function Example() {
  const units = defineSlots(adUnits, gamUser);
  initializeGpt();

  return (
    <div className="App">
      test
      <Ads id='test1' gamUser={gamUser} units={units} />
      <Ads id='test2' gamUser={gamUser} units={units} />
    </div>
  );
}

export default Example;
