import React from 'react';
import PropType from 'prop-types';
import { Button, Label, Popup } from 'semantic-ui-react';
import './IncrementWidget.scss';

const IncrementWidget = ({ adjust, lower, raise, val }) => {
  return (
    <div className="IncrementWidget text">
      {!!adjust && (
        <Button circular color="green" compact icon="plus" size="mini" onClick={() => raise()} />
      )}
      <span>{val}</span>
      {!!adjust && (
        <Button circular color="red" compact icon="minus" size="mini" onClick={() => lower()} />
      )}
    </div>
  );
};
IncrementWidget.defaultProps = {};
IncrementWidget.propTypes = {};
export default IncrementWidget;
