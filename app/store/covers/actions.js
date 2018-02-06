import * as types from '../types';
import { newestCovers, popularCovers } from '@core/api';
import { runSeries } from '@core/utils/lib';

export const fetchCovers = () => async dispatch => {
  dispatch({ type: types.REQUEST_COVERS });

  runSeries(
    [
      cb => {
        newestCovers().then((response) => {

          if(response.success) {
            dispatch({ type: types.NEWEST_COVERS_SUCCESS, data: response.data });
            cb(null, null);
          }
        });
      },
      cb => {
        popularCovers().then((response) => {
          if(response.success) {
            dispatch({ type: types.POPULAR_COVERS_SUCCESS, data: response.data });
            cb(null, null);
          }
        });
      },
    ],
    (err, results) => {
      // the results array will equal ['one','two']
    }
  );
};
