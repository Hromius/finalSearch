/* eslint-disable linebreak-style */
export function lengthoverview(overview) {
  if (overview.split(' ').length > 40) {
    const str = overview.split(' ');
    let newString = ' ';
    for (let i = 0; i < 40; i++) {
      newString += ` ${str[i]}`;
    }
    return `${newString} ...`;
  } return overview;
}

export function localRating(item) {
  const rate = JSON.parse(localStorage.getItem(item.id));
  if (rate === null) return 0;
  return rate[1];
}
