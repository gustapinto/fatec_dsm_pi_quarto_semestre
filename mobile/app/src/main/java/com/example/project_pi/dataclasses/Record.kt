package com.example.project_pi.dataclasses

import com.google.gson.annotations.SerializedName

data class Record(
    @SerializedName("id") val code: Number? = null,
    @SerializedName("temperature") val temperature: String? = null,
    @SerializedName("humidity") val humidity: String? = null,
    @SerializedName("api_temperature") val apiTemperature: String? = null,
    @SerializedName("created_at") val createdAt: String? = null,
    @SerializedName("date") val date: String? = null,
)
