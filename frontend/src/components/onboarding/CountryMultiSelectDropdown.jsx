import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const CountryMultiSelectDropdown = ({ countries, selectedCountries, setSelectedCountries }) => {
  const countryOptions = countries.map((c) => ({ label: c.countryName, value: c.countryCode }));

  const handleMultiChange = (option) => {
    setSelectedCountries(option);
  };

  return (
    <div>
      <Select
        options={countryOptions}
        placeholder=""
        components={animatedComponents}
        value={selectedCountries}
        onChange={(option) => handleMultiChange(option)}
        isMulti
        closeMenuOnSelect={false}
      />
    </div>
  );
};

export default CountryMultiSelectDropdown;
