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
  Class,
  crits,
  curr_HT,
  curr_SS,
  defAft,
  defFore,
  defPort,
  defStarboard,
  destroyed,
  HT,
  hullType,
  image,
  Name,
  repairDamage,
  ship,
  shipsComplement,
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
        curr_HT === 0 || curr_SS === 0 ? 'knockedOut' : ''
      } ${destroyed ? 'destroyed' : ''}`}
    >
      {!destroyed && (
        <Button.Group floated="right">
          {targets.length > 0 && curr_HT > 0 && curr_SS > 0 && (
            <AttackModal applyDamage={applyDamage} ship={ship} targets={targets} turn={turn} />
          )}
          <RepairModal
            repairDamage={(ht, ss, crits) => repairDamage(ship, ht, ss, crits)}
            crits={crits}
          />
          <DefenseModal
            {...{ defAft, defFore, defPort, defStarboard }}
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
              Hull Trauma: {curr_HT}/{HT}
            </b>
          </p>
          <p>
            <b>
              System Strain: {curr_SS}/{SS}
            </b>
          </p>
          <p>
            <b>Crew: {shipsComplement}</b>
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
  curr_HT: PropType.number.isRequired,
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
