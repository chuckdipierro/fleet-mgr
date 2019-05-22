import React from 'react';
import PropType from 'prop-types';
import { Card /* Icon, */, Image, Button } from 'semantic-ui-react';
import AttackModal from './AttackModal';
import RepairModal from './RepairModal';
import './ShipCard.scss';

const ShipCard = ({
  acted = false,
  applyDamage,
  Class,
  crits,
  curr_HT,
  curr_SS,
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
}) => {
  console.log('Crits: ', crits);
  return (
    <div className={`ShipCard ${acted ? 'acted' : ''}  ${curr_HT === 0 ? 'knockedOut' : ''}`}>
      <Card color={status} className={`${status}`}>
        {targets.length > 0 && !acted && (
          <Button.Group floated="right">
            <AttackModal applyDamage={applyDamage} ship={ship} targets={targets} />
            <RepairModal repairDamage={repairDamage} ship={ship} />
          </Button.Group>
        )}
        <Image src={`/img/${image}`} />
        {crits.map((crit, i) => {
          return (
            <span key={i} className="swDice red">
              y
            </span>
          );
        })}
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
    </div>
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
