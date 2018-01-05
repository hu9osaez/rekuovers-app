//import { useStrict } from 'mobx';
//useStrict(true);

import AuthStore from './auth';
import CoversStore from './covers';

const store = {
  auth: new AuthStore(),
  covers: new CoversStore()
};

export default store;
