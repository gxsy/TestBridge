//
//  FFanPayRequest.h
//  FFanPay
//
//  Created by git on 16/8/12.
//  Copyright © 2016年 git. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface FFanPayRequest : NSObject
/**
 *  应用标识(注：必传)
 */
@property (nonatomic, copy, nonnull) NSString *appId;

/**
 *  结算商户号，商户在快钱的会员号，是商户入驻快钱商户标识 (注：必传)
 */
@property (nonatomic, strong, nonnull) NSString *merchantCode;

/**
 *  商户自身唯一订单号 (注：选填)
 */
@property (nonatomic, strong, nonnull) NSString *outTradeNo;

/**
 *  飞凡通统一支付单号(注：必传)
 */
@property (nonatomic, copy, nullable) NSString *billOrderNo;


@end
