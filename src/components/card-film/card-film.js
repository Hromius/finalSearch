/* eslint-disable linebreak-style */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable consistent-return */
/* eslint-disable react/sort-comp */
/* eslint-disable react/prop-types */
import React from 'react';
import './card-film.css';
import { LoadingOutlined } from '@ant-design/icons';
import { Rate } from 'antd';
import { lengthoverview, localRating } from '../helper/helper';

export default class CardFilm extends React.Component {
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
    const { films, load, error } = this.props;
    const Spinner = () => {
      if (load) {
        return <LoadingOutlined className="Spinner" spin />;
      }
    };

    if (!films) {
      return (
        <>
          <div className="Greetings">
            {Spinner()}
          </div>
          <div className="Greetings">
            К сожалению, по вашему запросу ничего не найдено.
          </div>
        </>
      );
    }
    if (films.length === 0) {
      return (
        <>
          <div className="Greetings">
            {Spinner()}
          </div>
          <div className="Greetings">
            Введите ваш запрос.
          </div>
        </>
      );
    }
    return (
      <div className="FilmBox">
        {Spinner()}
        {error}
        {films.map((item) => (
          <div className="FilmCard" key={item.id}>
            <div className="FilmCover">
              <img
                src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                alt="logoFilm"
                width="200"
                height="300"
              />
            </div>
            <div className="FilmDescription">
              <div className="Rating">{this.colorRate(item.vote_average)}</div>
              <span className="FilmName">{item.original_title}</span>

              <div>
                <span>
                  {item.release_date}
                  {' '}
                </span>
              </div>

              <span className="GenreForm"> Action </span>
              <span className="GenreForm"> Drama </span>

              <span className="Preview">{lengthoverview(item.overview)}</span>
              <span className="RatingStar">
                <Rate
                  count={10}
                  allowHalf
                  defaultValue={localRating(item)}
                  onChange={(event) => this.rateFilm(event, item)}
                />
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
