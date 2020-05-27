export default (adUnits, gamUser) => {
  let gamAdUnits = [];

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
          if(gamUser.hasOwnProperty(p)){
            if(gamUser[p] === unitConstraint){
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

    gamAdUnits.push(obj);
  }

  return gamAdUnits
}