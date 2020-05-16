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
        <Gallery data={DATA.photos.photo} columns={2}></Gallery>
      </View>
    );
  }
}

export default Flickr;

const DATA = {"photos":{"page":1,"pages":92844,"perpage":2,"total":"185687","photo":[{"id":"49897610703","owner":"91751276@N08","secret":"5e04f05b5c","server":"65535","farm":66,"title":"wk 20...cat or kitten","ispublic":1,"isfriend":0,"isfamily":0,"url_s":"https:\/\/live.staticflickr.com\/65535\/49897610703_5e04f05b5c_m.jpg","height_s":240,"width_s":193},{"id":"49897485593","owner":"142178697@N05","secret":"ba3456f63c","server":"65535","farm":66,"title":"KuroMika 5034.jpg","ispublic":1,"isfriend":0,"isfamily":0,"url_s":"https:\/\/live.staticflickr.com\/65535\/49897485593_ba3456f63c_m.jpg","height_s":160,"width_s":240},{"id":"49897485598","owner":"142178697@N05","secret":"ba3456f63c","server":"65535","farm":66,"title":"KuroMika 5034.jpg","ispublic":1,"isfriend":0,"isfamily":0,"url_s":"https:\/\/live.staticflickr.com\/65535\/49897485593_ba3456f63c_m.jpg","height_s":160,"width_s":240},{"id":"49897610709","owner":"91751276@N08","secret":"5e04f05b5c","server":"65535","farm":66,"title":"wk 20...cat or kitten","ispublic":1,"isfriend":0,"isfamily":0,"url_s":"https:\/\/live.staticflickr.com\/65535\/49897610703_5e04f05b5c_m.jpg","height_s":240,"width_s":193}]},"stat":"ok"}