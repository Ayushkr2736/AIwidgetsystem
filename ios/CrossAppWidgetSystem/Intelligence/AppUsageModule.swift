import Foundation
import React

@objc(AppUsageModule)
class AppUsageModule: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc
  fun getUsageStats(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    // Screen Time APIs are private on iOS for general apps. 
    // Returning mock data for the intelligence engine to process.
    let mockData = [
      ["packageName": "com.apple.mobilesafari", "totalTime": 45.0],
      ["packageName": "com.apple.Music", "totalTime": 120.0]
    ]
    resolve(mockData)
  }
}
