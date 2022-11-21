package com.example.project_pi

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.project_pi.config.Config
import kotlinx.android.synthetic.main.activity_init.*

class Init : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_init)

        buttonStart.setOnClickListener {
            println(Config.getAndroidId(this))
        }
    }
}