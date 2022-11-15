package com.example.project_pi

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_config.*

class Config : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_config)

        alterinfo.setOnClickListener {
            val intent = Intent(applicationContext, alterarInformacoes::class.java)

            startActivity(intent)
        }

        addDispositivo.setOnClickListener {
            val intent = Intent(applicationContext, newDispositivos::class.java)

            startActivity(intent)
        }

        buttonHistory.setOnClickListener {
            val intent = Intent(applicationContext, historico::class.java)

            startActivity(intent)
        }
    }
}