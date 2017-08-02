package com.geezer.feifanpay;

import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.feifan.pay.libsdk.entity.PayResult;
import com.feifan.pay.libsdk.sdk.FeiFanPayApiFactory;
import com.feifan.pay.libsdk.sdk.IFeiFanEventHandler;
import com.feifan.pay.libsdk.sdk.IFeiFanPayApi;

import org.greenrobot.eventbus.EventBus;


public class PayResultActivity extends ReactActivity implements IFeiFanEventHandler {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        IFeiFanPayApi api = FeiFanPayApiFactory.createFeiFanPayApi(this);
        api.handleIntent(getIntent(), this);
    }


    @Override
    public void onNewIntent(Intent intent) {
        super.onNewIntent(intent);
        setIntent(intent);

        IFeiFanPayApi api = FeiFanPayApiFactory.createFeiFanPayApi(this);
        api.handleIntent(getIntent(), this);
    }


    @Override
    public void onResponse(PayResult paramResp) {
        PayEvnet payEvnet = new PayEvnet();
        payEvnet.mPayResult = paramResp;
        EventBus.getDefault().post(payEvnet);
        finish();
    }
}
