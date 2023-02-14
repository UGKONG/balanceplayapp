package com.balanceplayapp;

import android.os.Bundle;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint;
import com.facebook.react.defaults.DefaultReactActivityDelegate;

import org.devio.rn.splashscreen.SplashScreen;

import com.dooboolab.naverlogin.RNNaverLoginModule;

import com.rnfs.RNFSPackage;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    setTheme(R.style.AppTheme);

    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
    RNNaverLoginModule.initialize(this);

    // super.onCreate(null); // 기존
  }

  @Override
  protected String getMainComponentName() {
    return "balanceplayapp";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new DefaultReactActivityDelegate(
        this,
        getMainComponentName(),
        DefaultNewArchitectureEntryPoint.getFabricEnabled(),
        DefaultNewArchitectureEntryPoint.getConcurrentReactEnabled()
    );
  }

}
