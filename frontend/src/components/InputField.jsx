import React from 'react';
import '../styles/components/InputField.scss';

function InputField({
  name, type, textarea, rows, required, label, value, handleChange,
}) {
  return (
    <div className="field-group">
      {textarea ? (
        <textarea
          placeholder=" "
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          required={required}
          className="field"
          rows={rows}
        />
      ) : (
        <input
          type={type}
          placeholder=" "
          name={name}
          id={name}
          value={value}
          onChange={handleChange}
          required={required}
          className="field"
        />

      )}
      <label htmlFor="firstName" className="input-label">{label}</label>
    </div>
  );
}

export default InputField;
