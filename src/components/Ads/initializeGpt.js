export default () => {
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