import React from 'react'
import PropTypes from 'prop-types'

const Select = (props) => {
  const { text, options, onChange, value = "", defaultOption = "" } = props

  return (
    <div className="flex flex-col items-end mt-6">
      <div className="flex items-center">
        <label className="mr-2 text-gray-700">
          {text}
        </label>
        <select
          id="coupon"
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={onChange}
          value={value}
        >
          <option value="">{defaultOption}</option>
          {options?.map((coupon) => (
            <option key={coupon} value={coupon}>
              {coupon}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

Select.propTypes = {
  text: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  defaultOption: PropTypes.string,
};

export default Select;