import AxiosFetcher from './AxiosFetch';

class Service {
  static getCategories(callback) {
    return new Promise((res, rej) => {
      AxiosFetcher({
        method: 'GET',
        url: 'products/categories/',
      })
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }
}

export default Service;
