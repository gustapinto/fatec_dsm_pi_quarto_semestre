package com.example.project_pi.services

import com.example.project_pi.dataclasses.LoginPayload
import com.example.project_pi.dataclasses.LoginResponse
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthService {
    @POST("auth")
    fun login(@Body body: LoginPayload): Call<LoginResponse>
}