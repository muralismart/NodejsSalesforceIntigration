var express = require('express');
var router = express.Router();
var request = require('request');
var jsforce=require('jsforce');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/app', function(req, res, next) {
  var data = req.query;
  var dataS = JSON.stringify(data);
  var req_opts = {
    url: '*server ip address*',
    method: req.method, //in capital letters
        // headers: {
        //     'Content-Type': 'application/json',
        //     'Cookie': cookie
        // },
  }
      
      //req.params.name;
      //req.params.password;
      //res.redirect('https://agriculture-dev-ed.my.salesforce.com/?username='+req.params[0]+'&password='+req.params[1]);
	//res.redirect('https://agriculture-dev-ed.my.salesforce.com');

  /*var cb = function (error, response, body) {
    var bodyRes = JSON.parse(body);
    //res.render('userInfo', bodyRes);
    response.redirect('https://agriculture-dev-ed.my.salesforce.com');
  }

  request(req_opts, cb);*/
});
module.exports = router;
