
export default function helpers (){

let lengthoverview = (overview) => {
        if (overview.split(' ').length > 40) {
          let str = overview.split(' ');
          let newString = ' ';
          for (let i = 0; i < 40; i++) {
            newString += ' ' + str[i];
          }
          return newString + ' ...';
        } else return overview;
      };



}

