package com.example.project_pi.services.callbacks

import com.example.project_pi.RetrofitInitializer
import com.example.project_pi.dataclasses.ConnectionsResponse
import com.example.project_pi.dataclasses.LoginPayload
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class GetConnectionsCallback : Callback<ConnectionsResponse> {
    override fun onResponse(call: Call<ConnectionsResponse>, response: Response<ConnectionsResponse>) {
        val arduinos = response.body()!!.arduinos!!
        val payload = LoginPayload(arduinos[0].code) // Pega o primeiro código de arduino para usar no login

        RetrofitInitializer()
            .authService()
            .login(payload)
            .enqueue(LoginCallback())
    }

    override fun onFailure(call: Call<ConnectionsResponse>, t: Throwable) {
        TODO("Not yet implemented")
    }
}