package com.example.project_pi.dataclasses

import com.google.gson.annotations.SerializedName

data class ConnectionsResponse(
    @SerializedName("result") val arduinos: Array<Arduino>? = null,
    @SerializedName("message") val message: String? = null
)
