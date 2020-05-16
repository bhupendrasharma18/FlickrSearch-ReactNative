import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';

class SearchComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canSubmit: false,
      searchedText: "",
    };
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
        <Text> SearchComponent </Text>
        <View style={styles.searchContainer}>
          <TextInput style={styles.textInput} placeholder='Search on Flikcr' onChangeText={this.handleInputText}></TextInput>
          <Button title='Submit' onPress={this.makeRequestCountryDetails} disabled={!this.state.canSubmit}></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', 
    justifyContent: 'center',
    // backgroundColor: 'red',
  },
  searchContainer: {
    flexDirection: 'row',
    top: 20,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 10,
    marginRight: 10,
    paddingHorizontal: 10,
  },
});

export default SearchComponent;