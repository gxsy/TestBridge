import React, { Component } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import Pay from "../modules/Pay";

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    height: 40,
    alignItems: "center"
  },
  inputTitle: {
    width: 100
  },
  inputEidt: {
    flex: 1
  }
});

class PayPage extends Component {
  static navigationOptions = {
    title: "PayPage"
  };

  constructor(props) {
    super(props);
    this.state = {
      appId: "102",
      merchantCode: "20012760671",
      outTradeNo: "12345678901",
      billOrderNo: "201708011408228961000210190",
      message: ""
    };
  }

  componentWillMount() {
    Pay.onPayResponseListener(event => {
      console.log(event);
      switch (event.code) {
        case Pay.RESULT_PAY_OK:
        // pay success
          this.setState({
            message: event.message,
          });
          break;
        case Pay.RESULT_ERROR_CODE_USER_CANCEL:
        // pay cancelled
          this.setState({
            message: event.message,
          });
          break;
        case Pay.RESULT_ERROR_CODE_PAY:
        // pay error see "message"
          this.setState({
            message: event.message,
          });
          break;
      }
    });
  }

  componentWillUnmount() {
    // Pay.removeOnPayResponseListener();
  }

  renderInput(name, value, change) {
    return (
      <View style={styles.input}>
        <Text style={styles.inputTitle}>
          {name}:
        </Text>
        <TextInput
          style={styles.inputEidt}
          value={value}
          onChangeText={change}
        />
      </View>
    );
  }

  render() {
    return (
      <View>
        {this.renderInput("AppID", this.state.appId, text =>
          this.setState({
            appId: text
          })
        )}
        {this.renderInput("Merchant Code", this.state.merchantCode, text =>
          this.setState({
            merchantCode: text
          })
        )}
        {this.renderInput("OutTrade No", this.state.outTradeNo, text =>
          this.setState({
            outTradeNo: text
          })
        )}
        {this.renderInput("Bill Order No", this.state.billOrderNo, text =>
          this.setState({
            billOrderNo: text
          })
        )}
        <Button title={"pay"} onPress={() => Pay.pay(this.state)} />
        <Text>
          {this.state.message}
        </Text>
      </View>
    );
  }
}

export default PayPage;
