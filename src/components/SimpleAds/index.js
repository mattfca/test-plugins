import React, {useState} from 'react';

function Ads({gamUser, id, units}) {
  let slot;

  React.useEffect(() => {
    if(slot) {
      console.log("ads stored slot: ", slot.getSlotId().getDomId());
    }

    let ad = units.filter((entry) => { return entry.id === id; })[0];

    if(typeof ad !== 'undefined'){
      const path = ad.unit;
      const size = ad.sizes; 
      console.log('ads slot to be define', ad)
      
      window.googletag = window.googletag || {};
      window.googletag.cmd = window.googletag.cmd || [];
      window.googletag.cmd.push(() => {
        console.log("ads slot to be defined ",id, path, size);

        let definedSlot;

        let found = false;
        const slotArr = window.googletag.pubads().getSlots();
        for(let i=0; i< slotArr.length; i++){
          if(slotArr[i].getSlotId().getDomId() == id) {
            definedSlot = slotArr[i];
            found = true;
            break;
          }
        }

        if(!found) definedSlot = window.googletag.defineSlot(path, size, id);
        
        console.log('ads definedSlot:', definedSlot)
        console.log("ads defined id:", definedSlot.getSlotId().getId())

        if(!found) {
          definedSlot.setTargeting('ad_group', Adomik.randomAdGroup());
          definedSlot.setTargeting('ad_h', new Date().getUTCHours().toString());

          const entries = Object.entries(gamUser);
          
          for (const [key, value] of entries) {
            definedSlot.setTargeting(key, value);
          }
          
          definedSlot.addService(window.googletag.pubads());

          console.log('ads displaying id ', id)
          window.googletag.display(id);
          window.googletag.pubads().refresh([definedSlot]);
        }else {
          window.googletag.pubads().refresh([definedSlot]);
        }
        slot = definedSlot; 
      });
    }
    return () => {
      const slotArr = window.googletag.pubads().getSlots();
      for(let i=0; i< slotArr.length; i++){
        if(slotArr[i].getSlotId().getDomId() == id) {
          console.log('ads destroying:', slotArr[i].getSlotId().getDomId())
          console.log(window.googletag.destroySlots([slotArr[i]]));
          console.log('clear=====');
          //console.log(window.googletag.pubads().clear([slotArr[i]]));
          break;
        }
      }

      // if(slot) {
      //   console.log('ads destroying:', slot.getSlotId().getDomId())
      //   window.googletag.destroySlots(slot);
      //   window.googletag.pubads().clear();
      // }
    }
  }, [id, units, gamUser]);

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
