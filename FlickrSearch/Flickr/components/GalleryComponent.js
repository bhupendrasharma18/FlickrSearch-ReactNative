import React, { Component } from 'react';
import { View, StyleSheet, FlatList, Image } from 'react-native';

function Item({ imgUrl, itemWidth }) {
  return (
    <View style={[styles.item, {width: itemWidth, height: itemWidth}]}>
      {imgUrl ? <Image style={[styles.image, {width: itemWidth-5, height: itemWidth-5}]} source={{uri: imgUrl}} /> : null }
    </View>
  );
}

class GalleryComponent extends Component {
  constructor(props) {
    super(props);
  }

  loadMoreItems = () => {
    this.props.loadMorePhotos()
  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <FlatList
            data={this.props.data}
            numColumns={this.props.columns}
            renderItem={({ item }) => <Item title={item.title} imgUrl={item.url_s} itemWidth={this.props.itemWidth} />}
            keyExtractor={item => item.id}
            onEndReached={this.loadMoreItems}
            onEndReachedThreshold={0.3}
            initialNumToRender={5}
            key={this.props.columns}
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
