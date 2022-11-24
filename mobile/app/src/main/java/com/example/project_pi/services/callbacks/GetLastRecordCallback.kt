package com.example.project_pi.services.callbacks

import android.content.Context
import android.widget.TextView
import com.example.project_pi.config.Global
import com.example.project_pi.dataclasses.SingleRecordResponse
import kotlinx.coroutines.processNextEventInCurrentThread
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class GetLastRecordCallback: Callback<SingleRecordResponse> {
    private val field: TextView

    constructor(field: TextView) {
        this.field = field
    }

    override fun onResponse(call: Call<SingleRecordResponse>, response: Response<SingleRecordResponse>) {
        this.field.setText(response.body()!!.record!!.temperature + "ºC")
    }

    override fun onFailure(call: Call<SingleRecordResponse>, t: Throwable) {
        println(t)
    }
}