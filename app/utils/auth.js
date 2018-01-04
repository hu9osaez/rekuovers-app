import RNStore from 'react-native-simple-store';

export const KEY_ACCESS_TOKEN = 'rekuovers:access_token';

export const onSignIn = token => RNStore.save(KEY_ACCESS_TOKEN, token);

export const onLogOut = () => RNStore.delete(KEY_ACCESS_TOKEN);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    RNStore
      .get(KEY_ACCESS_TOKEN)
      .then(token =>  resolve(token !== null))
      .catch(err => reject(err));
  });
};

/**
 onPressThatShit = () => {
    LoginManager
      .logInWithReadPermissions(['public_profile', 'email'])
      .then((result) => {
        if (!result.isCancelled) {
          return AccessToken.getCurrentAccessToken();
        }
      })
      .then(data => {
        let query = qs.stringify({ access_token: data.accessToken });

        fetch(`${API_ENDPOINT}/auth/facebook?${query}`)
          .then(res => res.json())
          .then((res) => {
            if(res.status_code === 422) {
              Alert.alert('Error', 'Token invalido.');
            }
            else {
              console.log(res.token);
              onLogIn(res.token)
                .then(() => alert('Logged'));
            }
          });
      })
      .catch((error) => {
        console.log(`Login fail with error: ${error}`);
      });
  };
 **/
