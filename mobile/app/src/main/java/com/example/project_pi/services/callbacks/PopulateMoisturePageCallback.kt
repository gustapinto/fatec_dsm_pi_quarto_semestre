package com.example.project_pi.services.callbacks

import android.widget.TextView
import com.example.project_pi.dataclasses.MultipleRecordResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class PopulateMoisturePageCallback : Callback<MultipleRecordResponse> {
    private val componentsView: Array<TextView>
    private val datesViews: Array<TextView>

    constructor(componentsView : Array<TextView>, datesViews: Array<TextView>){
        this.componentsView = componentsView
        this.datesViews = datesViews
    }

    override fun onResponse(call: Call<MultipleRecordResponse>, response: Response<MultipleRecordResponse>) {
        val records = response.body()!!.record!!

        records.forEachIndexed {i, record ->
            componentsView[i].text = record.humidity!! + "%"

            if (i > 0) { // Pula o primeiro registro pois ele não exibe data, somente o valor
                this.datesViews[i-1].text = record.date!!
            }
        }
    }

    override fun onFailure(call: Call<MultipleRecordResponse>, t: Throwable) {
        TODO("Not yet implemented")
    }
}