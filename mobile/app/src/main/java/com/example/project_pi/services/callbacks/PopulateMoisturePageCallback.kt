package com.example.project_pi.services.callbacks

import android.widget.TextView
import com.example.project_pi.dataclasses.MultipleRecordResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class PopulateMoisturePageCallback : Callback<MultipleRecordResponse> {
    private val componentsView: Array<TextView>

    constructor(componentsView : Array<TextView>){
        this.componentsView = componentsView
    }

    override fun onResponse(call: Call<MultipleRecordResponse>, response: Response<MultipleRecordResponse>) {
        val records = response.body()!!.record!!

        for(i in 0 until records.size){
            val humidity = records[i].humidity!!

            componentsView[i].setText(humidity + "%")
        }
    }

    override fun onFailure(call: Call<MultipleRecordResponse>, t: Throwable) {
        TODO("Not yet implemented")
    }
}