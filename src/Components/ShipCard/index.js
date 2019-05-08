import React from 'react';
import PropType from 'prop-types';
import { Card /* Icon, */, Image, Button } from 'semantic-ui-react';
import AttackModal from './AttackModal';
import './ShipCard.scss';

const ShipCard = ({
  Class,
  HT,
  hullType,
  image,
  Name,
  ship,
  shipsComplement,
  SS,
  status,
  targets,
}) => {
  return (
    <div className="ShipCard">
      <Card color={status} className={status}>
        {targets.length > 0 && (
          <Button.Group floated="right">
            <AttackModal ship={ship} targets={targets} />
          </Button.Group>
        )}
        <Image src={`/img/${image}`} />
        <Card.Content>
          <Card.Header>{Name}</Card.Header>
          <Card.Meta>
            <span className="date">
              {Class} Class {hullType}
            </span>
          </Card.Meta>
          <Card.Description>
            <p>
              <b>Hull Trauma: {HT}</b>
            </p>
            <p>
              <b>System Strain: {SS}</b>
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
