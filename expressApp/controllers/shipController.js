const Ship = require('../models/ship');

// Display list of all Ships.
exports.ship_list = (req, res) => {
  const getResults = async () => {
    let promiseShipList = new Promise((resolve, reject) => {
      Ship.find({}).exec(function(err, list_ships) {
        if (err) {
          return next(err);
        }
        //Successful, so render
        resolve({ shipList: list_ships });
      });
    });
    let result = await promiseShipList;
    res.send(result);
  };
  getResults();
};

// Display detail page for a specific Ship.
exports.ship_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: Ship detail: ' + req.params.id);
};

// Display Ship create form on GET.
exports.ship_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Ship create GET');
};

// Handle Ship create on POST.
exports.ship_create_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Ship create POST');
};

// Display Ship delete form on GET.
exports.ship_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Ship delete GET');
};

// Handle Ship delete on POST.
exports.ship_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Ship delete POST');
};

// Display Ship update form on GET.
exports.ship_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Ship update GET');
};

// Handle Ship update on POST.
exports.ship_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Ship update POST');
};
