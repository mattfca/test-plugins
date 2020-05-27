import React from 'react';

function Ads({gamUser, id, units}) {

  React.useEffect(() => {
    let ad = units.filter((entry) => { return entry.id === id; })[0];
    if(typeof ad !== 'undefined'){
      const path = ad.unit;
      const size = ad.sizes; 
      
      window.googletag = window.googletag || {};
      window.googletag.cmd = window.googletag.cmd || [];
      window.googletag.cmd.push(() => {
        console.log("Defining slot for ",id, path, size);

        let definedSlot = window.googletag.defineSlot(path, size, id);

        definedSlot.setTargeting('ad_group', Adomik.randomAdGroup());
        definedSlot.setTargeting('ad_h', new Date().getUTCHours().toString());
        const entries = Object.entries(gamUser);
        for (const [key, value] of entries) {
          if(definedSlot) definedSlot.setTargeting(key, value);
        }
        if(definedSlot) definedSlot.addService(window.googletag.pubads());
      }); 
      window.googletag.cmd.push(() => {
        window.googletag.display(id);
      });
      return () => {
        window.googletag.destroySlots();
        window.googletag.pubads().clear();
      }
    }
  });

  return (
    <div id={id} />
  );
}

const Adomik = {
	randomAdGroup: () => {
		const rand = Math.random();
		switch (false) {
			case !(rand < 0.09):
				return 'ad_ex' + Math.floor(100 * rand);
			case !(rand < 0.1):
				return 'ad_bc';
			default:
				return 'ad_opt';
		}
	},
};

export default Ads;
