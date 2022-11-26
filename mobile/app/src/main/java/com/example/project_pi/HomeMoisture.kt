package com.example.project_pi

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.TextView
import com.example.project_pi.config.Global
import com.example.project_pi.services.callbacks.PopulateMoisturePageCallback
import kotlinx.android.synthetic.main.activity_home_moisture.*

class HomeMoisture : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_moisture)
        val componentsView : Array<TextView> = arrayOf(txtMoisture, txtMoisture2, txtMoisture3, txtMoisture4, txtMoisture5)

        RetrofitInitializer()
            .thermostatService()
            .getRecordsWithLimits(Global.getArduinos(), 5, Global.getToken())
            .enqueue(PopulateMoisturePageCallback(componentsView))

        homeTempViewUmi.setOnClickListener {
            val intent = Intent(applicationContext, HomeThermometer::class.java)

            startActivity(intent)
        }

        homeConfigViewUmi.setOnClickListener {
            val intent = Intent(applicationContext, Settings::class.java)

            startActivity(intent)
        }
    }
}