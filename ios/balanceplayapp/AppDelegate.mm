#import "AppDelegate.h"

#import <Firebase.h>
#import <FirebaseCore.h>
#import <FirebaseMessaging.h>

#import <React/RCTBundleURLProvider.h>

// #import "RNSplashScreen.h"

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"balanceplayapp";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  // self.initialProps = @{};

  if ([FIRApp defaultApp] == nil) {
    [FIRApp configure];
  }
  

  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter]; // 추가
  
  // [RNSplashScreen show];
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

- (BOOL)concurrentRootEnabled
{
  return true;
}

@end
