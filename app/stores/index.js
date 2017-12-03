//import { useStrict } from 'mobx';
//useStrict(true);

import AuthStore from './auth';
import SongsStore from './songsStore';

const store = {
  auth: new AuthStore(),
  songs: new SongsStore()
};

export default store;
