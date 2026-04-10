import WidgetKit
import SwiftUI

struct Provider: TimelineProvider {
    func placeholder(in context: Context) -> SimpleEntry {
        SimpleEntry(date: Date(), id: "1", message: "Loading intelligence...", source: "system")
    }

    func getSnapshot(in context: Context, completion: @escaping (SimpleEntry) -> ()) {
        let entry = SimpleEntry(date: Date(), id: "1", message: "Upcoming Meeting", source: "calendar")
        completion(entry)
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<Entry>) -> ()) {
        var entries: [SimpleEntry] = []
        let currentDate = Date()
        
        // Mocking updates every hour
        for hourOffset in 0 ..< 5 {
            let entryDate = Calendar.current.date(byAdding: .hour, value: hourOffset, to: currentDate)!
            let entry = SimpleEntry(date: entryDate, id: "m-\(hourOffset)", message: "Contextual Suggestion \(hourOffset)", source: "intelligence")
            entries.append(entry)
        }

        let timeline = Timeline(entries: entries, policy: .atEnd)
        completion(timeline)
    }
}

struct SimpleEntry: TimelineEntry {
    let date: Date
    let id: String
    let message: String
    let source: String
}

struct IntelligenceWidgetEntryView : View {
    var entry: Provider.Entry
    @Environment(\.widgetFamily) var family

    var body: some View {
        ZStack {
            Color("WidgetBackground") // Assume defined in Assets
            
            VStack(alignment: .leading, spacing: 10) {
                HStack {
                    Image(systemName: "brain.head.profile")
                        .foregroundColor(.white)
                    Text("Intelligence")
                        .font(.headline)
                        .foregroundColor(.white)
                }
                
                Text(entry.message)
                    .font(.body)
                    .foregroundColor(.white.opacity(0.8))
                    .lineLimit(family == .systemSmall ? 2 : 4)
                
                if family != .systemSmall {
                    Spacer()
                    HStack {
                        Text("Source: \(entry.source.capitalized)")
                            .font(.caption2)
                            .foregroundColor(.white.opacity(0.5))
                        Spacer()
                        Image(systemName: "chevron.right.circle.fill")
                            .foregroundColor(.white)
                    }
                }
            }
            .padding()
        }
        .widgetURL(URL(string: "crossapp://widget/\(entry.id)"))
    }
}

struct IntelligenceWidget: Widget {
    let kind: String = "IntelligenceWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            IntelligenceWidgetEntryView(entry: entry)
        }
        .configurationDisplayName("Intelligence Hub")
        .description("Stay ahead with cross-app intelligence insights.")
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge, .accessoryCircular, .accessoryRectangular])
    }
}

@main
struct WidgetBundle: WidgetBundle {
    var body: some Widget {
        IntelligenceWidget()
    }
}
