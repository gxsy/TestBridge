import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';


const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  spinner: {
    flexDirection: 'row',
    padding: 20,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner_text: {
    marginLeft: 10,
  },
});

class LoadingMore extends Component {
  static componentName = 'LoadingMore';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render = () => (
    <View style={styles.spinner}>
      <ActivityIndicator size={'large'} {...this.props} />
      <Text style={styles.spinner_text}>正在加载....</Text>
    </View>
  );
}
export default LoadingMore;
