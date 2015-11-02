module.exports = (function(app, controller){
  app.get('/api/users', controller.index);
  app.get('/api/users/new', controller.new);
  app.get('/api/users/:id/edit', controller.edit);
  app.get('/api/users/:id', controller.show);
  app.post('/api/users', controller.create);
  app.put('/api/users/:id', controller.update);
  app.delete('/api/users/:id', controller.delete);
});
