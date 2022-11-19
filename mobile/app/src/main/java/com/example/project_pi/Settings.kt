package com.example.project_pi

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_settings.*

class Settings : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_settings)

        homeTempViewConfig.setOnClickListener {
            val intent = Intent(applicationContext, HomeThermometer::class.java)

            startActivity(intent)
        }

        homeUmiViewConfig.setOnClickListener {
            val intent = Intent(applicationContext, HomeMoisture::class.java)

            startActivity(intent)
        }

        homeConfigViewConfig.setOnClickListener {
            val intent = Intent(applicationContext, Settings::class.java)

            startActivity(intent)
        }

        alterarInformacoes.setOnClickListener {
            val intent = Intent(applicationContext, ChangeInformation::class.java)

            startActivity(intent)
        }

        newDispositivo.setOnClickListener {
            val intent = Intent(applicationContext, NewDevice::class.java)

            startActivity(intent)
        }

        historico.setOnClickListener {
            val intent = Intent(applicationContext, History::class.java)

            startActivity(intent)
        }
    }
}