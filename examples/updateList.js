var Hyga = require('../');

var config = {
  uuid:'9c417707-420d-4ff1-95b5-dfe9171d5cba',
  token:'52435eb0d78a761e1909793a6fdb15d4bf90570a'
}

var hyga = new Hyga(config);

hyga.connect(function(response){

  console.log('ready');

  var data = {
    api:'push',
    listName: 'discoverWhitelist',
    list: 'demo-added-uuid'
  };

  hyga.updateList(data,function(success, resp){
    if(success){
      console.log('设置成功!');
    }else{
      console.log('设置失败!');
      console.log(resp);
    }
    process.exit();
  });

});