module.exports = function(app){
  app.delete('/composicao_familiar/composicao_familiar/:id', (req, res) => {
    let id = req.params.id;
    let connection = app.persistencia.connectionFactory();
    let composicaoFamiliarDAO = new app.persistencia.ComposicaoFamiliarDAO(connection);
    composicaoFamiliarDAO.delete(id, (error, result) => {
      if (error) {
        connection.end();
        res.status(404).json(error);
      } else {
        connection.end();
        res.status(204).json(result);
      }
    });
  });
}