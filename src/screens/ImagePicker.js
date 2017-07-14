import React from 'react';
import { Text, ScrollView } from 'react-native';

class ImagePicker extends React.Component {
  static navigationOptions = {
    title: 'ImagePicker'
  };

  render() {
    return (
      <ScrollView>
        <Text>Image Picker</Text>
      </ScrollView>
    );
  }
}

export default ImagePicker;
