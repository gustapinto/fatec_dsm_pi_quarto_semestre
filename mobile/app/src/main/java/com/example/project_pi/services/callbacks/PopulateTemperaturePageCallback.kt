package com.example.project_pi.services.callbacks

import android.widget.TextView
import com.example.project_pi.dataclasses.MultipleRecordResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class PopulateTemperaturePageCallback : Callback<MultipleRecordResponse> {
    private val temp1TxtView: TextView
    private val temp2TxtView: TextView
    private val temp3TxtView: TextView
    private val temp4TxtView: TextView
    private val temp5TxtView: TextView

    constructor(temp1TxtView: TextView, temp2TxtView: TextView, temp3TxtView: TextView, temp4TxtView: TextView, temp5TxtView: TextView) {
        this.temp1TxtView = temp1TxtView
        this.temp2TxtView = temp2TxtView
        this.temp3TxtView = temp3TxtView
        this.temp4TxtView = temp4TxtView
        this.temp5TxtView = temp5TxtView
    }

    override fun onResponse(call: Call<MultipleRecordResponse>, response: Response<MultipleRecordResponse>) {
        val records = response.body()!!.record!!

        for (i in 0 until 5) {
            val temperature = records[i].temperature!!

            temp1TxtView.setText(temperature + "ºC")
        }
    }

    override fun onFailure(call: Call<MultipleRecordResponse>, t: Throwable) {
        TODO("Not yet implemented")
    }
}