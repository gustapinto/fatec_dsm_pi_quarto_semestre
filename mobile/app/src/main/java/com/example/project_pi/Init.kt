package com.example.project_pi

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import com.example.project_pi.config.Config
import com.example.project_pi.dataclasses.GenericResponse
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
            val ctx = this
            val caller = RetrofitInitializer()
                .connectionService()
                .hasConnections(Config.getAndroidId(ctx))

            caller.enqueue(object : Callback<GenericResponse> {
                override fun onResponse(call: Call<GenericResponse>, response: Response<GenericResponse>) {
                    ctx.handleCheckConnectionResponse(response.body()!!)
                }

                override fun onFailure(call: Call<GenericResponse>, t: Throwable) {
                    TODO("Not yet implemented")
                }
            })
        }
    }

    fun handleCheckConnectionResponse(response: GenericResponse) {
        val deviceAlreadyHasConnections = response.result!! as Boolean

        if (deviceAlreadyHasConnections) {
            /**
             * TODO -> Obter a lista de arduinos usando um caller, pega o primeiro arduino e usar ele
             *         para fazer login
             * */

            val ctx = this
            val caller = RetrofitInitializer()
                .()
                .hasConnections(Config.getAndroidId(ctx))

            caller.enqueue(object : Callback<GenericResponse> {
                override fun onResponse(call: Call<GenericResponse>, response: Response<GenericResponse>) {
                    ctx.handleRequestOfListPlates(response.body()!!)
                }

                override fun onFailure(call: Call<GenericResponse>, t: Throwable) {
                    TODO("Not yet implemented")
                }
            })

            startActivity(Intent(this, HomeThermometer::class.java))
        } else {
            startActivity(Intent(this, NewDevice::class.java))
        }
    }

    fun handleRequestOfListPlates(response: GenericResponse){
        val listPlates = response.result!! as Array<Objects>

        println(listPlates)
    }

}