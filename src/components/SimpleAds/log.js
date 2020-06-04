export default (...names) => {
  let styles = [
      'background-color: black'
    , 'font-family: "courier new"'
    , 'color: green'
    , 'display: block'
    , 'padding: 5px'
    , 'text-align: left'
    , 'font-weight: bold'
  ].join(';');
  
  for (let i=0; i<names.length; i++) console.log('%c'+names[i]+" "+ new Date().getTime(), styles);
}