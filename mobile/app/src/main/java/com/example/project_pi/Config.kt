package com.example.project_pi

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_add_dispositivos.*
import kotlinx.android.synthetic.main.activity_config.*

class Config : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_config)

        alterinfo.setOnClickListener {
            val intent = Intent(applicationContext, alterarInformacoes::class.java)

            startActivity(intent)
        }
    }
}