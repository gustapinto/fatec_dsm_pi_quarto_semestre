package com.example.project_pi.dataclasses

import com.google.gson.annotations.SerializedName

data class GenericResponse(
    @SerializedName("result") val result: Any? = null,
    @SerializedName("message") val message: Any? = null
)
