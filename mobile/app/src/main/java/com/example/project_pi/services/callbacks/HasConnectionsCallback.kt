package com.example.project_pi.services.callbacks

import android.content.Context
import android.content.Intent
import com.example.project_pi.HomeThermometer
import com.example.project_pi.NewDevice
import com.example.project_pi.RetrofitInitializer
import com.example.project_pi.config.Config
import com.example.project_pi.dataclasses.GenericResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class HasConnectionsCallback : Callback<GenericResponse> {
    private val ctx: Context

    constructor(ctx: Context) {
        this.ctx = ctx
    }

    override fun onResponse(call: Call<GenericResponse>, response: Response<GenericResponse>) {
        val deviceAlreadyHasConnections = response.body()!!.result!! as Boolean

        if (deviceAlreadyHasConnections) {
            RetrofitInitializer()
                .connectionService()
                .getArduinos(Config.getAndroidId(this.ctx))
                .enqueue(GetConnectionsCallback(this.ctx))
        } else {
            this.ctx.startActivity(Intent(this.ctx, NewDevice::class.java))
        }
    }

    override fun onFailure(call: Call<GenericResponse>, t: Throwable) {
        TODO("Not yet implemented")
    }
}