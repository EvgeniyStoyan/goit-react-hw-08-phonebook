import React from 'react';
import { connect } from 'react-redux';
import { contactsActions, contactsSelectors } from '../../../redux/phonebook';

import s from './Filter.module.css';

const Filter = ({ value, onChange }) => (
  <div>
    <label className={s.label_filter}>
      Find contacts by name
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={s.input_filter}
      />
    </label>
  </div>
);

const mapStateToProps = state => ({
  value: contactsSelectors.getFilter(state),
});

const mapDispatchToProps = dispatch => ({
  onChange: e => dispatch(contactsActions.changeFilter(e.target.value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
