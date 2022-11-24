package com.example.project_pi

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.project_pi.config.Config
import com.example.project_pi.config.Global
import com.example.project_pi.services.callbacks.GetArduinosCallback
import com.example.project_pi.services.callbacks.GetLastRecordCallback
import com.example.project_pi.services.callbacks.PopulateTemperaturePageCallback
import kotlinx.android.synthetic.main.activity_home_thermometer.*

class HomeThermometer : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_thermometer)

        // Obtém as últimas 5 temperaturas
        RetrofitInitializer()
            .thermostatService()
            .getRecordsWithLimits(Global.getArduinos(), 5, Global.getToken())
            .enqueue(PopulateTemperaturePageCallback(txtTemp, textView19, textView20, textView21, textView22))

        homeUmiViewTemp.setOnClickListener {
            val intent = Intent(applicationContext, HomeMoisture::class.java)

            startActivity(intent)
        }

        homeCofigViewTemp.setOnClickListener {
            val intent = Intent(applicationContext, Settings::class.java)

            startActivity(intent)
        }
    }
}