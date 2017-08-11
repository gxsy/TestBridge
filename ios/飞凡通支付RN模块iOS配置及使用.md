### iOS部分

#### 配置、代码及使用

1. 工程配置：（此模块未发布npm，以下为手动配置）

- 获取飞凡通支付RN桥接模块：<http://10.199.192.11/business-platform/RNFFpayBridge.git> (最新代码可能在dve分支)，将整个模块放入/[your project]/node modules 目录下；
- 用Xcode打开你的ReactNative项目中的ios目录下的project,在飞凡通支付RN桥接模块，找到RCTFFanPay.xcodeproj，拖入Xcode的“Libraries”目录中；
- 将模块中的FFanPaySDK.framework导入一份到Xcode 项目(your project根目录下一级即可)，选择“copy if necessary”；
- 依次选择Target(项目名)->Build Phases->Link Binary With Libraries,点击“+”，添加增加以下依赖CoreTelephony.framework, SystemConfiguration.framework,FFanPaySDK.framework；
- 依次点击Target->Build Settings选项中，找到Other Linker Flags,添加-objC和-all_load
- 如果你的app基于9.0编译，那么为了适配iOS9.0中的App Transport Security(ATS)对http的限制，在app对应的info.list中添加如下配置:
```
<key>NSAppTransportSecurity</key>
<dict>
<key>NSAllowsArbitraryLoads</key><true/>
</dict>
```
- 在Xcode中,选择你的工程设置项,选中“TARGETS”一栏,在“info”标签栏的“URL type “添加“URL scheme”为ffpay+appId,indentifier填写域名反转形式；
- iOS9 以后需要在info.plist里面添加LSApplicationQueriesSchemes(Array 类型),然后插入wandafeifanpay和feifantongkuaiqianbao的 string 类型两子项。

2.代码

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

3.使用

- 参照本模块index.js在ReactNative中使用
- Have fun! 