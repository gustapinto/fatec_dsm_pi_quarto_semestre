package com.example.project_pi

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.ImageView
import android.widget.TextView
import com.example.project_pi.config.Global
import com.example.project_pi.services.callbacks.PopulateTemperaturePageCallback
import kotlinx.android.synthetic.main.activity_home_thermometer.*

class HomeThermometer : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_thermometer)
        val componentsView : Array<TextView> = arrayOf(txtTemp1, txtTemp2, txtTemp3, txtTemp4, txtTemp5)
        val datesViews: Array<TextView> = arrayOf(txtDate1, txtDate2, txtDate3, txtDate4)
        val componentsIconsTemp : Array<ImageView> = arrayOf(registerOneViewThermometer, registerTwoViewThermometer, registerThreeViewThermometer, registerFourViewThermometer)

        // Obtém as últimas 5 temperaturas
        RetrofitInitializer()
            .thermostatService()
            .getRecordsWithLimits(Global.getArduinos(), 5, Global.getToken())
            .enqueue(PopulateTemperaturePageCallback(componentsView, datesViews, componentsIconsTemp))

        registerTwoViewThermometer.setImageResource(R.drawable.temperature_low)

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