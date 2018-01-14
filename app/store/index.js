//import { useStrict } from 'mobx';
//useStrict(true);

import CoversStore from './covers';

const store = {
  covers: new CoversStore()
};

export default store;
