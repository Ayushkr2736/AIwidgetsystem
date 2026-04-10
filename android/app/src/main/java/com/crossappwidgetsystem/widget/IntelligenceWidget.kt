package com.crossappwidgetsystem.widget

import android.content.Context
import androidx.compose.ui.unit.dp
import androidx.glance.*
import androidx.glance.action.actionStartActivity
import androidx.glance.appwidget.*
import androidx.glance.layout.*
import androidx.glance.text.*
import androidx.glance.unit.ColorProvider
import com.crossappwidgetsystem.MainActivity
import androidx.compose.runtime.Composable
import androidx.glance.unit.ColorProvider as GlanceColor

class IntelligenceWidget : GlanceAppWidget() {

    override suspend fun provideGlance(context: Context, id: GlanceId) {
        provideContent {
            IntelligenceWidgetContent()
        }
    }

    @Composable
    private fun IntelligenceWidgetContent() {
        val size = LocalSize.current
        
        Column(
            modifier = GlanceModifier
                .fillMaxSize()
                .background(GlanceColor(android.graphics.Color.WHITE))
                .padding(12.dp)
        ) {
            Row(modifier = GlanceModifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically) {
                Text(
                    text = "Intelligence",
                    style = TextStyle(fontWeight = FontWeight.Bold, fontSize = 16.sp)
                )
                Spacer(modifier = GlanceModifier.defaultWeight())
                Box(
                    modifier = GlanceModifier
                        .background(GlanceColor(android.graphics.Color.parseColor("#6366F1")))
                        .padding(horizontal = 6.dp, vertical = 2.dp)
                ) {
                    Text(text = "2", style = TextStyle(color = GlanceColor(android.graphics.Color.WHITE), fontSize = 10.sp))
                }
            }

            Spacer(modifier = GlanceModifier.height(8.dp))

            // Contextual Message
            Text(
                text = "Next: Team Sync starts in 15 mins",
                style = TextStyle(fontSize = 14.sp),
                maxLines = 2
            )

            if (size.width > 150.dp) {
                Spacer(modifier = GlanceModifier.height(8.dp))
                Row(modifier = GlanceModifier.fillMaxWidth()) {
                    Button(
                        text = "Sync",
                        onClick = actionStartActivity<MainActivity>(),
                        modifier = GlanceModifier.height(30.dp)
                    )
                }
            }
        }
    }
}

class IntelligenceWidgetReceiver : GlanceAppWidgetReceiver() {
    override val glanceAppWidget: GlanceAppWidget = IntelligenceWidget()
}
