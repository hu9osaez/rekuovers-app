import React from 'react';
import { View } from 'react-native';
import YouTube from 'react-native-youtube';

class CoverDetailsScreen extends React.Component {
    state = {
        playerHeight: 219
    };

    playerOnReady = (e) => {
        setTimeout(() => this.setState({ playerHeight: 220 }), 300);
    };

    render() {
        const { song } = this.props.navigation.state.params;
        let { playerHeight } = this.state;

        return (
            <View>
                <YouTube
                    apiKey   = {'AIzaSyDEGxujgp4qSdZt4R7XZEr6KPPt4D8QxEY'}
                    ref      = {item => this.player = item}
                    videoId  = {song.youtube_id}
                    controls = {1}
                    onReady  = {this.playerOnReady}
                    style    = {{ alignSelf: 'stretch', height: playerHeight }}
                />
            </View>
        );
    }
}

CoverDetailsScreen.navigationOptions = {
    header: null
    //title: ({state}) => `${state.params.song.originalSong}'s Details`
};

export { CoverDetailsScreen };
