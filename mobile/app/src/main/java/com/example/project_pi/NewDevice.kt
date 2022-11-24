package com.example.project_pi

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.project_pi.dataclasses.NewArduinoPayload
import com.example.project_pi.services.callbacks.NewArduinoCallback
import kotlinx.android.synthetic.main.activity_new_device.*

class NewDevice : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_new_device)

        btnAdicionar.setOnClickListener {
            val arduinoName = txtNome.text.toString().trim()
            val arduinoCode = txtCodigo.text.toString().trim().toInt()
            val payload = NewArduinoPayload(arduinoCode, arduinoName)

            RetrofitInitializer()
                .arduinoService()
                .newArduino(payload)
                .enqueue(NewArduinoCallback(this, arduinoCode))
        }
    }
}