/* eslint-disable linebreak-style */
/* eslint-disable no-continue */
/* eslint-disable no-prototype-builtins */
/* eslint-disable consistent-return */
/* eslint-disable react/sort-comp */
/* eslint-disable react/destructuring-assignment */
// eslint-disable-next-line linebreak-style
/* eslint-disable react/prop-types */

import React from 'react';
import { Rate } from 'antd';
import RatedHeader from './rated-header/reated-header';
import { lengthoverview } from '../helper/helper';

export default class Rated extends React.Component {
  tabSelectionFalse = this.props.tabSelectionFalse;

  rateFilm(event, elem) {
    localStorage.setItem(elem.id, JSON.stringify([elem, event]));
  }

  colorRate = (rating) => {
    if (rating <= 3) {
      return <div className="red Rating">{rating}</div>;
    } if (rating <= 5) {
      return <div className="orange Rating">{rating}</div>;
    } if (rating <= 7) {
      return <div className="yelloy Rating">{rating}</div>;
    } if (rating > 7) {
      return <div className="green Rating">{rating}</div>;
    }
  };

  render() {
    let collectionID = [];
    let collection = [];

    for (const key in localStorage) {
      if (!localStorage.hasOwnProperty(key)) {
        continue;
      }

      collectionID = [...collectionID, key];
    }

    collectionID.forEach((item) => {
      collection = [...collection, JSON.parse(localStorage.getItem(item))];
    });

    if (localStorage.length > 0) {
      return (
        <>
          <RatedHeader tabSelectionFalse={this.tabSelectionFalse} />
          <div className="FilmBox">
            {collection.map((item) => (
              <div className="FilmCard" key={item[0].id}>
                <div className="FilmCover">
                  <img
                    src={`https://image.tmdb.org/t/p/w342${item[0].poster_path}`}
                    alt="logoFilm"
                    width="200"
                    height="300"
                  />
                </div>
                <div className="FilmDescription">
                  {this.colorRate(item[0].vote_average)}

                  <span className="FilmName">{item[0].original_title}</span>

                  <div>
                    <span>
                      {item[0].release_date}
                      {' '}
                    </span>
                  </div>

                  <span className="GenreForm"> Action </span>
                  <span className="GenreForm"> Drama </span>

                  <span className="Preview">{lengthoverview(item[0].overview)}</span>
                  <span className="RatingStar">
                    <Rate
                      count={10}
                      allowHalf
                      disabled
                      defaultValue={item[1]}
                      onChange={(event) => this.rateFilm(event, item)}
                    />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      );
    }
    return (
      <>
        <RatedHeader tabSelectionFalse={this.tabSelectionFalse} />
        <div className="Greetings">
          Тут пусто, сначала нужно оценить фильмы
        </div>
      </>
    );
  }
}
