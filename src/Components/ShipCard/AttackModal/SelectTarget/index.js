import React from 'react';
import PropType from 'prop-types';
import { Select } from 'semantic-ui-react';

import './SelectTarget.scss';

const SelectTarget = ({ setTarget, shipOptions }) => {
  return (
    <div className="SelectTarget">
      <Select
        placeholder="Choose a Target"
        options={shipOptions}
        onChange={(e, { value }) => setTarget(value)}
      />
    </div>
  );
};
SelectTarget.defaultProps = {};
SelectTarget.propTypes = {
  setTarget: PropType.func.isRequired,
  shipOptions: PropType.array.isRequired,
};
export default SelectTarget;
