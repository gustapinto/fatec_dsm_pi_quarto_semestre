package com.example.project_pi.services.callbacks

import com.example.project_pi.config.Config
import com.example.project_pi.config.Global
import com.example.project_pi.dataclasses.LoginResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class LoginCallback : Callback<LoginResponse> {
    override fun onResponse(call: Call<LoginResponse>, response: Response<LoginResponse>) {
        Global.setToken(response.body()!!.result!!)
    }

    override fun onFailure(call: Call<LoginResponse>, t: Throwable) {
        TODO("Not yet implemented")
    }
}