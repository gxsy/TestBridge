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
          title="Pay Page"
          onPress={() => this.onNavigate('PayPage')}
        />
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
        {/* <Button
          title="Address Picker"
          onPress={() => this.onNavigate('ChooseAddr')}
        /> */}
      </ScrollView>
    );
  }
}

export default Home;
