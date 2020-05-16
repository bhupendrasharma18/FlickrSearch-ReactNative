import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width
const PRODUCT_ITEM_MARGIN = 0

function Item({ imgUrl, itemWidth }) {
  return (
    <View style={[styles.item, {width: itemWidth, height: itemWidth}]}>
      {imgUrl ? <Image style={[styles.image, {width: itemWidth-5, height: itemWidth-5}]} source={{uri: imgUrl}} /> : null }
    </View>
  );
}

const itemWidth = column => {
  return ((SCREEN_WIDTH - PRODUCT_ITEM_MARGIN) / column) - PRODUCT_ITEM_MARGIN
}

class GalleryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemWidth: itemWidth(this.props.columns)
    };
  }

  loadMore = () => {
    console.log('loadMore in Galllery');
    this.props.loadMore()
  }

  render() {
    console.log(this.props.data);
    
    return (
      <View>
        <View style={styles.container}>
          <FlatList
            data={this.props.data}
            numColumns={this.props.columns}
            renderItem={({ item }) => <Item title={item.title} imgUrl={item.url_s} itemWidth={this.state.itemWidth} />}
            keyExtractor={item => item.id}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.3}
            initialNumToRender={5}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,//Constants.statusBarHeight,
    marginBottom: 200,
    justifyContent: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
  },
  title: {
    fontSize: 32,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  }
});

export default GalleryComponent;
