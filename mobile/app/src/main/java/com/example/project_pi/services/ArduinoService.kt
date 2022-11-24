package com.example.project_pi.services

import com.example.project_pi.dataclasses.GenericResponse
import com.example.project_pi.dataclasses.NewArduinoPayload
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface ArduinoService {
    @POST("arduino")
    fun newArduino(@Body body: NewArduinoPayload): Call<GenericResponse>
}