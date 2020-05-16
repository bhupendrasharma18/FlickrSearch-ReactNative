import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Button, Text, TouchableHighlight } from 'react-native';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      searchedText: "",
    };
  }

  actionSubmit = () => {
    this.props.search(this.state.searchedText)
  }

  handleInputText = (text) => {
    const enableButton = (text) ? true : false
    this.setState({
      canSubmit: enableButton,
      searchedText: text,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput style={styles.textInput} placeholder='Search on Flikcr' onChangeText={this.handleInputText}></TextInput>
          <TouchableHighlight style ={styles.button} underlayColor="white" onPress={this.actionSubmit} disabled={!this.state.canSubmit}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Done</Text>
          </View>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  searchContainer: {
    flexDirection: 'row',
    top: 5,
    marginLeft: 2,
    marginRight: 2,
    height: 40,
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'black',
    marginRight: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 30,
    backgroundColor: 'white',
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 7,
  },
  button: {
    width: 50,
    alignItems: 'center',
    height: 30,
    marginRight: 10,
    backgroundColor: 'black',
  },
  buttonText: {
    textAlign: 'center',
    paddingVertical: 2,
    color: 'white',
    fontSize: 20,
  },
});

export default SearchComponent;
