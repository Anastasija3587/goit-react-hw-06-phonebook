import React, { Component } from 'react';
import { connect } from 'react-redux';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import styles from './CreateContact.module.css';
import * as action from '../../redux/phonebook/action';
import PopUp from '../PopUp/PopUp';
import pop from '../../transitions/pop.module.css';
import PopUpFillForm from '../PopUpFillForm/PopUpFillForm';
import * as selector from '../../redux/phonebook/selector';

class CreateContact extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  };

  state = {
    name: '',
    number: '',
    toggleExist: false,
    toggleFullForm: false,
  };

  inputIds = {
    nameId: shortid.generate(),
    numberId: shortid.generate(),
    filterId: shortid.generate(),
  };

  componentDidMount() {
    try {
      const { onSubmit } = this.props;
      const persistedContacts = localStorage.getItem('contacts');
      if (persistedContacts) {
        const contacts = JSON.parse(persistedContacts);
        contacts.map(el => onSubmit(el));
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    try {
      const { contacts } = this.props;
      if (prevState.contacts !== contacts) {
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  onSubmit = e => {
    const { name, number } = this.state;
    const { contacts, onSubmit } = this.props;
    e.preventDefault();
    const createContact = {
      id: shortid.generate(),
      name,
      number,
    };
    if (
      contacts.find(contact => contact.name === name) ||
      contacts.find(contact => contact.number === number)
    ) {
      this.setState(prevState => ({ toggleExist: !prevState.toggleExist }));
      setTimeout(() => {
        this.setState(prevState => ({ toggleExist: !prevState.toggleExist }));
      }, 1000);
    } else if (
      createContact.name.trim() === '' ||
      createContact.number.trim() === ''
    ) {
      this.setState(prevState => ({
        toggleFullForm: !prevState.toggleFullForm,
      }));
      setTimeout(() => {
        this.setState(prevState => ({
          toggleFullForm: !prevState.toggleFullForm,
        }));
      }, 1000);
    } else {
      onSubmit(createContact);
    }

    this.resetForm();
  };

  render() {
    const { name, number, toggleFullForm, toggleExist } = this.state;
    return (
      <>
        <form className={styles.form} onSubmit={this.onSubmit}>
          <label className={styles.label} htmlFor={this.inputIds.nameId}>
            Name
            <input
              className={styles.input}
              name="name"
              value={name}
              onChange={this.handleChange}
              type="text"
            />
          </label>
          <label className={styles.label} htmlFor={this.inputIds.numberId}>
            Number
            <input
              placeholder="0971234567"
              className={styles.input}
              name="number"
              value={number}
              onChange={this.handleChange}
              type="number"
            />
          </label>

          <button className={styles.btnAdd} type="submit">
            Add contact
          </button>
          <CSSTransition
            in={toggleFullForm}
            timeout={250}
            unmountOnExit
            classNames={pop}
          >
            <PopUpFillForm />
          </CSSTransition>
          <CSSTransition
            in={toggleExist}
            timeout={250}
            unmountOnExit
            classNames={pop}
          >
            <PopUp />
          </CSSTransition>
        </form>
      </>
    );
  }
}

const mapStateToProps = store => ({
  contacts: selector.getContacts(store),
});

const mapDispatchToProps = dispatch => ({
  onSubmit: contact => dispatch(action.addContact(contact)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateContact);
