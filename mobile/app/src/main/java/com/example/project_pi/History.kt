package com.example.project_pi

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.TextView
import com.example.project_pi.config.Global
import com.example.project_pi.services.callbacks.PopulateHistoryPageCallback
import kotlinx.android.synthetic.main.activity_history.*

class History : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_history)
        val temperaturesView : Array<TextView> = arrayOf(textView54, textView60, textView64, textView16)
        val moistureView : Array<TextView> = arrayOf(textView84, textView86, textView89, textView41)
        val datesFromTemperatureView : Array<TextView> = arrayOf(textView55, textView61, textView65, textView19)
        val datesFromMoistureView : Array<TextView> = arrayOf(textView85, textView87, textView88, textView40)

        RetrofitInitializer()
            .thermostatService()
            .getRecordsWithLimits(Global.getArduinos(), 4, Global.getToken())
            .enqueue(PopulateHistoryPageCallback(datesFromTemperatureView, temperaturesView, "temperature"))

        RetrofitInitializer()
            .thermostatService()
            .getRecordsWithLimits(Global.getArduinos(), 4, Global.getToken())
            .enqueue(PopulateHistoryPageCallback(datesFromMoistureView, moistureView, "moisture"))

        homeTempViewHistory.setOnClickListener {
            val intent = Intent(applicationContext, HomeThermometer::class.java)

            startActivity(intent)
        }

        homeUmiViewHistory.setOnClickListener {
            val intent = Intent(applicationContext, HomeMoisture::class.java)

            startActivity(intent)
        }

        homeConfigViewHistory.setOnClickListener {
            val intent = Intent(applicationContext, Settings::class.java)

            startActivity(intent)
        }
    }
}