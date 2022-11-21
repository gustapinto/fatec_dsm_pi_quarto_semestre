package com.example.project_pi

import com.example.project_pi.config.Config
import com.example.project_pi.services.AuthService
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import com.example.project_pi.services.ThermostatService

class RetrofitInitializer {
        private val retrofit = Retrofit.Builder()
                .baseUrl(Config.getApiUrl())
                .addConverterFactory(GsonConverterFactory.create())
                .build()

        fun thermostatService() : ThermostatService {
                return retrofit.create(ThermostatService::class.java)
        }

        fun authService() : AuthService {
                return retrofit.create(AuthService::class.java)
        }
}