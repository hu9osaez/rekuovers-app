import { observable } from 'mobx';
import rs from '../libs/run-series';
import { API_ENDPOINT } from '../utils';

class CoversStore {
  @observable newest = [];
  @observable popular = [];
  @observable isLoading = true;

  constructor() {
    this.loadCovers();
  }

  loadCovers() {
      let self = this;
      rs([
        function (cb) {
          self.isLoading = true;
          cb(null, true);
        },
        function (cb) {
          self.getNewestCovers();
          cb(null, true);
        },
        function (cb) {
          self.getPopularCovers();
          cb(null, true);
        }
      ],
      function (err, results) {
        self.isLoading = false;
      });
  }

  getNewestCovers() {
    let self = this;

    fetch(`${API_ENDPOINT}/covers/newest`)
      .then((res) => res.json())
      .then((covers) => {
        self.newest = covers.data;
      })
      .catch((err) => {
        if (err) {
          console.log('Make sure your device is connected to the Internet');
        }
      });
  }

  getPopularCovers() {
    let self = this;

    fetch(`${API_ENDPOINT}/covers/popular`)
      .then((res) => res.json())
      .then((covers) => {
        self.popular = covers.data;
      })
      .catch((err) => {
        if (err) {
          console.log('Make sure your device is connected to the Internet');
        }
      });
    }

  reload() {
    this.newest = [];
    this.popular = [];
    this.loadCovers();
  }
}

export default CoversStore;
