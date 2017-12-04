import React from 'react';
import {
    StyleSheet,
    View
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
    Text,
    Icon,
    Slider
} from 'react-native-elements';
import YouTube from 'react-native-youtube';
import { PRIMARY_COLOR, SECONDAY_COLOR } from '../../utils';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    youtubePlayer: {
        alignSelf: 'stretch',
        height: 250,
        backgroundColor: '#000'
    },
    contentContainer: {
        backgroundColor: '#fff'
    }
});

class SongScreen extends React.Component {
    state = {
        isReady: false,
        isPlaying: false,
        state: null
    };

    onReady = (e) => {
        this.setState({ isReady: true });
    };

    changeState = (e) => {
        let self = this;

        this.setState({ status: e.state });

        if (e.state === 'playing') {
            this.setState({ isPlaying: true })
        }
        else if (e.state === 'stopped' || e.state === 'paused' || e.state === 'ended') {
            setTimeout(function() {
                self.setState({ isPlaying: false });
            }, 200);
        }
    };

    togglePlay = () => {
        let self = this;

        setTimeout(function() {
            self.setState(s => ({ isPlaying: !s.isPlaying }));
        }, 100);
    };

    render() {
        const { song } = this.props.navigation.state.params;
        let { isReady, isPlaying } = this.state;

        return (
            <View style={styles.container}>
                <YouTube
                    apiKey={'AIzaSyDEGxujgp4qSdZt4R7XZEr6KPPt4D8QxEY'}
                    videoId={song.youtube_id}
                    play={isPlaying}
                    controls={1}
                    onReady={this.onReady}
                    onChangeState={this.changeState}

                    style={styles.youtubePlayer}
                />
                <Grid containerStyle={styles.contentContainer}>
                    <Row>
                        <Text>{this.state.status}</Text>
                    </Row>
                    <Row>
                        <Text>{isPlaying ? 'Reproduciendo' : 'No reproduciendo'}</Text>
                    </Row>
                    <Row>
                        <Text>---</Text>
                    </Row>
                    <Row>
                        <Text>---</Text>
                    </Row>
                    <Row>
                        <Col size={25} style={{ justifyContent: 'center', paddingLeft: 5 }}>
                            <Icon
                                name={isPlaying ? 'pause' : 'play-arrow'}
                                size={48}
                                color={isReady ? PRIMARY_COLOR : SECONDAY_COLOR}
                                onPress={this.togglePlay}
                                disabled={!isReady}
                            />
                        </Col>
                        <Col size={75} style={{flex: 1, alignItems: 'stretch', justifyContent: 'center', paddingRight: 20, paddingLeft: 10}}>
                            <Slider />
                        </Col>
                    </Row>
                </Grid>
            </View>
        );
    }
}

SongScreen.navigationOptions = {
    header: null
    //title: ({state}) => `${state.params.song.originalSong}'s Details`
};

export { SongScreen };
