package com.crossappwidgetsystem.intelligence

import com.facebook.react.bridge.*
import android.Manifest
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat
import android.app.usage.UsageStatsManager
import android.content.Context
import java.util.*

class CalendarModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String = "CalendarModule"

    @ReactMethod
    fun getEvents(promise: Promise) {
        val permission = ContextCompat.checkSelfPermission(reactApplicationContext, Manifest.permission.READ_CALENDAR)
        if (permission == PackageManager.PERMISSION_GRANTED) {
            // Real implementation would query Calendar Provider
            val events = Arguments.createArray()
            val event = Arguments.createMap().apply {
                putString("id", "1")
                putString("title", "Native Meeting")
                putDouble("startTime", System.currentTimeMillis().toDouble() + 300000)
            }
            events.pushMap(event)
            promise.resolve(events)
        } else {
            // Return mock data for demo if permission denied
            promise.resolve(Arguments.createArray())
        }
    }
}

class AppUsageModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String = "AppUsageModule"

    @ReactMethod
    fun getUsageStats(promise: Promise) {
        val usageStatsManager = reactApplicationContext.getSystemService(Context.USAGE_STATS_SERVICE) as UsageStatsManager
        val calendar = Calendar.getInstance()
        calendar.set(Calendar.HOUR_OF_DAY, 0)
        
        val stats = usageStatsManager.queryUsageStats(UsageStatsManager.INTERVAL_DAILY, calendar.timeInMillis, System.currentTimeMillis())
        
        val result = Arguments.createArray()
        if (stats != null) {
            for (usageStats in stats) {
                if (usageStats.totalTimeInForeground > 0) {
                    val map = Arguments.createMap().apply {
                        putString("packageName", usageStats.packageName)
                        putDouble("totalTime", usageStats.totalTimeInForeground.toDouble() / 60000) // minutes
                    }
                    result.pushMap(map)
                }
            }
        }
        promise.resolve(result)
    }
}

class ContactsModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String = "ContactsModule"

    @ReactMethod
    fun getContacts(promise: Promise) {
        val permission = ContextCompat.checkSelfPermission(reactApplicationContext, Manifest.permission.READ_CONTACTS)
        if (permission == PackageManager.PERMISSION_GRANTED) {
            val contacts = Arguments.createArray()
            val contact = Arguments.createMap().apply {
                putString("id", "c1")
                putString("name", "Native Contact")
            }
            contacts.pushMap(contact)
            promise.resolve(contacts)
        } else {
            promise.resolve(Arguments.createArray())
        }
    }
}
