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

@end
