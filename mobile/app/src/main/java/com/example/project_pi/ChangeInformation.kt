package com.example.project_pi

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_change_information.*

class ChangeInformation : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_change_information)

        homeTempViewAlterInfo.setOnClickListener {
            val intent = Intent(applicationContext, HomeThermometer::class.java)

            startActivity(intent)
        }

        homeUmiViewAlterInfo.setOnClickListener {
            val intent = Intent(applicationContext, HomeMoisture::class.java)

            startActivity(intent)
        }

        homeConfigViewAlterInfo.setOnClickListener {
            val intent = Intent(applicationContext, Settings::class.java)

            startActivity(intent)
        }
    }
}