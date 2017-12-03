import { action, observable } from 'mobx';

class AuthStore {
  @observable login = '';
  @observable password = '';
  @observable isLoading = false;

  @action setLogin = (login) => {
    this.login = login;
  };

  @action setPassword = (password) => {
    this.password = password;
  };

  @action toggleLoading = () => {
    this.isLoading = !this.isLoading;
  };
}

export default AuthStore;
