module.exports = function (app) {
  app.get('/health', function (req, res, next) {
    return res.send(200);
  });
}