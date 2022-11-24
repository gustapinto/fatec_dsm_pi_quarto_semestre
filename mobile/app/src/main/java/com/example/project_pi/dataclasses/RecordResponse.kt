package com.example.project_pi.dataclasses

import com.google.gson.annotations.SerializedName

data class SingleRecordResponse(
    @SerializedName("result") val record: Record? = null,
    @SerializedName("message") val message: String? = null
)

data class MultipleRecordResponse(
    @SerializedName("result") val record: Array<Record>? = null,
    @SerializedName("message") val message: String? = null
)
