package com.example.project_pi

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_history.*

class History : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_history)

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