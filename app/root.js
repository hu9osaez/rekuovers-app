import React from 'react';
import { Provider } from 'mobx-react/native';

import { createRootNavigator } from './router';
import { isSignedIn } from 'utils';

import store from 'store';

console.disableYellowBox = true;

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            signedIn: false,
            checkedSignIn: false
        };
    }

    componentWillMount() {
        isSignedIn()
            .then(res => this.setState({ signedIn: res, checkedSignIn: true }))
            .catch(err => alert(err));
    }

    render() {
        const { checkedSignIn, signedIn } = this.state;

        // If we haven't checked AsyncStorage yet, don't render anything (better ways to do this)
        if (!checkedSignIn) {
            return null;
        }

        const Router = createRootNavigator(signedIn);

        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
};
