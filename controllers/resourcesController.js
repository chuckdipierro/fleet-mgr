const Resources = require('../models/resources');

// Display list of all Fleet Ships.
exports.resources_get = (req, res) => {
  const getResults = async () => {
    let resources = new Promise((resolve, reject) => {
      Resources.find().exec(function(err, resource_results) {
        if (err) {
          return next(err);
        }
        resolve(resource_results[0]);
      });
    });
    let result = await resources;
    res.send(result ? result : []);
  };
  getResults();
};

// Handle Fleet Ship create on POST.
exports.resources_create = (req, res) => {
  var resources = new Resources({
    ordnance: 100,
    morale: 100,
    provisions: 100,
    repair: 100,
  });
  resources.save(function(err, result) {
    res.send(result);
  });
  res.send('NOT IMPLEMENTED: Fleet Ship create POST');
};

// Handle Fleet Ship update on POST.
exports.resources_update = (req, res) => {
  var resources = new Resources({
    _id: req.params.id,
    ordnance: req.body.ordnance,
    morale: req.body.morale,
    provisions: req.body.provisions,
    repair: req.body.repair,
  });
  Resources.findByIdAndUpdate(req.params.id, resources, {}, function(err, resources) {
    if (err) {
      return next(err);
    }
    res.send(resources);
  });
};
