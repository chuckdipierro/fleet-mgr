import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Form as Frx, Message } from 'semantic-ui-react';
import './Form.scss';

const Form = ({
  className,
  error,
  fields,
  key,
  name,
  onChange,
  onSubmit,
  type,
  updateState,
  value,
  values,
}) => {
  const [state] = useState({
    errorText: {},
    redirectToMain: false,
    submitAttempt: false,
    titleText: '',
    valueHldr: {},
  });

  const handletextentry = (evt, num) => {
    updateState({
      [evt.target.name]: num ? parseInt(evt.target.value) : evt.target.value,
    });
  };
  const handletoggle = fieldName => {
    updateState({
      [fieldName]: !values[fieldName],
    });
  };
  const formhtml = fields.map((field, i) => {
    switch (field.type) {
      case 'number':
        return (
          <Frx.Field key={i} required={field.required} className={`FrxSegment ${field.style}`}>
            <label htmlFor={field.title}>
              {field.title} <input id={field.title} hidden />
            </label>
            <Frx.Input
              className="TextInput"
              error={error[field.data] !== '' && error[field.data] !== undefined}
              name={field.data}
              onChange={e => handletextentry(e, true)}
              required={field.required}
              type="number"
              value={values[field.data]}
            />
            <Message className="ui-message" error content={error[field.data]} />
          </Frx.Field>
        );
      case 'secureText':
      case 'text':
        return (
          <Frx.Field key={i} required={field.required} className={`FrxSegment ${field.style}`}>
            <label htmlFor={field.title}>
              {field.title} <input id={field.title} hidden />
            </label>
            <Frx.Input
              className="TextInput"
              error={error[field.data] !== '' && error[field.data] !== undefined}
              name={field.data}
              onChange={e => handletextentry(e)}
              required={field.required}
              type={field.type === 'text' ? 'text' : 'password'}
              value={values[field.data]}
            />
            <Message className="ui-message" error content={error[field.data]} />
          </Frx.Field>
        );
      case 'toggle':
        return (
          <Frx.Field key={i} required={field.required} className={`FrxSegment ${field.style}`}>
            <label htmlFor={field.title}>
              {field.title}
              <input id={field.title} hidden />
            </label>
            <Frx.Checkbox
              checked={values[field.data]}
              name={field.data}
              onChange={() => handletoggle(field.data)}
              toggle
            />
          </Frx.Field>
        );
      default:
        return null;
    }
  });

  return (
    <Frx
      className={className}
      error
      fields={fields}
      key={key}
      name={name}
      onChange={onChange}
      onSubmit={onSubmit}
      type={type}
      value={value}
    >
      {formhtml}
    </Frx>
  );
};

Form.propTypes = {
  className: PropTypes.string,
  error: PropTypes.object,
  fields: PropTypes.array.isRequired,
  key: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  type: PropTypes.string,
  updateState: PropTypes.func.isRequired,
  value: PropTypes.any,
  values: PropTypes.any,
};

Form.defaultProps = {
  className: '',
  error: PropTypes.object,
  key: 0,
  name: '',
  onChange: () => {},
  onSubmit: () => {},
  type: '',
  value: '',
  values: '',
};
export default Form;
