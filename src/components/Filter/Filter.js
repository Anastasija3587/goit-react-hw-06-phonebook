import React from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import pop from '../../transitions/slide.module.css';
import styles from './Filter.module.css';
import * as action from '../../redux/phonebook/action';
import * as selector from '../../redux/phonebook/selector';

const Filter = ({ contacts, value, saveFilter }) => {
  const inputIds = {
    filterId: shortid.generate(),
  };

  return (
    <CSSTransition
      in={contacts.length > 1}
      timeout={250}
      classNames={pop}
      unmountOnExit
    >
      <label htmlFor={inputIds.filterId}>
        filter contacts by name
        <input
          className={styles.input}
          id={inputIds.filterId}
          value={value}
          name="filter"
          type="text"
          onChange={e => saveFilter(e.target.value)}
        />
      </label>
    </CSSTransition>
  );
};

Filter.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  saveFilter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const mapStateToProps = store => ({
  contacts: selector.getContacts(store),
  value: selector.getFilter(store),
});

const mapDispatchToProps = dispatch => ({
  saveFilter: filter => dispatch(action.saveFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
