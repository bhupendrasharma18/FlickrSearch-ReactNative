import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';

function Item({ title, imgUrl }) {
  return (
    <View style={styles.item}>
      {/* <Text style={styles.title}>{title}</Text> */}
      {imgUrl ? <Image style={styles.image} source={{uri: imgUrl}} /> : null}
    </View>
  );
}

class GalleryComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    console.log(this.props);
    
    return (
      <View>
        <View style={styles.container}>
          <FlatList
            data={this.props.data}
            numColumns={2}
            renderItem={({ item }) => <Item title={item.title} imgUrl={item.url_s} />}
            keyExtractor={item => item.id}
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
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: 'red'
  }
});

export default GalleryComponent;
