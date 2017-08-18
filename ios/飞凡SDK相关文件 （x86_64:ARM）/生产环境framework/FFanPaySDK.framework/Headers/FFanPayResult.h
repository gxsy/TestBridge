//
//  FFanPayResult.h
//  FFanPay
//
//  Created by git on 16/8/12.
//  Copyright © 2016年 git. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "FFanPayResult.h"
/**
 *  错误代码
 */
static NSString * _Nonnull KQPaymentErrorCodePayFailure = @"300";                     // 支付失败
static NSString * _Nonnull KQPaymentErrorCodeUserCancelled = @"200";                  // 用户取消操作
static NSString * _Nonnull KQPaySuccess = @"100";                                     // 支付成功

/**
 *   调用回调block
 */
@class FFanPayResult;
typedef void(^FFResultBlock)(FFanPayResult * _Nonnull paymentResult);   //返回blck

@interface FFanPayResult : NSObject
/**
 *   飞凡通统一支付单号，和FFanPayRequest中的billOrderNo同一个字段
 */
@property (nonatomic, copy,nullable) NSString *billOrderNo;

/**
 *  支付状态码，如KQPaymentErrorCodePayFailure，KQPaySuccess字段
 */
@property (nonatomic, copy,nullable) NSString *resultStatus;

/**
 *  支付状态描述
 */
@property (nonatomic, copy,nullable) NSString *resultMessage;

@end


