var express = require('express');
var request = require('request');
var router = express.Router();
var jsforce=require('jsforce');
var dotenv = require('dotenv').config('/config/ConfigOAuth.env');

var conn = new jsforce.Connection({
  oauth2 : {
      loginUrl : 'https://agriculture-dev-ed.my.salesforce.com',//process.env.LOGINURL,
      clientId : '3MVG9Y6d_Btp4xp7Y0Ey5p47FNFeSryjslrLdEZm0.C1xQzxQlZ_hI7qZVOKqqAUiZSTYgwG6Ar23m_bHmNPE',//process.env.CLIENTID,
      clientSecret : '7506196926188510534',//process.env.CLIENTSECRET,
      redirectUri : 'localhost'//process.env.REDIRECTURI
    }
});
// var username = configs.USERNAME;//'murali@bellpoll.com';//process.env.USERNAME;
// var password = configs.PASSWORD;//'farmer*528*';//process.env.;
var records = [];
// callback style query


router.get('/userInfo', function(req, res, next) {
  var configs= req.app.locals.config;
var username = configs.USERNAME;//'murali@bellpoll.com';//process.env.USERNAME;
var password = configs.PASSWORD;//'farmer*528*';//process.env.;
conn.login(username, password, function(err, userInfo) {
       // console.log(req.app.locals.config);

  if (err) { res.send(err);return; }
  console.log(conn.accessToken);
  console.log(conn.instanceUrl);
  console.log("User ID: " + userInfo.id);
  console.log("Org ID: " + userInfo.organizationId);

    conn.query("SELECT Id, Name,FullName__c,gender__c,(SELECT Id,Name FROM Crops__r) crps FROM Farmer__c", function(err, result) {
    if (err) { return console.error(err); }
    console.log("total : " + result.totalSize);
    console.log("fetched : " + result.records.length);
    console.log("done ? : " + result.done);



    records=result;
    if (!result.done) {
      // you can use the locator to fetch next records set.
      // Connection#queryMore()
      console.log("next records URL : " + result.nextRecordsUrl);
    }
    // res.send(records);
    res.render('userInfo',records);
      // res.send('yes');
  });
});
  //res.send('respond with a resource.........'+username+';;;;;;;;;;;;;;;;;;;;;;'+records.totalSize+'********'+JSON.stringify(records.records[1].Name));
//res.send(resul);
});



module.exports = router;