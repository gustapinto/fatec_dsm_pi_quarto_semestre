package com.example.project_pi

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import kotlinx.android.synthetic.main.activity_init.*
import com.example.project_pi.RetrofitInitializer

class Init : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_init)

        RetrofitInitializer().thermostatService().list()

        buttonStart.setOnClickListener {
            val intent = Intent(applicationContext, NewDevice::class.java)

            startActivity(intent)
        }
    }

    private fun plates(){

    }
}