import React from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

const DIMENSION = 44

const ColumnModifier = (props) => (
    <View style={styles.container}>
        <TouchableHighlight onPress={props.decreament} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </View>
        </TouchableHighlight>
        <Text style={styles.text}> COLUMNS : {props.count} </Text>
        <TouchableHighlight onPress={props.increament} underlayColor="white">
          <View style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </View>
        </TouchableHighlight>
    </View>
);

const styles = StyleSheet.create({
    container: {
        alignItems: 'center', 
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: 5,
        height: 44,
    },
    button: {
      width: DIMENSION,
      height: DIMENSION,
      alignItems: 'center',
      backgroundColor: 'black',
      borderRadius: DIMENSION / 2,
    },
    buttonText: {
      textAlign: 'center',
      paddingVertical: 2,
      color: 'white',
      fontSize: 30,
    },
    text: {
        alignSelf: 'center',
        justifyContent: 'center',
        fontSize: 20,
    }
});

export default ColumnModifier;
