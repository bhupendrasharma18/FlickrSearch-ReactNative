import React, { Component } from 'react';
import { View, AsyncStorage, Dimensions } from 'react-native';
import Search from './components/SearchComponent';
import Gallery from './components/GalleryComponent';
import ColumnModifier from './components/ColumnModifier';
import axios from 'axios';
import NetInfo from "@react-native-community/netinfo";

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
      isInternetReachable: true,
      isLoading: false,
    };
    this.timer
    this.unsubscribe
  }

  componentDidMount() {
    NetInfo.fetch().then(state => {
      this.updateReachableState(state.isInternetReachable)
    });

    // Subscribe
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.updateReachableState(state.isInternetReachable)
    });
  }

  updateReachableState = isReachable => {
    if (isReachable !== this.state.isInternetReachable) {
      this.setState({
        ...this.state,
        isInternetReachable: isReachable,
      })
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
    // Unsubscribe
    this.unsubscribe();
  }

  // requestData - makes call to Flickr API
  requestData = (text) => {
    if (this.state.isInternetReachable && !this.state.isLoading) {
      this.setState({
        ...this.state,
        isLoading: true,
      })
      const urlEndpoint = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${API_KEY}&format=json&text=.${text}&nojsoncallback=true&per_page=20&extras=url_s&page=${this.state.pageNo+1}`
      axios.get(urlEndpoint)
      .then((response) => { 
        this.updateStateAndSaveData(response, text)
      })
      .catch((error) => { console.log(error)
      })
    }
    else {
      if (this.state.flickrData == null) {
        this.retrieveData(text.toLowerCase())
      }
    }    
  }

  // Updates current state and modifies datasource, also stores data for offline request
  updateStateAndSaveData(response, searchedText) {
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
      isLoading: false,
    }))

    this.timer = setTimeout(() => { 
      this.saveData(this.state.searchedText.toLowerCase(), this.state.flickrData)
    }, 200);
  }

  // retrieveData - retrieve search response data from AsyncStorage, if internet isn't reachable
  // key is the searched text
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

  // saveData - Save search response data to AsyncStorage, so can be used in offline mode
  saveData = async (key, data) => {
    try {
      const stringifiedArray = JSON.stringify(data)
      await AsyncStorage.setItem(key, stringifiedArray)
    } catch (e) {
      console.log('Failed to save.')
    }
  }

  // loadMorePhotos - will request data for subsequent pages when scrolling
  loadMorePhotos = () => {
    this.requestData(this.state.searchedText)
  }

  // resetAndSearch - will reset current state and makes new request 
  resetAndSearch = (text) => {
    if (text !== this.state.searchedText) {
      this.setState({
        ...this.state,
        flickrData: null,
        pageNo: 0,
        searchedText: text
      }, this.requestData(text))  
    }
  }

  // increaseColumn - increases number of columns for grid up to 4
  increaseColumn = () => {
    if (this.state.columns < 4) {
      this.setState((prevState) => ({
        ...prevState,
        columns: prevState.columns + 1
      }))
    }
  }

  // decreaseColumn - decreases number of columns for grid up to 2
  decreaseColumn = () => {
    if (this.state.columns > 2) {
      this.setState((prevState) => ({
        ...prevState,
        columns: prevState.columns - 1
      }))  
    }
  }

  render() {
    const itemslist = (this.state.flickrData && this.state.flickrData.photo) ? <Gallery data={this.state.flickrData.photo} columns={this.state.columns} loadMorePhotos={this.loadMorePhotos} itemWidth={SCREEN_WIDTH / this.state.columns}></Gallery> : null
    return (
      <View>
        <Search search={this.resetAndSearch}></Search>
        <ColumnModifier increament={this.increaseColumn} decreament={this.decreaseColumn} count={this.state.columns}></ColumnModifier>
        {itemslist}
      </View>
    );
  }
}

export default Flickr;
