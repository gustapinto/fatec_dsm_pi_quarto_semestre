package com.example.project_pi.dataclasses

import com.google.gson.annotations.SerializedName

data class LoginPayload (
    @SerializedName("arduinoCode") val arduinoCode: Number? = null
)