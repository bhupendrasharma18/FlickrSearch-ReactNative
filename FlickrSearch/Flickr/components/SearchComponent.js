import React, { Component } from 'react';
import { View, StyleSheet, TextInput, Button, TouchableHighlight } from 'react-native';

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
          {/* <Button style={styles.button} title='Submit' onPress={this.actionSubmit} disabled={!this.state.canSubmit}></Button> */}
          <TouchableHighlight style ={styles.button}>
            <Button title='Submit' onPress={this.actionSubmit} disabled={!this.state.canSubmit}></Button> 
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
  },
  searchContainer: {
    flexDirection: 'row',
    top: 5,
    marginLeft: 2,
    marginRight: 2,
    height: 40,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: 'black',
    marginRight: 5,
    paddingHorizontal: 10,
  },
  button: {
    width: 100,
  }
});

export default SearchComponent;
