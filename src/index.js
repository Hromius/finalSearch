/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
/* eslint-disable react/sort-comp */
/* eslint-disable import/order */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CardFilm from './components/card-film/card-film';
import Serwise from './components/api/api';
import ErrorMessage from './components/error-message/error-message';
import Find from './components/find/find';
import Rated from './components/rated/rated';
import 'antd/dist/antd.css';
import { Pagination } from 'antd';

export default class App extends React.Component {
  resourse = new Serwise();

  state = {
    arrFilms: [],
    load: false,
    error: false,
    rated: false,
  };

  onError = (error) => {
    // eslint-disable-next-line no-console
    console.log(error);
    this.setState({
      load: false,
      error: true,
    });
  };

  loadFilms(query, page) {
    this.resourse
      .getResourse(`/3/search/movie?api_key=86b8fa547c176caecbe22ee6aa922296&query=${query}&page=${page}`)
      .then((films) => {
        if (films.results.length === 0) {
          this.setState({
            arrFilms: false,
            totalPage: films.total_pages,
            load: false,
            error: false,
          });
        } else {
          this.setState({
            arrFilms: films.results,
            totalPage: films.total_pages,
            load: false,
            error: false,
          });
        }
      })
      .catch(this.onError);
  }

  onChanges = (event) => {
    if (event.target.value === '') {
      return this.setState({
        arrFilms: [],
        load: false,
        query: '',
        page: 1,
      });
    }
    this.setState({
      load: true,
      arrFilms: [],
      query: event.target.value,
      page: 1,
    });
    this.loadFilms(event.target.value);
  };

  findPage = (page) => {
    this.setState({ page });
    this.loadFilms(this.state.query, page);
  };

  Pagination = () => {
    if (this.state.query && this.state.arrFilms !== [] && this.state.arrFilms !== false) {
      return (
        <Pagination
          className="Pagination"
          defaultCurrent={1}
          onChange={this.findPage}
          current={this.state.page}
          total={this.state.totalPage}
        />
      );
    }
  };

  tabSelectionTrue = () => {
    this.setState({ rated: true });
  };

  tabSelectionFalse = () => {
    this.setState({ rated: false });
  };

  componentDidMount() {
    this.loadFilms('return', 1);
  }

  render() {
    const error = this.state.error ? <ErrorMessage /> : null;
    if (!this.state.rated) {
      return (
        <h1>
          <Find
            query={this.state.query}
            onChanges={this.onChanges}
            tabSelectionTrue={this.tabSelectionTrue}
          />
          <CardFilm
            films={this.state.arrFilms}
            load={this.state.load}
            error={error}
          />
          {this.Pagination()}
        </h1>
      );
    }

    if (this.state.rated) {
      return <Rated tabSelectionFalse={this.tabSelectionFalse} />;
    }
  }
}

ReactDOM.render(
  <App />,

  document.getElementById('root'),
);
