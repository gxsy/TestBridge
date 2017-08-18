//
//  FFanPaySDK.h
//  FFanPay
//
//  Created by git on 16/8/12.
//  Copyright © 2016年 git. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "FFanPayResult.h"
#import "FFanPayRequest.h"
@interface FFanPaySDK : NSObject



/**
 *  订单信息处理
 *
 *  @param payRequest 订单信息。
 *  @param scheme  注册在url type当前app的sheme
 *  @param resultBlock   订单处理结果
 */
+ (void)pay:(nonnull FFanPayRequest *)payRequest fromScheme:(nonnull NSString *)scheme resultBlock:(nonnull FFResultBlock)resultBlock;


/**
 *  订单处理完成
 *
 *  @param openUrl     订单处理url
 */
+ (void)handleOpenURL:(nonnull NSURL *)openUrl callback:(nonnull FFResultBlock)callbck;
@end
