var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));
app.listen(8000, function(){});

app.get('/api/users', function(req,res){
  res.sendFile(path.join(__dirname, './public/users/index.html'));
});

app.get('/api/users/:id/edit', function(req,res){
  res.sendFile(path.join(__dirname, './public/users/edit.html'));
});

app.get('/api/users/new', function(req,res){
  res.sendFile(path.join(__dirname, './public/users/new.html'));
});

app.get('/api/users/:id', function(req,res){
  res.sendFile(path.join(__dirname, './public/users/show.html'));
});

app.post('/api/users', function(req,res){
  res.sendFile(path.join(__dirname, './public/users/create.html'));
});

app.put('/api/users/:id', function(req,res){
  res.sendFile(path.join(__dirname, './public/users/update.html'));
});

app.delete('/api/users/:id', function(req,res){
  res.sendFile(path.join(__dirname, './public/users/delete.html'));
});
