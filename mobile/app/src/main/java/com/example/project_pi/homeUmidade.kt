package com.example.project_pi

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_home_temp.*
import kotlinx.android.synthetic.main.activity_home_umidade.*

class homeUmidade : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home_umidade)

        homeTempViewUmi.setOnClickListener {
            val intent = Intent(applicationContext, homeTemp::class.java)

            startActivity(intent)
        }

        homeConfigViewUmi.setOnClickListener {
            val intent = Intent(applicationContext, Config::class.java)

            startActivity(intent)
        }
    }
}