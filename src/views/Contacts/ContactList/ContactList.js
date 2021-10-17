import React from 'react';
import { connect } from 'react-redux';
import {
  contactsOperations,
  contactsSelectors,
} from '../../../redux/phonebook';

import s from './ContactList.module.css';

const ContactList = ({ contacts, onDeleteContact, loading }) => {
  return (
    <div>
      <ul className={s.contacts_list}>
        {contacts.map(({ id, name, number }) => (
          <li className={s.item} key={id}>
            <p className={s.contact_text}>
              {name}: {number}
            </p>
            <button type="button" onClick={() => onDeleteContact(id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      {loading && <h2>Loading...</h2>}
    </div>
  );
};

const mapStateToProps = state => ({
  contacts: contactsSelectors.getVisibleContacts(state),
  loading: contactsSelectors.getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  onDeleteContact: id => dispatch(contactsOperations.deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
