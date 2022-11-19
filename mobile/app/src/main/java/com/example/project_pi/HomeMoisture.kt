package com.example.project_pi

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_home_moisture.*

class HomeMoisture : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_moisture)

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