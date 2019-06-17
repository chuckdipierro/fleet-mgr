const EnemyShip = require('../models/enemyShip');

// Display list of all Enemy Ships.
exports.enemyShip_list = (req, res) => {
  res.send('NOT IMPLEMENTED: Enemy Ship list');
};

// Display detail page for a specific Enemy Ship.
exports.enemyShip_detail = (req, res) => {
  res.send('NOT IMPLEMENTED: Enemy Ship detail: ' + req.params.id);
};

// Display Enemy Ship create form on GET.
exports.enemyShip_create_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Enemy Ship create GET');
};

// Handle Enemy Ship create on POST.
exports.enemyShip_create_post = async (req, res) => {
  var enemyShip = new EnemyShip({
    currHT: req.body.currHT,
    currSS: req.body.currSS,
    crits: [],
    defAftMod: 0,
    defForeMod: 0,
    defPortMod: 0,
    defStarboardMod: 0,
    Name: req.body.Name,
    ship: req.body.id,
    weaponsFired: req.body.weaponsFired,
  });
  console.log('EnemyShip: ', enemyShip);
  let newShip = await enemyShip.save(function(err) {
    // if (err) { return next(err); }
    if (err) console.log('Err: ', err);
    // Successful - redirect to new author record.
    // res.redirect(author.url);
  });

  console.log('Newship, ', newShip, enemyShip._id);
  res.send(enemyShip._id);
};

// Display Enemy Ship delete form on GET.
exports.enemyShip_delete_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Enemy Ship delete GET');
};

// Handle Enemy Ship delete on POST.
exports.enemyShip_delete_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Enemy Ship delete POST');
};

// Display Enemy Ship update form on GET.
exports.enemyShip_update_get = (req, res) => {
  res.send('NOT IMPLEMENTED: Enemy Ship update GET');
};

// Handle Enemy Ship update on POST.
exports.enemyShip_update_post = (req, res) => {
  res.send('NOT IMPLEMENTED: Enemy Ship update POST');
};
