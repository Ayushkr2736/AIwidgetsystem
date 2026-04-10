import Foundation
import Contacts
import React

@objc(ContactsModule)
class ContactsModule: NSObject {
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc
  fun getContacts(_ resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) {
    let store = CNContactStore()
    
    store.requestAccess(for: .contacts) { granted, error in
      if granted {
        let keys = [CNContactGivenNameKey, CNContactFamilyNameKey] as [CNKeyDescriptor]
        let request = CNContactFetchRequest(keysToFetch: keys)
        
        var result: [[String: Any]] = []
        try? store.enumerateContacts(with: request) { contact, stop in
          result.append([
            "id": contact.identifier,
            "name": "\(contact.givenName) \(contact.familyName)"
          ])
        }
        resolve(result)
      } else {
        resolve([])
      }
    }
  }
}
