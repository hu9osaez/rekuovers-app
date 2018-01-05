import React from 'react';
import { Text, StyleSheet, View } from 'react-native';



class SurpriseMe extends React.Component {

    componentWillMount() {
        // Fetch
    }

    render() {
        return (
            <View style={[styles.container, { backgroundColor: bgColor }]}>
                <Text>1</Text>
            </View>
        );
    }
}

export default SurpriseMe;