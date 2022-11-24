package com.example.project_pi.services

import com.example.project_pi.dataclasses.SingleRecordResponse
import com.example.project_pi.dataclasses.MultipleRecordResponse
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Query
import retrofit2.http.Header

interface ThermostatService {
    @GET("record/last")
    fun getLastRecord(@Query("arduinos") arduinoCodes: Array<Number>, @Header("Authorization") token: String): Call<SingleRecordResponse>

    @GET("record")
    fun getAllRecords(@Query("arduinos") arduinoCodes: Array<Number>, @Header("Authorization") token: String): Call<MultipleRecordResponse>

    @GET("record")
    fun getRecordsWithLimits(@Query("arduinos") arduinoCodes: Array<Number>, @Query("limit") limit: Number, @Header("Authorization") token: String): Call<MultipleRecordResponse>
}