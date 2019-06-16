import React from 'react';
import PropType from 'prop-types';
import { Card /* Icon, */, Image, Button } from 'semantic-ui-react';
import AttackModal from './AttackModal';
import RepairModal from './RepairModal';
import './ShipCard.scss';
import DefenseModal from './DefenseModal';

const ShipCard = ({
  acted = false,
  applyDamage,
  captain,
  Class,
  crits,
  currHT,
  currSS,
  defAft,
  defAftMod,
  defFore,
  defForeMod,
  defPort,
  defPortMod,
  defStarboard,
  defStarboardMod,
  destroyed,
  HT,
  hullType,
  image,
  Name,
  repairDamage,
  repairPoints,
  sensorRange,
  ship,
  shipsComplement,
  Speed,
  SS,
  status,
  targets,
  turn,
  updateDefense,
}) => {
  return (
    <Card
      color={status}
      className={`${status} ShipCard ${applyDamage && acted ? 'acted' : ''}  ${
        currHT === 0 || currSS === 0 ? 'knockedOut' : ''
      } ${destroyed ? 'destroyed' : ''}`}
    >
      {!destroyed && (
        <Button.Group floated="right">
          {targets.length > 0 && currHT > 0 && currSS > 0 && (
            <AttackModal applyDamage={applyDamage} ship={ship} targets={targets} turn={turn} />
          )}
          <RepairModal
            crits={crits}
            currHT={currHT}
            currSS={currSS}
            HT={HT}
            repair={repairPoints || -1}
            repairCost={targets.length === 0}
            repairDamage={(ht, ss, crits, cost) => repairDamage(ship, ht, ss, crits, cost)}
            SS={SS}
          />
          <DefenseModal
            {...{
              defAft,
              defAftMod,
              defFore,
              defForeMod,
              defPort,
              defPortMod,
              defStarboard,
              defStarboardMod,
            }}
            updateDefense={(aft, fore, port, starboard) =>
              updateDefense(ship, aft, fore, port, starboard)
            }
          />
        </Button.Group>
      )}
      <div className="ShipImage" style={{ backgroundImage: `url(/img/${image})` }} />
      {/* <Image src={`/img/${image}`} height="200" /> */}
      <Card.Description className="CritTracker">
        {crits.map((crit, i) => {
          return (
            <span key={i} className="swDice red">
              y
            </span>
          );
        })}
      </Card.Description>
      <Card.Content>
        <Card.Header>{Name}</Card.Header>
        <Card.Meta>
          <span className="date">
            {Class} Class {hullType}
          </span>
        </Card.Meta>
        <Card.Description>
          <p>
            <b>
              Hull Trauma: {currHT}/{HT}
            </b>
          </p>
          <p>
            <b>
              System Strain: {currSS}/{SS}
            </b>
          </p>
          <p>{captain ? <b>{captain}</b> : <b>Crew: {shipsComplement}</b>}</p>
          <p>
            <b>Sensor Range: </b>
            {sensorRange}
            <b> Speed:</b> {Speed}
          </p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        {/* <Icon name="user" /> */}
        {hullType}
      </Card.Content>
    </Card>
  );
};
ShipCard.defaultProps = {
  ship: {},
  targets: [],
};
ShipCard.propTypes = {
  Class: PropType.string.isRequired,
  currHT: PropType.number.isRequired,
  HT: PropType.number.isRequired,
  hullType: PropType.string.isRequired,
  Name: PropType.string.isRequired,
  ship: PropType.object,
  shipsComplement: PropType.string.isRequired,
  SS: PropType.number.isRequired,
  status: PropType.string.isRequired,
  targets: PropType.array,
};
export default ShipCard;
