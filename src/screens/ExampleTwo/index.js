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

function ExampleTwo() {
  const units = defineSlots(adUnits, gamUser);
  initializeGpt();

  return (
    <div className="App">
      test
      <Ads id='example2-a' gamUser={gamUser} units={units} />
      <Ads id='example2-b' gamUser={gamUser} units={units} />
    </div>
  );
}

export default ExampleTwo;
