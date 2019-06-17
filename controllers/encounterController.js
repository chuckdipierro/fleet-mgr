const Encounter = require('../models/encounter');
const Socket = require('../index');
// Display list of all Enemy Ships.
exports.encounter_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Enemy Ship list');
};

exports.encounter_get_all = (req, res) => {
  const getResults = async () => {
    let encounter = new Promise((resolve, reject) => {
      Encounter.find().exec(function(err, encounter_results) {
        if (err) {
          return next(err);
        }
        resolve(encounter_results[0]);
      });
    });
    let result = await encounter;
    res.send(result ? result : []);
  };
  getResults();
};

// Handle Enemy Ship create on POST.
exports.encounter_create = (req, res) => {
  var encounter = new Encounter({ enemies: [], rebels: [], turn: 0 });
  encounter.save(function(err, result) {
    if (err) {
      res.send(err);
    }

    // Successful - redirect to new author record.
    // res.redirect(author.url);
    res.send(result);
  });
  // res.send('NOT IMPLEMENTED: Fleet Ship create POST');
};

// Handle Enemy Ship delete on POST.
exports.encounter_delete = (req, res) => {
  res.send('NOT IMPLEMENTED: Enemy Ship delete POST');
};

// Handle Enemy Ship update on POST.
exports.encounter_update = async (req, res) => {
  console.log('REq: ', req.params, req.body, 'Sample: ', { ...req.body });
  const updatedEncounter = await Encounter.updateOne(
    { _id: req.params.id },
    { ...req.body },
    function(err, affected, resp) {
      if (err) console.log('Err: ', err);
      console.log('response: ', affected.nModified, resp);
    }
  );
  console.log('Update: ', updatedEncounter.nModified);
  let fullEncounter = new Promise((resolve, reject) => {
    Encounter.find({ _id: req.params.id }).exec(function(err, encounterDeets) {
      if (err) {
        return next(err);
      }
      console.log('Deets: ', deets);
      //Successful, so render
      // list_ships.forEach(ship => {
      //   let correctedShip = ship;
      //   correctedShip = Object.assign({}, correctedShip, { ...correctedShip.ship });
      //   delete correctedShip.ship;
      //   console.log('correctedShip: ', correctedShip);
      // });
      resolve(encounterDeets);
    });
  });
  let result = await fullEncounter;
  Socket.alertSocket(result);
};
