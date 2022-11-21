package com.example.project_pi.services

import com.example.project_pi.dataclasses.ConnectionsResponse
import com.example.project_pi.dataclasses.GenericResponse
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Path

interface ConnectionService {
    @GET("connections/check/{id}")
    fun hasConnections(@Path("id") androidId: String): Call<GenericResponse>

    @GET("connections/{id}")
    fun getArduinos(@Path("id") androidId: String): Call<ConnectionsResponse>
}