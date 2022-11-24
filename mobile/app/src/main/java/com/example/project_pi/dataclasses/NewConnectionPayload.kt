package com.example.project_pi.dataclasses

import com.google.gson.annotations.SerializedName

data class NewConnectionPayload (
    @SerializedName("arduinoCode") val arduino: Int? = null,
    @SerializedName("androidId") val android: String? = null
)