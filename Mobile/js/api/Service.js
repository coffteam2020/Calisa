import AxiosFetcher from './AxiosFetch';

class Service {
  static getCategories(callback) {
    return new Promise((res, rej) => {
      AxiosFetcher({
        method: 'GET',
        url: 'mobile/home/?customerGroupId=1',
      })
        .then((data) => {
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }
  static getBanner(callback) {
    return new Promise((res, rej) => {
      AxiosFetcher({
        method: 'GET',
        customBaseUrl: 'http://calisa.ispa.io/api/v1/news/banner/',
        url: '',
        hasBaseURL: true,
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
