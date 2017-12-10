import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import YouTube from 'react-native-youtube';

import { PRIMARY_COLOR, SECONDARY_COLOR } from '../../utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    playerControls: {
        flexDirection: 'row',
        height: 45
    },
    playContainer: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    sliderContainer: {
        flex: 8,
        flexDirection: 'column',
        backgroundColor: 'blue',
        justifyContent: 'center',
    }
});

class CoverDetailsScreen extends React.Component {
    state = {
        firstPlay: false,
        isPlaying: false,
        isReady: false
    };

    playerOnReady = (e) => {
        this.setState({ isReady: true });
    };

    togglePlay = () => {
        let self = this;

        setTimeout(function() {
            self.setState(s => ({ isPlaying: !s.isPlaying }));
        }, 100);
    };

    render() {
        const { song } = this.props.navigation.state.params;
        let { isPlaying, isReady } = this.state;

        return (
            <View style={styles.container}>
                <YouTube
                    apiKey   = {'AIzaSyDEGxujgp4qSdZt4R7XZEr6KPPt4D8QxEY'}
                    ref      = {item => this.player = item}
                    videoId  = {song.youtube_id}
                    play     = {isPlaying}
                    controls = {0}
                    onReady  = {this.playerOnReady}
                    style    = {{ alignSelf: 'stretch', height: 220 }}
                />
                <View style={styles.playerControls}>
                    <View style={styles.playContainer}>
                        <Icon
                            name={isPlaying ? 'pause' : 'play-arrow'}
                            size={40}
                            color={isReady ? PRIMARY_COLOR : SECONDARY_COLOR}
                            onPress={this.togglePlay}
                            disabled={!isReady}
                        />
                    </View>
                    <View style={styles.sliderContainer}>
                        <Text>Time slider</Text>
                    </View>
                </View>
            </View>
        );
    }
}

CoverDetailsScreen.navigationOptions = {
    header: null
    //title: ({state}) => `${state.params.song.originalSong}'s Details`
};

export { CoverDetailsScreen };
