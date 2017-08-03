/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <FFanPaySDK/FFanPaySDK.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"TestBridge"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}


- (BOOL)application:(UIApplication*)app openURL:(NSURL *)url options:(NSDictionary<NSString *,id> *)options {
  
       if(url.scheme&& [url.scheme isEqualToString:@"ffpaydemo"]){
         [FFanPaySDK handleOpenURL:url callback:^(FFanPayResult *paymentResult) {
           //商户app根据返回的FFanPayResult，来跟新商户订单状态
           //NSString *string = paymentResult.resultStatus;
           
           [[NSNotificationCenter defaultCenter] postNotificationName:@"RCTFFanPayNotification" object:paymentResult];
//           UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"原生提示"message:string preferredStyle:UIAlertControllerStyleAlert];
//           [alert addAction:[UIAlertAction actionWithTitle:@"确定" style:UIAlertActionStyleCancel handler:nil]];
//           [self.window.rootViewController presentViewController:alert animated:YES completion:nil];
           
         }];
       }
      return YES;
}


@end
