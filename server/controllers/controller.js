module.exports = function(app) {
    var Contact = app.models.contact;
    var DbController = {
        post: function(req, res) {
            var model = new Contact(req.body.lead);

            model.save(function(err) {
                if (err) {
                    res.status(500);
                    res.send('Houston we have a problem.');
                }

                res.status(200)
                res.send('Contato cadastrado com sucesso.');
            });
        }
    }
    return DbController;
}
