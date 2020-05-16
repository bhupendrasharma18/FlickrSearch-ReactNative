import React, { Component } from 'react';
import { View, AsyncStorage, Dimensions } from 'react-native';
import Search from './components/SearchComponent';
import Gallery from './components/GalleryComponent';
import ColumnModifier from './components/ColumnModifier';
import axios from 'axios';

const API_KEY = '3264f8a3442962793f611977d2589e03'
const SCREEN_WIDTH = Dimensions.get('window').width;

class Flickr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flickrData: null,
      pageNo: 0,
      searchedText: "",
      columns: 2,
    };
    this.timer
  }

  componentDidMount() {
    // this.retrieveData("kitten")
    // if (this.state.name == null) {
    //   this.save("kitten", DATA)
    //   this.retrieveData("kitten")
    // }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  requestData = (text) => {
    const urlEndpoint = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&format=json&text=.${text}&nojsoncallback=true&per_page=5&extras=url_s&page=${this.state.pageNo+1}`
    
    // axios.get(urlEndpoint)
    // .then((response) => { 
    //   // console.log('requestData')
    //   this.updateStateAndSaveData(response, text)
    // }).catch((error) => { console.log(error)
    // })
    
    this.retrieveData(text.toLowerCase())
  }

  updateStateAndSaveData(response, searchedText) {
    // console.log(response);
    
    // console.log('updateStateAndSaveData')
    const page = response.data.photos.page
    const pages = response.data.photos.pages
    const total = response.data.photos.total
    const newPhotos = response.data.photos.photo //this.state.flickrData ? [...this.state.flickrData.photo, ...response.data.photos.photo] : response.data.photos.photo
    this.setState((prevState) => ({
      ...this.state,
      flickrData: {
        page,
        pages,
        total,
        photo: prevState.flickrData ? [...prevState.flickrData.photo, ...response.data.photos.photo] : response.data.photos.photo
      },
      pageNo: page,
      searchedText: searchedText,
    }))

    this.timer = setTimeout(() => { 
      this.save(this.state.searchedText.toLowerCase(), this.state.flickrData)
    }, 200);
  }

  retrieveData = async (key) => {
    try {
      const stringifiedArray = await AsyncStorage.getItem(key)
      const data = JSON.parse(stringifiedArray)
      // console.log('retrieveData');
      // console.log(data);
      if (data != null) {
        console.log(data);
        this.setState({
          ...this.state,
          flickrData: data,
          pageNo: data.page,
        })
      }
    } catch (e) {
      console.log('Failed to load.')
    }
  }

  save = async (key, data) => {
    try {
      const stringifiedArray = JSON.stringify(data)
      await AsyncStorage.setItem(key, stringifiedArray)
      console.log('Data successfully saved!');
    } catch (e) {
      console.log('Failed to save.')
    }
  }

  loadMore = () => {
    console.log('loadMore final');
    this.requestData(this.state.searchedText)
  }

  resetAndSearch = (text) => {
    this.setState({
      ...this.state,
      flickrData: null,
      pageNo: 0,
      searchedText: text
    }, this.requestData(text))
  }

  increaseColumn = () => {
    if (this.state.columns < 4) {
      this.setState((prevState) => ({
        ...prevState,
        columns: prevState.columns + 1
      }))
    }
  }

  decreaseColumn = () => {
    if (this.state.columns > 2) {
      this.setState((prevState) => ({
        ...prevState,
        columns: prevState.columns - 1
      }))  
    }
  }

  render() {
    console.log('columns');
    
    console.log(this.state.columns);
    const list = (this.state.flickrData) ? <Gallery data={this.state.flickrData.photo} columns={this.state.columns} loadMore={this.loadMore} itemWidth={SCREEN_WIDTH / this.state.columns}></Gallery> : null
    return (
      <View>
        <Search search={this.resetAndSearch}></Search>
        <ColumnModifier increament={this.increaseColumn} decreament={this.decreaseColumn} count={this.state.columns}></ColumnModifier>
        {list}
      </View>
    );
  }
}

export default Flickr;

const DATA = {"photos":{"page":1,"pages":92844,"perpage":2,"total":"185687","photo":[{"id":"49897610703","owner":"91751276@N08","secret":"5e04f05b5c","server":"65535","farm":66,"title":"wk 20...cat or kitten","ispublic":1,"isfriend":0,"isfamily":0,"url_s":"https:\/\/live.staticflickr.com\/65535\/49897610703_5e04f05b5c_m.jpg","height_s":240,"width_s":193},{"id":"49897485593","owner":"142178697@N05","secret":"ba3456f63c","server":"65535","farm":66,"title":"KuroMika 5034.jpg","ispublic":1,"isfriend":0,"isfamily":0,"url_s":"https:\/\/live.staticflickr.com\/65535\/49897485593_ba3456f63c_m.jpg","height_s":160,"width_s":240},{"id":"49897485598","owner":"142178697@N05","secret":"ba3456f63c","server":"65535","farm":66,"title":"KuroMika 5034.jpg","ispublic":1,"isfriend":0,"isfamily":0,"url_s":"https:\/\/live.staticflickr.com\/65535\/49897485593_ba3456f63c_m.jpg","height_s":160,"width_s":240},{"id":"49897610709","owner":"91751276@N08","secret":"5e04f05b5c","server":"65535","farm":66,"title":"wk 20...cat or kitten","ispublic":1,"isfriend":0,"isfamily":0,"url_s":"https:\/\/live.staticflickr.com\/65535\/49897610703_5e04f05b5c_m.jpg","height_s":240,"width_s":193}]},"stat":"ok"}