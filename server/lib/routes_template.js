module.exports = (function(app, controller, path, json){
  if (!json){
  app.get('/api/'+path, controller.index);
  app.get('/api/'+path+'/new', controller.new);
  app.get('/api/'+path+'/:id/edit', controller.edit);
  app.get('/api/'+path+'/:id', controller.show);
  app.post('/api/'+path+'', controller.create);
  app.put('/api/'+path+'/:id', controller.update);
  app.delete('/api/'+path+'/:id', controller.delete);
  }
  else {
    app.get('/api/'+path + '/json', controller.indexjson);
    app.get('/api/'+path+'/new/json', controller.newjson);
    app.get('/api/'+path+'/:id/edit/json', controller.editjson);
    app.get('/api/'+path+'/:id/json', controller.showjson);
    app.post('/api/'+path+'/json', controller.createjson);
    app.put('/api/'+path+'/:id/json', controller.updatejson);
    app.delete('/api/'+path+'/:id/json', controller.deletejson);
  }
});
