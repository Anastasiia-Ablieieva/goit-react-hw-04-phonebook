import { Formik, Field, Form, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import { nanoid } from "nanoid";
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const ContactSchema = Yup.object().shape(
    {
        name: Yup.string()
        .matches(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
            'Name may contain only letters, apostrophe, dash and spaces').required('Required!'),
        number: Yup.string()
        .matches(/\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
            'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +').required('Required!'),
    }
);

export const ContactForm = ({ onAddContact }) => {
    return (
    <Formik
        initialValues={{name: '', number: ''}}
        validationSchema={ContactSchema}
        onSubmit={(values, { resetForm }) => {
            onAddContact({ id: nanoid(), ...values });
            resetForm();
          }}>
        <Form className={css.formFild}>
        <label className={css.lable}>
            Name
            <Field className={css.field} name="name" type="text"/>
            <ErrorMessage style={{color: '#0c30b1', fontSize: 15, width: 400}} name="name" component="span"/>
        </label>
        <label className={css.lable}>
            Number
            <Field className={css.field} name="number" type="tel"/>
            <ErrorMessage style={{color: '#0c30b1', fontSize: 15, width: 400}} name="number" component="span"/>
        </label>
        <button className={css.button} type="submit">Add contact</button>
      </Form>
    </Formik>
    )
}

ContactForm.propType = {
    onSubmit: PropTypes.func.isRequired,
  };