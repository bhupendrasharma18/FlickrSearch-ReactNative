import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Search from './components/SearchComponent';
import Gallery from './components/GalleryComponent';
import axios from 'axios';

const API_KEY = '3264f8a3442962793f611977d2589e03'

class Flickr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flickrData: null,
      pageNo: 0,
      searchedText: "",
    };
  }

  requestData = (text) => {
    const urlEndpoint = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&format=json&text=.${text}&nojsoncallback=true&per_page=5&extras=url_s&page=${this.state.pageNo+1}`
    axios.get(urlEndpoint)
    .then((response) => { 
      console.log(response)
      this.setState((prevState, nextProps) => ({
        ...this.state,
        flickrData: {
          page: response.data.photos.page,
          pages: response.data.photos.pages,
          total: response.data.photos.total,
          photo: prevState.flickrData ? [...prevState.flickrData.photo, ...response.data.photos.photo] : response.data.photos.photo
        },
        pageNo: response.data.photos.page,
        searchedText: text,
      }))
    }).catch((error) => { console.log(error)
    })
  }

  loadMore = () => {
    console.log('loadMore final');
    this.requestData(this.state.searchedText)
  }

  render() {
    // const list = this.state.flickrData && this.state.flickrData.photos && this.state.flickrData.photos.photo ?
    //   <Gallery data={this.state.flickrData.photos.photo} columns={1} loadMore={this.loadMore}></Gallery> : null
    const list = this.state.flickrData && this.state.flickrData.photo ?
      <Gallery data={this.state.flickrData.photo} columns={1} loadMore={this.loadMore}></Gallery> : null
    return (
      <View>
        <Text> index </Text>
        <Search search={this.requestData}></Search>
        {list}
        {/* <Gallery data={DATA.photos.photo} columns={1} loadMore={this.loadMore}></Gallery> */}
      </View>
    );
  }
}

export default Flickr;

const DATA = {"photos":{"page":1,"pages":92844,"perpage":2,"total":"185687","photo":[{"id":"49897610703","owner":"91751276@N08","secret":"5e04f05b5c","server":"65535","farm":66,"title":"wk 20...cat or kitten","ispublic":1,"isfriend":0,"isfamily":0,"url_s":"https:\/\/live.staticflickr.com\/65535\/49897610703_5e04f05b5c_m.jpg","height_s":240,"width_s":193},{"id":"49897485593","owner":"142178697@N05","secret":"ba3456f63c","server":"65535","farm":66,"title":"KuroMika 5034.jpg","ispublic":1,"isfriend":0,"isfamily":0,"url_s":"https:\/\/live.staticflickr.com\/65535\/49897485593_ba3456f63c_m.jpg","height_s":160,"width_s":240},{"id":"49897485598","owner":"142178697@N05","secret":"ba3456f63c","server":"65535","farm":66,"title":"KuroMika 5034.jpg","ispublic":1,"isfriend":0,"isfamily":0,"url_s":"https:\/\/live.staticflickr.com\/65535\/49897485593_ba3456f63c_m.jpg","height_s":160,"width_s":240},{"id":"49897610709","owner":"91751276@N08","secret":"5e04f05b5c","server":"65535","farm":66,"title":"wk 20...cat or kitten","ispublic":1,"isfriend":0,"isfamily":0,"url_s":"https:\/\/live.staticflickr.com\/65535\/49897610703_5e04f05b5c_m.jpg","height_s":240,"width_s":193}]},"stat":"ok"}