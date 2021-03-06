const Encounter = require('../models/encounter');
const EnemyShip = require('../models/enemyShip');
const FleetShip = require('../models/fleetShip');
const Ship = require('../models/ship');
const Socket = require('../../index');
// Display list of all Enemy Ships.
exports.encounter_get = async (req, res) => {
  let fullEncounter = new Promise((resolve, reject) => {
    Encounter.find({ _id: req.params.id })
      .populate({ path: 'enemies', populate: { path: 'ship' } })
      .populate({ path: 'rebels', populate: { path: 'ship' } })
      .exec(function(err, data) {
        if (err) resolve({ deleted: true });
        resolve(data ? data[0] : {});
      });
  });

  let result = await fullEncounter;
  Socket.alertSocket(result);
  res.send(result);
};

exports.encounter_get_all = (req, res) => {
  const getResults = async () => {
    let encounter = new Promise((resolve, reject) => {
      Encounter.find().exec(function(err, encounter_results) {
        if (err) {
          return next(err);
        }
        // let filled_encounter = encounter_results[0];
        // filled_encounter.enemies = filled_encounter.enemies.map(ship => {
        //   let correctedShip = ship;
        //   //   // delete correctedShip.ship._id;
        //   correctedShip = Object.assign({}, correctedShip, { ...correctedShip.ship });
        //   console.log('Ship:', correctedShip);
        //   //   // delete correctedShip.ship;
        //   return correctedShip;
        // });
        resolve(encounter_results);
      });
    });
    let result = await encounter;
    res.send(result ? result : []);
  };
  getResults();
};
exports.encounter_clear = async (req, res) => {
  let fullEncounter = new Promise((resolve, reject) => {
    Encounter.find({ _id: req.params.id }).exec(function(err, encounter_results) {
      if (err) {
        return next(err);
      }
      let filled_encounter = encounter_results[0];
      filled_encounter.rebels.forEach(rebel => {
        FleetShip.updateOne({ _id: rebel }, { acted: false, weaponsFired: [] }, function(
          err,
          affected,
          resp
        ) {
          if (err) console.log('Err: ', err);
        });
      });
      filled_encounter.enemies.forEach(enemy => {
        EnemyShip.deleteOne({ _id: enemy }, function(err, affected, resp) {
          if (err) console.log('Err: ', err);
        });
      });

      Encounter.deleteOne({ _id: req.params.id }, function(err, affected, resp) {
        if (err) console.log('Err: ', err);
      });
      resolve(filled_encounter);
    });
  });
  console.log('Res: ', res.status);
  Socket.alertSocket({ deleted: true });
  res.send(true);
};
exports.encounter_clearRound = async (req, res) => {
  let fullEncounter = new Promise((resolve, reject) => {
    Encounter.find({ _id: req.params.id })
      .populate({ path: 'enemies', populate: { path: 'ship' } })
      .populate({ path: 'rebels', populate: { path: 'ship' } })
      .exec(function(err, encounter_results) {
        if (err) {
          return next(err);
        }
        let filled_encounter = encounter_results[0];
        filled_encounter.rebels.forEach(rebel => {
          FleetShip.updateOne({ _id: rebel._id }, { acted: false }, function(err, affected, resp) {
            if (err) console.log('Err: ', err);
          });
        });
        filled_encounter.enemies.forEach(enemy => {
          EnemyShip.updateOne({ _id: enemy._id }, { acted: false }, function(err, affected, resp) {
            if (err) console.log('Err: ', err);
          });
        });
        resolve(filled_encounter);
      });
  });
  let result = await fullEncounter;
  Socket.alertSocket(result);
  res.send(true);
};
// Handle Enemy Ship create on POST.
exports.encounter_create = (req, res) => {
  console.log('Req: ', req);
  var encounter = new Encounter({ enemies: [], rebels: [], title: req.body.title, turn: 0 });
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
  const updatedEncounter = await Encounter.updateOne(
    { _id: req.params.id },
    { ...req.body },

    { writeConcern: { w: 2, j: true, wtimeout: 5000 } },
    function(err, affected, resp) {
      if (err) console.log('Err: ', err);
    }
  );

  let fullEncounter = new Promise((resolve, reject) => {
    Encounter.find({ _id: req.params.id })
      .populate({ path: 'enemies', populate: { path: 'ship' } })
      .populate({ path: 'rebels', populate: { path: 'ship' } })
      .exec(function(err, data) {
        if (err) resolve({ deleted: true });
        resolve(data[0]);
      });
  });

  let result = await fullEncounter;
  Socket.alertSocket(result);
  res.send(true);
};
