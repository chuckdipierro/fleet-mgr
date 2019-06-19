const Encounter = require('../models/encounter');
const Ship = require('../models/ship');
const Socket = require('../index');
// Display list of all Enemy Ships.
exports.encounter_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Enemy Ship list');
  Encounter.find({ _id: req.params.id })
    .populate('enemies')
    .exec(function(err, data) {
      if (err) return handleError(err);

      async.forEach(
        data,
        function(item, callback) {
          Ship.populate('enemies', function(err, output) {
            if (err) throw err; // or do something

            callback();
          });
        },
        function(err) {
          res.json(data);
        }
      );
    });
};

exports.encounter_get_all = (req, res) => {
  const getResults = async () => {
    let encounter = new Promise((resolve, reject) => {
      Encounter.find()
        .populate({ path: 'enemies', populate: { path: 'ship' } })
        .populate({ path: 'rebels', populate: { path: 'ship' } })
        .exec(function(err, encounter_results) {
          if (err) {
            return next(err);
          }
          let filled_encounter = encounter_results[0];
          // filled_encounter.enemies = filled_encounter.enemies.map(ship => {
          //   let correctedShip = ship;
          //   //   // delete correctedShip.ship._id;
          //   correctedShip = Object.assign({}, correctedShip, { ...correctedShip.ship });
          //   console.log('Ship:', correctedShip);
          //   //   // delete correctedShip.ship;
          //   return correctedShip;
          // });
          resolve(filled_encounter);
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
  const updatedEncounter = await Encounter.updateOne(
    { _id: req.params.id },
    { ...req.body },
    function(err, affected, resp) {
      if (err) console.log('Err: ', err);
    }
  );
  let fullEncounter = new Promise((resolve, reject) => {
    Encounter.find({ _id: req.params.id })
      .populate({ path: 'enemies', populate: { path: 'ship' } })
      .populate({ path: 'rebels', populate: { path: 'ship' } })
      .exec(function(err, encounter_results) {
        if (err) {
          return next(err);
        }
        let filled_encounter = encounter_results[0];
        // filled_encounter.enemies = filled_encounter.enemies.map(ship => {
        //   let correctedShip = ship;
        //   //   // delete correctedShip.ship._id;
        //   correctedShip = Object.assign({}, correctedShip, { ...correctedShip.ship });
        //   console.log('Ship:', correctedShip);
        //   //   // delete correctedShip.ship;
        //   return correctedShip;
        // });
        resolve(filled_encounter);
      });
  });
  let result = await fullEncounter;
  Socket.alertSocket(result);
};
