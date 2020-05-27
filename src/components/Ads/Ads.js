import * as React from 'react';

const TIMEOUT = 1500;

class GAM  {
  constructor(adUnits, gamUser, gamConfig){
    this.initialized = false;
    this.gamUser = gamUser;
    this.gamConfig = gamConfig;
    this.adUnits = adUnits;
    this.gamAdUnits = [];
    this.slots = [];

    this.AdUnit = this.AdUnit.bind(this);
    this.useGptSlot = this.useGptSlot.bind(this);
  }

  init(){
    this.defineAdUnits();
    this.initializeGpt();

    this.initialized = true;
  }

  AdUnit(id){
    console.log(this.initialized);
    for(let i=0; i<this.gamAdUnits.length; i++) {
      if(this.gamAdUnits[i].id === id) {
        this.useGptSlot(
          this.gamAdUnits[i].unit,
          this.gamAdUnits[i].sizes,
          id
        );
        break;
      }
    }
    
    return (
      <div
        id={id}
        style={{ width: 'auto', height: 'auto' }}
      />
    );
  }

  defineAdUnits(){
    const adUnits = this.adUnits;

    for(let i=0; i < adUnits.length; i++){
      let obj = {
        sizes: adUnits[i].sizes,
        id: adUnits[i].id,
      };
  
      adUnits[i].units.forEach((item, index) => {
        let c = adUnits[i].units[index].constraints
  
        if(!c) {
          obj.unit =  adUnits[i].units[index].unit;
          return;
        }
        if(Object.keys(c).length === 0){
          obj.unit =  adUnits[i].units[index].unit;
          return;
        }
  
        let found = false;
        for (var p in c) {
          if (c.hasOwnProperty(p)) {
            let unitConstraint = c[p];
            if(this.gamUser.hasOwnProperty(p)){
              if(this.gamUser[p] === unitConstraint){
                found = true;
              }else {
                found = false;
              }
            }
          }
        }
  
        if(found){
          obj.unit =  adUnits[i].units[index].unit;
        }
      });

      console.log(this.gamAdUnits);
  
      this.gamAdUnits.push(obj);
    }
  }

  initializeGpt(){
    console.log('Initialize gpt');

    window.googletag = window.googletag || {};
    window.googletag.cmd = window.googletag.cmd || [];

    if(!window.googletag.apiReady){
      const script = document.createElement("script");
      script.src = "https://www.googletagservices.com/tag/js/gpt.js";
      script.async = true;
      document.body.appendChild(script);

      window.googletag.cmd.push(() => {
        window.googletag.destroySlots();
        window.googletag.pubads().enableSingleRequest();
        //window.googletag.pubads().disableInitialLoad();
        window.googletag.enableServices();
      });
    }
  }

  useGptSlot(path, size, id){
    React.useEffect(() => {
      window.googletag = window.googletag || {};
      window.googletag.cmd = window.googletag.cmd || [];
      window.googletag.cmd.push(() => {
        console.log("Defining slot for "+id);
        let definedSlot = window.googletag.defineSlot(path, size, id);

        if (this.gamConfig.ADOMIK_ENABLED) definedSlot.setTargeting('ad_group', Adomik.randomAdGroup());
        if (this.gamConfig.ADOMIK_ENABLED) definedSlot.setTargeting('ad_h', new Date().getUTCHours().toString());
        const entries = Object.entries(this.gamUser)
        for (const [key, value] of entries) {
          definedSlot.setTargeting(key, value);
        }
        definedSlot.addService(window.googletag.pubads());
        
        this.slots.push(definedSlot);   
      }); 
      window.googletag.cmd.push(() => {
        window.googletag.display(id);
      });
      return () => {
          for(let i=0;i<this.slots.length;i++){
            if(this.slots[i].getSlotId().getDomId() === id){
              let _slot = this.slots[i];
              this.slots.splice(i, 1);
              console.log('Unmounting ad slot with id '+id);
              console.log(_slot);
              window.googletag.destroySlots(_slot);
              window.googletag.destroySlots();
              window.googletag.pubads().clear();
              break;
            }
          }
        }
    }, [path, size, id]);
  }
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

export default GAM