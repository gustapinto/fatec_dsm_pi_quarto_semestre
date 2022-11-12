package com.example.project_pi

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_home_temp.*
import kotlinx.android.synthetic.main.activity_inicio.*

class homeTemp : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_temp)

        homeUmiViewTemp.setOnClickListener {
            val intent = Intent(applicationContext, homeUmidade::class.java)

            startActivity(intent)
        }

        homeCofigViewTemp.setOnClickListener {
            val intent = Intent(applicationContext, Config::class.java)

            startActivity(intent)
        }
    }
}