var Hyga = require('../');

var config = {
  uuid:'3e9fd243-2d75-42a4-89b9-a4e70a51b58d',
  token:'31b5ee84aff6e4fb2db70d1d2fe43f6e58e7ec6d'
}

var hyga = new Hyga(config);

hyga.onBrd(function(data){
  console.log(data);
});

hyga.connect(function(){

  console.log('已接入超星系!');

  hyga.subBrd();

});