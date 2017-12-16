import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { colorsFromUrl } from 'react-native-dominant-color';

const styles = StyleSheet.create({
    container: {
        height: 200,
        width: 360
    }
});

class FeaturedCover extends React.Component {
    constructor() {
        super();
        this.state = {
            bgColor: '#cccccc'
        };
    }

    componentWillMount() {
        const { cover } = this.props;

        colorsFromUrl(`https://img.youtube.com/vi/${cover.youtube_id}/mqdefault.jpg`, (err, colors) => {
            this.setState({ bgColor: colors.averageColor });
        });
    }

    render() {
        let { bgColor } = this.state;
        return (
            <View style={[styles.container, { backgroundColor: bgColor }]}>
                <Text>1</Text>
            </View>
        );
    }
}

export default FeaturedCover;