import Foundation
import EventKit
import React

@objc(CalendarModule)
class CalendarModule: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc
  fun getEvents(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    let eventStore = EKEventStore()
    
    eventStore.requestAccess(to: .event) { granted, error in
      if granted {
        let calendar = Calendar.current
        let startDate = Date()
        let endDate = calendar.date(byAdding: .day, value: 1, to: startDate)!
        
        let predicate = eventStore.predicateForEvents(withStart: startDate, end: endDate, calendars: nil)
        let events = eventStore.events(matching: predicate)
        
        var result: [[String: Any]] = []
        for event in events {
          result.append([
            "id": event.eventIdentifier ?? "",
            "title": event.title ?? "",
            "startTime": event.startDate.timeIntervalSince1970 * 1000
          ])
        }
        resolve(result)
      } else {
        // Return empty array for demo if permission denied
        resolve([])
      }
    }
  }
}
