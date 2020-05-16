import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Search from './components/SearchComponent';
import Gallery from './components/GalleryComponent';

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
        <Gallery data={DATA}></Gallery>
      </View>
    );
  }
}

export default Flickr;

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba1',
      title: '4',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f633',
      title: '5',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d724',
      title: '6',
    },
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba5',
      title: '7',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f637',
      title: '8',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d792',
      title: '9',
    },
];