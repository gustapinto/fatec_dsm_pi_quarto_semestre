package com.example.project_pi.dataclasses

import com.google.gson.annotations.SerializedName

data class Arduino(
    @SerializedName("arduinoCode") val code: Number? = null,
    @SerializedName("arduinoName") val name: String? = null
)
