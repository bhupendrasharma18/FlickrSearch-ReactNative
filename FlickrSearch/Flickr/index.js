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
    const newPhotos = response.data.photos.photo
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
      this.saveData(this.state.searchedText.toLowerCase(), this.state.flickrData)
    }, 200);
  }

  retrieveData = async (key) => {
    try {
      const stringifiedArray = await AsyncStorage.getItem(key)
      const data = JSON.parse(stringifiedArray)
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

  saveData = async (key, data) => {
    try {
      const stringifiedArray = JSON.stringify(data)
      await AsyncStorage.setItem(key, stringifiedArray)
    } catch (e) {
      console.log('Failed to save.')
    }
  }

  loadMorePhotos = () => {
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
    const list = (this.state.flickrData) ? <Gallery data={this.state.flickrData.photo} columns={this.state.columns} loadMorePhotos={this.loadMorePhotos} itemWidth={SCREEN_WIDTH / this.state.columns}></Gallery> : null
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
