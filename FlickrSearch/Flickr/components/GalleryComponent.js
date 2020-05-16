import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width
const PRODUCT_ITEM_MARGIN = 5

function Item({ title, imgUrl, itemWidth }) {
  return (
    <View style={[styles.item, {width: itemWidth}]}>
      {/* <Text style={styles.title}>{title}</Text> */}
      {imgUrl ? <Image style={styles.image} source={{uri: imgUrl}} /> : null}
    </View>
  );
}

const itemWidth = column => {
  return (SCREEN_WIDTH / column) - (column-1) * PRODUCT_ITEM_MARGIN
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
    return (
      <View>
        <View style={styles.container}>
          <FlatList
            data={this.props.data}
            numColumns={this.props.columns}
            renderItem={({ item }) => <Item title={item.title} imgUrl={item.url_s} itemWidth={this.state.itemWidth} />}
            keyExtractor={item => item.id}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0}
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
  },
  item: {
    backgroundColor: '#f9c2ff',
    // padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
    marginHorizontal: PRODUCT_ITEM_MARGIN,
    borderWidth: 1,
    borderColor: 'blue',
  },
  title: {
    fontSize: 32,
  },
  image: {
    width: 70,
    height: 200,
    backgroundColor: 'red'
  }
});

export default GalleryComponent;
