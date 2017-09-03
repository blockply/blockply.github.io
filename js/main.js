var currentPriceElement = getFirstOrDie('price');

if(currentPriceElement){
  getPriceData(currentPriceElement.getAttribute('data-id'));
}

function getPriceData(slug) {
  var opts = {
    method: 'GET',
    headers: {}
  };

  fetch('https://api.coinmarketcap.com/v1/ticker/'+slug+'/', opts).then(function (response) {
    return response.json();
  })
  .then(function (body) {
    //doSomething with body;

    var priceChangeIcon = (body[0].percent_change_24h > 0) ? '<span class="icon-up-dir"></span>' : '<span class="icon-down-dir"></span>';

    getFirstOrDie('price-change').innerHTML = priceChangeIcon + body[0].percent_change_24h + '%';
    getFirstOrDie('price-btc').innerHTML = body[0].price_btc + ' BTC';
    // getFirstOrDie('price-usd').innerHTML = body[0].price_usd;
    getFirstOrDie('price-usd').innerHTML = '$' + parseFloat(body[0].price_usd).toFixed(2);
  });
}

function getFirstOrDie(className){
  var element = document.getElementsByClassName(className);

  if(element.length > 0){
    return element[0];
  }

  return false;
}
