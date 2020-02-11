import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import styles from './Contact.module.css';
import Contact from './Contact';
import slide from '../../transitions/slide.module.css';
import * as selector from '../../redux/phonebook/selector';

const Contacts = ({ contacts }) => {
  return (
    <>
      <TransitionGroup component="ul">
        {contacts.map(contact => (
          <CSSTransition
            key={contact.id}
            unmountOnExit
            classNames={slide}
            timeout={250}
          >
            <li className={styles.item}>
              <Contact contact={contact} />
            </li>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </>
  );
};

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = store => ({
  contacts: selector.filteredContacts(store),
});

export default connect(mapStateToProps)(Contacts);
