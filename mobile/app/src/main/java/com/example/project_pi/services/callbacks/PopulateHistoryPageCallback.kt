package com.example.project_pi.services.callbacks

import android.view.View
import android.widget.ArrayAdapter
import android.widget.TextView
import com.example.project_pi.dataclasses.MultipleRecordResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class PopulateHistoryPageCallback : Callback<MultipleRecordResponse> {
    private val datesView: Array<TextView>
    private val temperaturesView: Array<TextView>
    private val typeHistoryPagePart: String

    constructor(datesView: Array<TextView>, temperaturesView: Array<TextView>, typeHistoryPagePart: String){
        this.datesView = datesView
        this.temperaturesView = temperaturesView
        this.typeHistoryPagePart = typeHistoryPagePart
    }

    override fun onResponse(call: Call<MultipleRecordResponse>, response: Response<MultipleRecordResponse>) {
        val records = response.body()!!.record!!

        records.forEachIndexed {i, record ->
            if (typeHistoryPagePart == "temperature"){
                temperaturesView[i].text = record.temperature!! + "ºC"
            } else {
                temperaturesView[i].text = record.humidity!! + "%"
            }

            datesView[i].text = record.date!!.replace("\n", "")
        }
    }

    override fun onFailure(call: Call<MultipleRecordResponse>, t: Throwable) {
//        TODO("Not yet implemented")
          println(t.message)
    }
}