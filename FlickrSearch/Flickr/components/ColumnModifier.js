import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const componentName = (props) => (
    <View style={styles.container}>
        <Button title='-' onPress={props.decreament}></Button>
        <Text>Number of columns: {props.count} </Text>
        <Button title='+' onPress={props.increament}></Button>
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 10,
    }
});

export default componentName;
