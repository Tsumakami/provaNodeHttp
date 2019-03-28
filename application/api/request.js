var mongoose = require('mongoose');

var model = mongoose.model('Request');
var api = {
    list: function(req, res) {
        model.find()
            .then(function(helpdesk_requests) {
                res.json(helpdesk_requests);
            }, function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    },
    listById: function(req, res) {
        model.findById(req.params.id)
            .then(function(helpdesk_request) {
                res.json(helpdesk_request);
            }, function(error) {
                console.log(error);
                res.status(500).json(error);
            });
    },
    insert: function(req, res) {
      console.log(req.body);
      let request = new model(req.body);
      request.save()
        .then((request) => {
          res.json(request);
        }, function(error){
          console.log("Não foi possivel inserir o chamado");
          res.status(500).json(error);
        }
      );
    },
    opened: function(req, res){
      model.find({status: 'OPENED'}).sort({priority: -1})
        .then((request) => {
          res.json(request);
        }, function(error){
          console.log("Não foi possivel mostra os chamados em aberto");
          res.status(500).json(error);
        }
      );
    },

    update_validation:function(req, res){
      model.findById(req.params.id)
          .then(function(helpdesk_request) {
              if(req.body.status == "CLOSED"){
                if(req.body.closed.by == helpdesk_request.opened_by){
                  req.body.updated_at = new Date();
                  console.log(req.body.updated_at);
                  model.updateOne(helpdesk_request, req.body).then(
                    (request_update) => {
                      console.log(helpdesk_request);
                      res.json(request_update);
                    }, function(error){
                      console.log("Não foi possivel alterar o chamado, pois não foi a mesma pessoa que abriu");
                      res.status(500).json(error);
                    })
                }
              }else{
                model.updateOne(helpdesk_request, req.body).then(
                    (request_update) => {
                    req.body.updated_at = new Date();
                    console.log(req.body.updated_at);
                    res.json(request_update);
                  }, function(error){
                    console.log("Não foi possivel alterar o chamado");
                    res.status(500).json(error);
                  }
                )
             }
        })
    }

}

module.exports = api;
