/* eslint-disable linebreak-style */
/* eslint-disable no-return-await */
/* eslint-disable no-underscore-dangle */
class Serwise {
  _baseApi = 'https://api.themoviedb.org';

  async getResourse(url) {
    const res = await fetch(`${this._baseApi}${url}`);

    if (!res.ok) {
      throw new Error(`ошибка ${res.status}`);
    }

    return await res.json();
  }
}

export default Serwise;
