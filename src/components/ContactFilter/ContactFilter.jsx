import PropTypes from 'prop-types';
import css from './ContactFilter.module.css'

export const Filter = ({ value, onChange }) => {
    return (
        <label className={css.label} >
          Find contacts by name
          <input
            className={css.input} 
            onChange={onChange}
            value={value} 
            type="text"
          />
        </label>
    );
  }

  Filter.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
  };
  