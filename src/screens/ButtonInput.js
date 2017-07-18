import React from 'react';
import { Text, ScrollView } from 'react-native';
import TextInputWithButtons from 'react-native-keyboard-buttons';

class ButtonInput extends React.Component {
  static navigationOptions = {
    title: 'ButtonInput'
  };

  state = {
    value: 'default value'
  };

  render() {
    return (
      <ScrollView>
        <Text>ButtonInput</Text>
        <TextInputWithButtons
          style={[{ flex: 0, width: 40, alignSelf: 'center' }]}
          buttons={[
            {
              title: '<',
              color: '#00ff00',
              key: 'prev'
            },
            {
              title: '>',
              key: 'next'
            },
            {
              title: '|'
            },
            {
              title: 'Done',
              key: 'done'
            }
          ]}
          onAction={button => console.log('Keyboard button selected:', button)}
          keyboardType={'numeric'}
          selectTextOnFocus={true}
          onChangeText={text => {
            this.state.value = text;
          }}
          value={this.state.value}
        />
      </ScrollView>
    );
  }
}

export default ButtonInput;
