import {observable, action} from 'mobx';
import {TimeHelper} from '../shared/utils/helper/timeHelper';
import LogManager from '../shared/utils/logging/LogManager';

export class UserStore {
  // Authentication
  @observable userLoginInfo = {
    email: '',
    password: '',
  };
  @observable userInfo = undefined;
  @observable userKey = undefined;
  @observable userId = undefined;
  @observable userRegisterBeing = {};
  @observable categories = {};
  @observable cart = [];

  @action.bound
  setCategories = (categories) => {
    this.categories = categories;
  };

  @action.bound
  addProductToCart = (item) => {
    this.cart = [...this.cart, item];
    console.log(JSON.stringify(this.cart));
  };
  
  @action.bound
  removeProductToCart = (item) => {
    this.cart = this.cart.filter(a => a != item);
    console.log(JSON.stringify(this.cart));
  };
}
