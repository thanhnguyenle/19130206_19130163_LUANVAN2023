package com.ntpos_admin_mobile.zpmodule;

import android.app.Activity;
import android.content.Intent;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import vn.zalopay.sdk.listeners.PayOrderListener;
import vn.zalopay.sdk.ZaloPayError;
import vn.zalopay.sdk.ZaloPaySDK;

public class ZPModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext mReactContext;
    final String PAYMENTSUCCESS = "1";
    final String PAYMENTFAILED = "-1";
    final String PAYMENTCANCELED = "4";
    private int listenerCount = 0;

    PayOrderListener listener = new PayOrderListener() {
        @Override
        public void onPaymentSucceeded(String transactionId, String transToken, String appTransID) {
            // Handle Success
            WritableMap params = Arguments.createMap();
            params.putString("transactionId", transactionId);
            params.putString("transToken", transToken);
            params.putString("appTransID", appTransID);
            params.putString("returnCode", PAYMENTSUCCESS);
            sendEvent(mReactContext, "EventPayZalo", params);
        }

        @Override
        public void onPaymentCanceled(String transToken, String appTransID) {
            // Handle Cancel
            WritableMap params = Arguments.createMap();
            params.putString("returnCode",  PAYMENTCANCELED);
            params.putString("zpTranstoken", transToken);
            params.putString("appTransID", appTransID);
            sendEvent(mReactContext, "EventPayZalo", params);
        }

        @Override
        public void onPaymentError(ZaloPayError zaloPayError, String transToken, String appTransID) {
            // Handle Error
            WritableMap params = Arguments.createMap();
            params.putString("returnCode",  PAYMENTFAILED);
            params.putString("zpTranstoken", transToken);
            params.putString("appTransID", appTransID);
            sendEvent(mReactContext, "EventPayZalo", params);
        }
    };

    BaseActivityEventListener activityEventListener = new BaseActivityEventListener(){
        @Override
        public void onNewIntent(Intent intent) {
            super.onNewIntent(intent);
        }
    };

    public ZPModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mReactContext = reactContext;
        reactContext.addActivityEventListener(activityEventListener);
    }

    @Override
    public String getName() {
        return "PayZaloBridge";
    }

    @ReactMethod
    public void addListener(String eventName) {
        if (listenerCount == 0) {
            // Set up any upstream listeners or background tasks as necessary
        }

        listenerCount += 1;
    }

    @ReactMethod
    public void removeListeners(Integer count) {
        listenerCount -= count;
        if (listenerCount == 0) {
            // Remove upstream listeners, stop unnecessary background tasks
        }
    }

    @ReactMethod
    public void payOrder(String zpTransToken) {
        Activity currentActivity = getCurrentActivity();
        ZaloPaySDK.getInstance().payOrder(currentActivity, zpTransToken, "demozpdk://app", listener);
    }

    @ReactMethod
    public void installApp() {
        ZaloPaySDK.getInstance().navigateToZaloOnStore(mReactContext);
    }

    private void sendEvent(ReactContext reactContext, String eventName, WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }


}
