package com.example.project_pi.services.callbacks

import android.content.Context
import android.content.Intent
import com.example.project_pi.HomeThermometer
import com.example.project_pi.config.Config
import com.example.project_pi.config.Global
import com.example.project_pi.dataclasses.LoginResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginCallback : Callback<LoginResponse> {
    private val ctx: Context

    constructor(ctx: Context) {
        this.ctx = ctx
    }

    override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
        Global.setToken(response.body()!!.result!!)

        this.ctx.startActivity(Intent(this.ctx, HomeThermometer::class.java))
    }

    override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
        TODO("Not yet implemented")
    }
}