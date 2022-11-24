package com.example.project_pi.services.callbacks

import android.content.Context
import android.content.Intent
import com.example.project_pi.HomeThermometer
import com.example.project_pi.RetrofitInitializer
import com.example.project_pi.config.Config
import com.example.project_pi.dataclasses.GenericResponse
import com.example.project_pi.dataclasses.NewConnectionPayload
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class NewArduinoCallback : Callback<GenericResponse> {
    private val ctx: Context
    private val arduinoCode: Int

    constructor(ctx: Context, arduinoCode: Int) {
        this.ctx = ctx
        this.arduinoCode = arduinoCode
    }

    override fun onResponse(call: Call<GenericResponse>, response: Response<GenericResponse>) {
        val payload = NewConnectionPayload(this.arduinoCode, Config.getAndroidId(this.ctx))

        RetrofitInitializer()
            .connectionService()
            .newConnection(payload)
            .enqueue(NewConnectionCallback(this.ctx))
    }

    override fun onFailure(call: Call<GenericResponse>, t: Throwable) {
        TODO("Not yet implemented")
    }
}