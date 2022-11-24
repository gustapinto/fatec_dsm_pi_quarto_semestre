package com.example.project_pi

import android.content.Intent
import android.media.browse.MediaBrowser.ConnectionCallback
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.project_pi.config.Config
import com.example.project_pi.dataclasses.GenericResponse
import com.example.project_pi.services.callbacks.GetConnectionsCallback
import com.example.project_pi.services.callbacks.HasConnectionsCallback
import kotlinx.android.synthetic.main.activity_init.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.util.*

class Init : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_init)

        buttonStart.setOnClickListener {
            RetrofitInitializer()
                .connectionService()
                .hasConnections(Config.getAndroidId(this))
                .enqueue(HasConnectionsCallback(this))
        }
    }
}