module.exports = function(app) {
    var Contact = app.models.contact;
    var DbController = {
        post: function(req, res) {
            var model = new Contact(req.body);

            model.save(function(err) {
                if (err) {
                    if (err.code === 11000) {
                        res.status(400);
                        res.send('E-mail já cadastrado.');
                        return;
                    }

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
