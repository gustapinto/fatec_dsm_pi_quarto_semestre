package com.example.project_pi

import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import com.example.project_pi.ThermostatService

class RetrofitInitializer {
        private val retrofit = Retrofit.Builder()
                .baseUrl("https://termostato.programame.dev/api/")
                .addConverterFactory(GsonConverterFactory.create())
                .build()

        fun thermostatService() : ThermostatService{
                return retrofit.create(ThermostatService::class.java)
        }
}