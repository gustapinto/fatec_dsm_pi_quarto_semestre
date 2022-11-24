package com.example.project_pi

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.project_pi.config.Config
import com.example.project_pi.dataclasses.NewArduinoPayload
import com.example.project_pi.services.callbacks.NewArduinoCallback
import kotlinx.android.synthetic.main.activity_add_device.*
import kotlinx.android.synthetic.main.activity_new_device.*

class AddDevice : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_add_device)

        buttonContinue.setOnClickListener {
            val arduinoName = txtNome.text.toString().trim()
            val arduinoCode = txtCodigo.text.toString().trim().toInt()
            val payload = NewArduinoPayload(arduinoCode, arduinoName)

            println(Config.getAndroidId(this))

            RetrofitInitializer()
                .arduinoService()
                .newArduino(payload)
                .enqueue(NewArduinoCallback(this, arduinoCode))
        }
    }
}