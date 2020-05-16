import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Search from './components/SearchComponent';

class Flickr extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> index </Text>
        <Search></Search>
      </View>
    );
  }
}

export default Flickr;
