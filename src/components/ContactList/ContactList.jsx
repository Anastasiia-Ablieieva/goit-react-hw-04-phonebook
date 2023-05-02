import PropTypes from 'prop-types';
import css from './ContactList.module.css'

export const ContactList = ({ contacts, onDelete }) => {
    // console.log(contacts)
    return (
        <ul className={css.contactList}>
            {contacts.map(({ name, number, id }) => {
                return(
                    <li className={css.contactItem} 
                        key={id}> 
                        <span>{name}: {number}</span>
                        <button className={css.button} type="button" onClick={() => onDelete(id)}>Delete</button>
                    </li>
                )
            })}
        </ul>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }).isRequired
    ),
    onDelete: PropTypes.func.isRequired,
  };