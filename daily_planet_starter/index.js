var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/static'));

var articles = [
  {title: 'Bernie! Bernie!', body: '#feelthebern'},
  {title: 'Trump for change!', body: 'Make America Great Again'},
  {title: 'Brian Hague founds the Daily Planet', body: 'Wow! Amazing! Such good news!'}
];

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/articles', function(req, res) {
  res.render('articles/index', {articles: articles});
});

app.get('/articles/new', function(req, res) {
  res.render('articles/new');
});

app.get('/articles/:idx', function(req, res) {
  var idx = parseInt(req.params.idx);
  if (idx < articles.length && idx >= 0) {
    res.render('articles/show', {article: articles[req.params.idx]});
  } else {
    res.send('Error');
  }
});

app.post('/articles', function(req, res) {
  articles.push(req.body);
  res.redirect('/articles');
});

app.get('/about', function(req, res) {
  res.render('about');
});

// UPDATE
app.get("/articles/:id/edit", function(req, res) {
  console.log(req.params.id);
  var article = articles[req.params.id]; // {title: 'Bernie! Bernie!', body: '#feelthebern'}
  article.id = req.params.id; // {id:0, title: 'Bernie! Bernie!', body: '#feelthebern'}
  res.render("articles/edit", {article: article});
});

app.put("/articles/:id", function(req, res) {
  console.log("putting");
  article[req.params.id] = req.body;

  res.send(req.body);
});

// DELETE
app.delete("/articles/:id", function(req, res) {
  var articles_before_delete = articles;
  articles_before_delete[req.params.id] = undefined;
  articles = articles_before_delete;

  res.send({message: 'success'});
});

app.listen(3000, function() {
  console.log("You're listening to the smooth sounds of port 3000 in the morning");
});
