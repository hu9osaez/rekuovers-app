import { observable } from 'mobx';
import { API_ENDPOINT } from '../utils';

class SongsStore {
  @observable songs = [];
  @observable isLoading = true;

  constructor() {
    this.getSongs();
  }

  getSongs() {
    let self = this;

    self.isLoading = true;

    console.log("Loading Songs"); //@TODO: Check Store

    fetch(`${API_ENDPOINT}/covers/newest`)
      .then((response) => response.json())
      .then((responseData) => {
        self.isLoading = false;
        self.songs = responseData.data;
      })
      .catch((err) => {
        if (err) {
          console.log('Make sure your device is connected to the Internet');
        }
      });
  }

  reload() {
    this.songs = [];
    this.getSongs();
  }
}

export default SongsStore;
