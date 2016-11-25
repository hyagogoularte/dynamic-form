module.exports = function(app) {
    var sendMsg = app.controllers.controller;
    app.route('/contact').post(sendMsg.post);
}
