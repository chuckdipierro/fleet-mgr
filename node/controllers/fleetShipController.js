const FleetShip = require('../models/fleetShip');

// Display list of all Fleet Ships.
exports.fleetShip_list = (req, res) => {
  const getResults = async () => {
    let promiseShipList = new Promise((resolve, reject) => {
      FleetShip.find()
        .populate('ship')
        .exec(function(err, list_ships) {
          if (err) {
            return console.log(err);
          }
          //Successful, so render
          // list_ships.forEach(ship => {
          //   let correctedShip = ship;
          //   correctedShip = Object.assign({}, correctedShip, { ...correctedShip.ship });
          //   delete correctedShip.ship;
          //   console.log('correctedShip: ', correctedShip);
          // });
          resolve(list_ships);
        });
    });
    let result = await promiseShipList;
    res.send(result);
  };
  getResults();
};

// Display detail page for a specific Fleet Ship.
exports.fleetShip_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: Fleet Ship detail: ' + req.params.id);
};

// Display Fleet Ship create form on GET.
exports.fleetShip_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Fleet Ship create GET');
};

// Handle Fleet Ship create on POST.
exports.fleetShip_create_post = (req, res) => {
  var fleetShip = new FleetShip({
    currHT: req.body.currHT,
    currSS: req.body.currSS,
    crits: [],
    defAftMod: 0,
    defForeMod: 0,
    defPortMod: 0,
    defStarboardMod: 0,
    Name: req.body.Name,
    captain: req.body.captain,
    ship: req.body.id,
    weaponsFired: {},
  });
  fleetShip.save(function(err) {
    // if (err) { return next(err); }
    // Successful - redirect to new author record.
    // res.redirect(author.url);
  });
  res.send('NOT IMPLEMENTED: Fleet Ship create POST');
};

// Display Fleet Ship delete form on GET.
exports.fleetShip_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Fleet Ship delete GET');
};

// Handle Fleet Ship delete on POST.
exports.fleetShip_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Fleet Ship delete POST');
};

// Display Fleet Ship update form on GET.
exports.fleetShip_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Fleet Ship update GET');
};

// Handle Fleet Ship update on POST.
exports.fleetShip_update_post = (req, res) => {
  var fleetShip = new FleetShip({
    acted: req.body.acted,
    currHT: req.body.currHT,
    currSS: req.body.currSS,
    crits: req.body.crits,
    defAftMod: req.body.defAftMod,
    defForeMod: req.body.defForeMod,
    defPortMod: req.body.defPortMod,
    defStarboardMod: req.body.defStarboardMod,
    _id: req.params.id,
    Name: req.body.Name,
    captain: req.body.captain,
    ship: req.body.id,
    weaponsFired: req.body.weaponsFired,
  });
  FleetShip.findByIdAndUpdate(req.params.id, fleetShip, {}, function(err, fleetShip) {
    if (err) {
      console.log('Error: ', err);
    }
    res.send('Complete');
    // Successful - redirect to book detail page.
    //  res.redirect(thebook.url);
  });
  // res.send('NOT IMPLEMENTED: Fleet Ship update POST');
};
