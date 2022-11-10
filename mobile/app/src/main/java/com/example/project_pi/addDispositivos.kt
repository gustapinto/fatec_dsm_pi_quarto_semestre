package com.example.project_pi

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_add_dispositivos.*
import kotlinx.android.synthetic.main.activity_inicio.*

class addDispositivos : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_dispositivos)


        buttonContinue.setOnClickListener {
            val intent = Intent(applicationContext, homeTemp::class.java)

            startActivity(intent)
        }
    }
}