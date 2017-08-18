## FFanPay bridge for React Native

### Usage

### Step 1 - install

```
	npm install git+http://10.199.192.11/business-platform/RNFFpayBridge.git --save
```

### Step 2 - link

```
	react-native link
```

### Step 3 - add native config


#### [A] Android 部分

##### 配置
1. YourProject/android/app/src/main/AndroidMainfest.xml: (添加一下配置)

```java

    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="com.feifan.o2o.pay.permission.FFPAY_ENTRY" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE"/>
    <uses-permission android:name="android.permission.READ_PHONE_STATE"/>
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    
    <application> // 以下配置放在 application 标签之中
        ....
    <!-- PayResultActivity 可用实现IKuaiqianEventHandler的Activity替换  -->
        <activity android:name="com.geezer.feifanpay.PayResultActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
            </intent-filter>
        </activity>

        <!-- KqH5PayActivity 全路径名称不可变 -->

        <activity
            android:name="com.feifan.pay.libsdk.sdk.FfanH5PayActivity"
            android:launchMode="singleTop"
            android:screenOrientation="portrait">
        </activity>
        
        <!-- PayResultActivity 可用实现IKuaiqianEventHandler的Activity替换  -->
        <activity android:name="com.geezer.feifanpay.PayResultActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
            </intent-filter>
        </activity>
        ...
    </application>
    
```


3. YourProject/android/app/proguard-rules.pro (添加忽略)

```java

# ffpay

-keep class com.feifan.pay.** 

```


#### [B] iOS 部分

##### 配置、代码

1. 工程配置：

- 用Xcode打开你的iOS项目，将/[your project]/node modules/react-native-ffpaymodule/ios目录下的FFanPaySDK.framework导入一份到Xcode主工程(your project根目录下一级即可)，注意勾选“copy if necessary”；
- 选择TARGETS(项目名)->Build Phases->Link Binary With Libraries，点击“+”，添加增加以下依赖CoreTelephony.framework，SystemConfiguration.framework，FFanPaySDK.framework；
- 分别在主工程及RCTFFanPay.xcodeproj子工程中依次点击TARGETS->Build Settings，搜索Other Linker Flags，添加-objC和-all_load；
- 如果你的app基于iOS 9.0编译，那么为了适配App Transport Security(ATS)对http的限制，在app对应的info.list中如下配置:添加App Transport Security Settings条目（若存在无需添加），在其下级添加 Allow Arbitrary Loads 类型Boolean, 值设为 YES；
或者在info.list的source code中添加：
```
<key>NSAppTransportSecurity</key>    
<dict>
<key>NSAllowsArbitraryLoads</key><true/>
</dict>
```
- 在Xcode中,选择你的工程设置项,选中“TARGETS”一栏,在“info”标签栏的“URL type “添加“URL scheme”为ffpay+appId,indentifier填写域名反转形式；
- iOS9 以后需要在info.plist里面添加LSApplicationQueriesSchemes(Array 类型),然后插入wandafeifanpay和feifantongkuaiqianbao的 string 类型两子项。

2.添加代码

- APPDelegate.m中增加头文件引用：#import\<FFanPaySDK/FFanPaySDK.h>，然后写入以下代码：

```
// iOS 9.0 later
- (BOOL)application:(UIApplication*)app openURL:(NSURL *)url options:(NSDictionary<NSString *,id> *)options {
  
       if(url.scheme&& [url.scheme isEqualToString:@"ffpay500"]){
         [FFanPaySDK handleOpenURL:url callback:^(FFanPayResult *paymentResult) {
           //商户app根据返回的FFanPayResult，来跟新商户订单状态
           [[NSNotificationCenter defaultCenter] postNotificationName:@"RCTFFanPayNotification" object:paymentResult];
         }];
       }
      return YES;
}

// iOS 9.0 before
- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(nullable NSString *)sourceApplication annotation:(id)annotation {
  
  if(url.scheme&& [url.scheme isEqualToString:@"ffpay500"]){
    [FFanPaySDK handleOpenURL:url callback:^(FFanPayResult *paymentResult) {
      //商户app根据返回的FFanPayResult，来跟新商户订单状态
      [[NSNotificationCenter defaultCenter] postNotificationName:@"RCTFFanPayNotification" object:paymentResult];
    }];
  }
  return YES;
}
``` 

#### Step 4 - import and use in RN project

```javascript
import React, { Component } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import Pay from "react-native-ffpaymodule";
   
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
	
```

- Play & have fun!
