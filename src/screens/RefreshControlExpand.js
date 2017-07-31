import React from "react";
import { Text, ListView } from "react-native";

import RefreshControl from "react-native-refresh-control-wd";

import LoadingMore from "../components/LoadingMore";
import mork from "../data/mork";

const initData = mork;

class RefreshControlExpand extends React.Component {
  static navigationOptions = {
    title: "RefreshControlExpand"
  };

  constructor(props) {
    super(props);
    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(initData)
    };

    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
  }

  onRefresh() {
    console.log("on refresh");
    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.setState({
      dataSource: ds.cloneWithRows(mork)
    });
  }

  renderRow(rowData) {
    return <Text>{rowData}</Text>;
  }

  renderFooter() {
    return <LoadingMore />;
  }

  onEndReached() {
    ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    initData = initData.concat(this.morkData());
    setTimeout(() => {
      console.log("load more");
      this.setState({
        dataSource: ds.cloneWithRows(initData)
      });
    }, 500);
  }

  morkData() {
    let data = Array.from(new Array(10)).map((val, index) =>
      "qwe".concat("test").concat(index).concat(Math.random(10))
    );

    return data;
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        onEndReached={() => {
          console.log("on End Reached");
          this.onEndReached();
        }}
        onEndReachedThreshold={10}
        renderFooter={this.renderFooter}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => this.onRefresh()}
            changeDefaultHead={"test"}
          />
        }
      />
    );
  }
}

export default RefreshControlExpand;
