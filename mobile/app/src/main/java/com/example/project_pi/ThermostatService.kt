package com.example.project_pi

import retrofit2.http.GET

interface ThermostatService {
    @GET("arduino")
    fun list()
}