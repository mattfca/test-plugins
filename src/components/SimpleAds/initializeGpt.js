export default () => {
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];

  if(!window.googletag.apiReady){
    const script = document.createElement("script");
    script.src = "https://www.googletagservices.com/tag/js/gpt.js";
    script.async = true;
    document.body.appendChild(script);

    window.googletag.cmd.push(() => {
      window.googletag.pubads().enableSingleRequest();
      window.googletag.pubads().disableInitialLoad();
      window.googletag.enableServices();
    
      window.googletag.pubads().addEventListener(
        'slotOnload',
       (e) => {
         console.log("slotOnLoad Event", e)
        },
      );
      window.googletag.pubads().addEventListener(
        'slotRequested',
       (e) => {
         console.log("slotRequested Event", e)
        },
      );
    });
  } else {
    //window.googletag.pubads().clear();
  }
}