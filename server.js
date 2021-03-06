var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool =require('pg').Pool;
var config={
    user: 'sunitacool41',
    database: '	sunitacool41',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));

var articles={
 'articleone':{
    title:'Article-one|| Sunita Sen',
    date:'february 20,2018',
    heading:'Article-one',
    content:  `
      <p>
        this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.
     </p>
     <p>
         this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.
    </p>
     <p>
     this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.this is the content of my first article.
      </p> `

},
 'articletwo':{
     title:'Article-two|| Sunita Sen',
    date:'february 20,2018',
    heading:'Article-two',
    content:  `
      <p>
       hello there
      </p> `
 },
 'articlethree':{
     title:'Article-three|| Sunita Sen',
    date:'february 20,2018',
    heading:'Article-three',
    content:  `
      <p>
        third line
        <p>`
     
},
};

function createTemplate(data){
 var title = data.title;
 var date = data.date;
 var content = data.content;
 var heading=data.heading;
  var htmltemplate= 
     `<html>
    <head>
      <title>
        ${title}
      </title>
      <meta name="viewport" content="width-device-width, initial-scale=1" />
      <link href="/ui/style.css" rel="stylesheet" />
    </head>
 <body>
  <div class="container">
       <div>
          <a href="/">home</a>
     </div>
      <hr/>
      <h3>
         ${heading}
      </h3>
      <div>
          ${date}
      </div>
      <div>
        ${content}
     </div>
   </div>   
 </body>
</html>
    `;
    return htmltemplate;
}

app.get('/', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var Pool =new Pool(config);
app.get('/text-db',function(req,res){
    pool.query('select * from test',function(err,result){
       if(err){
           res.status(500).send(err.toString());
       } 
       else{
           res.send(JSON.stringify(result));
       }
    });
});

app.get('/proj', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui', 'proj.html'));
});

app.get('/blog', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui', 'blog.html'));
});

app.get('/farewell', function (req, res) {
 res.sendFile(path.join(__dirname, 'ui', 'farewell.html'));
});

var counter=0;
app.get('/counter', function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

app.get('/:articlename',function(req,res) {
    var articlename=req.params.articlename;
    res.send(createTemplate(articles[articlename]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
