#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(ContactsModule, NSObject)

RCT_EXTERN_METHOD(getContacts:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
