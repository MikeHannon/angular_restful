module.exports = (function(app, controller, path, json){
  if (!json){
  app.get('/api/'+path, controller.index);
  app.get('/api/'+path+'/new', controller.new);
  app.get('/api/'+path+'/:id/edit', controller.edit);
  app.get('/api/'+path+'/:id', controller.show);
  app.post('/api/'+path, controller.create);
  app.put('/api/'+path+'/:id', controller.update);
  app.delete('/api/'+path+'/:id', controller.delete);
  }
  else {
    app.get('/api/json/'+path, controller.index);
    app.get('/api/json/'+path+'/new', controller.new);
    app.get('/api/json/'+path+'/:id/edit', controller.edit);
    app.get('/api/json/'+path+'/:id', controller.show);
    app.post('/api/json/'+path, controller.create);
    app.put('/api/json/'+path+'/:id', controller.update);
    app.delete('/api/json/'+path+'/:id', controller.delete);
  }
});
// 
