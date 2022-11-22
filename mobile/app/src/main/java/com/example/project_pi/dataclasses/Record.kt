package com.example.project_pi.dataclasses

import com.google.gson.annotations.SerializedName

data class Record(
    @SerializedName("id") val code: Number? = null,
    @SerializedName("temperature") val temperature: Number? = null,
    @SerializedName("humidity") val humidity: Number? = null,
    @SerializedName("api_temperature") val apiTemperature: Number? = null,
    @SerializedName("created_at") val createdAt: String? = null
)
