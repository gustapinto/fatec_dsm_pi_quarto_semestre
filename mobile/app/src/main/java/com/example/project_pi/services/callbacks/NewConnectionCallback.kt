package com.example.project_pi.services.callbacks

import android.content.Context
import android.content.Intent
import com.example.project_pi.HomeThermometer
import com.example.project_pi.dataclasses.GenericResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class NewConnectionCallback : Callback<GenericResponse> {
    private val ctx: Context

    constructor(ctx: Context) {
        this.ctx = ctx
    }

    override fun onResponse(call: Call<GenericResponse>, response: Response<GenericResponse>) {
        val intent = Intent(this.ctx, HomeThermometer::class.java)
        this.ctx.startActivity(intent)
    }

    override fun onFailure(call: Call<GenericResponse>, t: Throwable) {
        TODO("Not yet implemented")
    }
}