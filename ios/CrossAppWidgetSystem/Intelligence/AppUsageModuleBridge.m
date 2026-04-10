#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(AppUsageModule, NSObject)

RCT_EXTERN_METHOD(getUsageStats:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
