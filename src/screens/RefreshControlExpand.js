import React from 'react';
import { Text, ListView } from 'react-native';

import RefreshControl from 'react-native-refresh-control-wd';

const mork = ['row 1', 'row 2', 'row 1', 'row 2', 'row 1', 'row 2'];

class RefreshControlExpand extends React.Component {
  static navigationOptions = {
    title: 'RefreshControlExpand'
  };

  constructor(props) {
    super(props);
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

    this.state = {
      dataSource: ds.cloneWithRows(mork),
    };
  }

  onRefresh(data) {
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    mork = mork.concat(data);
    this.setState({
      dataSource: ds.cloneWithRows(mork),
    });
  }

  morkData() {
    let data = Array.from(new Array(10))
                .map((val, index) => 'qwe'.concat('test').concat(index).concat(Math.random(10)));

    return data;
  }


  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => <Text>{rowData}</Text>}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => this.onRefresh(this.morkData())}
            changeDefaultHead={'test'}
          />
        }
      />
    );
  }
}

export default RefreshControlExpand;
