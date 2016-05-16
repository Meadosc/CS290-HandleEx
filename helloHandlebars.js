var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
  //Setting up post parser
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3001);

//Get request portion of the code**********************************************************
app.get('/',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList1 = qParams;
  context.reqType = 'GET';
  res.render('home', context);
});
//*****************************************************************************************

//Post request portion of the code*********************************************************

  //The post app call
app.post('/', function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList1 = qParams;
  
  var bParams = [];
  for (var b in req.body){
    bParams.push({'name':b,'value':req.body[b]})
  }
  console.log(bParams);
  console.log(req.body);
  context.reqType = 'POST';
  context.dataList2 = bParams;
  res.render('home', context);
});


//*****************************************************************************************

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
