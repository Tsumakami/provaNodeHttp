module.exports = function(app) {
    var api = app.api.request;
    app.route('/helpdesk/requests')
        .get(api.list);

    app.route('/helpdesk/requests/:id')
        .get(api.listById);

    app.route('/helpdesk/requests/request')
        .post(api.insert);

    app.route('/helpdesk/requests/requests/opened/')
        .get(api.opened);

    app.route('/helpdesk/requests/update/:id')
        .post(api.update_validation);
}
