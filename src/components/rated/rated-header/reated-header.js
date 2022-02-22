/* eslint-disable linebreak-style */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-unused-class-component-methods */
import React from 'react';
import './reated-header.css';

export default class RatedHeader extends React.Component {
  // eslint-disable-next-line react/prop-types
  onChanges = this.props.onChanges;

  tabSelectionFalse = this.props.tabSelectionFalse;

  clearLocalStorage = () => {
    localStorage.clear();
  };

  render() {
    return (
      <header>
        <div className="Greetings">Будь как дома, путник!</div>
        <div className="Page-mode ">
          <span className="Search-top" onClick={this.tabSelectionFalse}>
            Поиск
          </span>
          <span className="Collection-top">Коллекция</span>
        </div>

        <button
          className="localStorage"
          onClick={this.clearLocalStorage}
        >
          очистить localStorage
        </button>

      </header>
    );
  }
}
