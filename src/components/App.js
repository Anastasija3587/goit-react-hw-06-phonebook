import React from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import PropTypes from 'prop-types';
import CreateContact from './CreateContact/CreateContact';
import Contacts from './Contacts/Contacts';
import Filter from './Filter/Filter';
import './App.css';
import * as selector from '../redux/phonebook/selector';

const App = ({ contacts }) => {
  return (
    <>
      <CSSTransition in timeout={500} appear classNames="title">
        <h1 className="title">Phonebook</h1>
      </CSSTransition>
      <CreateContact />
      <h2 className="title">Contacts</h2>
      <Filter />
      {contacts.length > 0 && <Contacts />}
    </>
  );
};

App.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = store => ({
  contacts: selector.getContacts(store),
});

export default connect(mapStateToProps)(App);
