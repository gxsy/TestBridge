package com.geezer.feifanpay;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.feifan.pay.libsdk.entity.PayRequest;
import com.feifan.pay.libsdk.entity.PayResult;
import com.feifan.pay.libsdk.sdk.FeiFanPayApiFactory;
import com.feifan.pay.libsdk.sdk.IFeiFanPayApi;

import org.greenrobot.eventbus.EventBus;
import org.greenrobot.eventbus.Subscribe;
import org.greenrobot.eventbus.ThreadMode;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Nullable;

/**
 *  Created by geezer. on 2017/8/1.
 */

public class FFPayModule extends ReactContextBaseJavaModule {

    private static final String REACT_CLASS = "RTCFFPay";
    private static final String RESULT_PAY_OK_KEY = "RESULT_PAY_OK";
    private static final String RESULT_ERROR_CODE_USER_CANCEL_KEY = "RESULT_ERROR_CODE_USER_CANCEL";
    private static final String RESULT_ERROR_CODE_PAY_KEY = "RESULT_ERROR_CODE_PAY";
    private static final String mFFPayResponseEventName = "FFPayResponse";

    public FFPayModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(RESULT_PAY_OK_KEY, PayResult.RESULT_PAY_OK);
        constants.put(RESULT_ERROR_CODE_USER_CANCEL_KEY, PayResult.RESULT_ERROR_CODE_USER_CANCEL);
        constants.put(RESULT_ERROR_CODE_PAY_KEY, PayResult.RESULT_ERROR_CODE_PAY);
        return constants;
    }

    @Subscribe(threadMode = ThreadMode.MAIN)
    public void onResponseEvent(PayEvnet event) {
        PayResult payResult = event.mPayResult;
        String code = payResult.getResultStatus();
        String message = payResult.getResultMessage();

        WritableMap params = Arguments.createMap();
        params.putString("code", code);
        params.putString("message", message);

        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(mFFPayResponseEventName, params);

        EventBus.getDefault().unregister(this);
    }


    @ReactMethod
    public void pay(ReadableMap data) {
        PayRequest payRequest = new PayRequest();
        if (data.hasKey("appId")) {
            payRequest.setAppID(data.getString("appId"));
        }
        if (data.hasKey("merchantCode")) {
            payRequest.setMerchantCode(data.getString("merchantCode"));
        }
        if (data.hasKey("outTradeNo")) {
            payRequest.setOutTradeNo(data.getString("outTradeNo"));
        }
        if (data.hasKey("billOrderNo")) {
            payRequest.setBillOrderNo(data.getString("billOrderNo"));
        }
        // CallBackSchemeId可以自定义，自定义的结果页面需实现IKuaiqianEventHandler接口
        payRequest.setCallbackSchemeId("com.geezer.feifanpay.PayResultActivity");

        IFeiFanPayApi payApi = FeiFanPayApiFactory.createFeiFanPayApi(getCurrentActivity());

        EventBus.getDefault().register(this);
        payApi.pay(payRequest);

    }

}
