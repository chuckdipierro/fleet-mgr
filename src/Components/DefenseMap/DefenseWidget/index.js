import React from 'react';
import PropType from 'prop-types';
import { Button, Label, Popup } from 'semantic-ui-react';
import './DefenseWidget.scss';

const DefenseWidget = ({ center, lowerShield, raiseShield, val }) => {
  return (
    <div className="DefenseWidget text">
      {center > 0 && (
        <Button
          circular
          color="green"
          compact
          icon="plus"
          size="mini"
          onClick={() => raiseShield()}
        />
      )}
      <span>{val}</span>
      {center !== undefined && val > 0 && (
        <Button
          circular
          color="red"
          compact
          icon="minus"
          size="mini"
          onClick={() => lowerShield()}
        />
      )}
    </div>
  );
};
DefenseWidget.defaultProps = {};
DefenseWidget.propTypes = {};
export default DefenseWidget;
