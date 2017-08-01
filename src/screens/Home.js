import React from 'react';
import { Text, ScrollView, Button } from 'react-native';

class Home extends React.Component {
  static navigationOptions = {
    title: 'Home'
  };

  onNavigate(page) {
    this.props.navigation.navigate(page);
  }

  render() {
    return (
      <ScrollView>
        <Button
          title="Image Picker"
          onPress={() => this.onNavigate('ImagePicker')}
        />
        <Button
          title="RefreshControlExpand"
          onPress={() => this.onNavigate('RefreshControlExpand')}
        />
        <Button
          title="Input With Button"
          onPress={() => this.onNavigate('ButtonInput')}
        />
      </ScrollView>
    );
  }
}

export default Home;
