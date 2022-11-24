package com.example.project_pi.dataclasses

import com.google.gson.annotations.SerializedName

data class NewArduinoPayload (
    @SerializedName("code") val code: Int? = null,
    @SerializedName("name") val name: String? = null
)