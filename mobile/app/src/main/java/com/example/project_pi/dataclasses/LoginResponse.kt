package com.example.project_pi.dataclasses

import com.google.gson.annotations.SerializedName

data class LoginResponse (
    @SerializedName("result") val result: String? = null,
    @SerializedName("message") val message: String? = null
)