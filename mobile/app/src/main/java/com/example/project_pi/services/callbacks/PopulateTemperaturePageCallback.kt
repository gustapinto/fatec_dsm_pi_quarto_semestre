package com.example.project_pi.services.callbacks

import android.view.View
import android.widget.ImageView
import android.widget.TextView
import com.example.project_pi.dataclasses.MultipleRecordResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import java.time.LocalDate

class PopulateTemperaturePageCallback : Callback<MultipleRecordResponse> {
    private val componentsView: Array<TextView>
    private val datesViews: Array<TextView>
    private val componentsIconsTemp: Array<ImageView>

    constructor(componentsView: Array<TextView>, datesViews: Array<TextView>, componentsIconsTemp: Array<ImageView>) {
        this.componentsView = componentsView
        this.datesViews = datesViews
        this.componentsIconsTemp = componentsIconsTemp
    }

    override fun onResponse(call: Call<MultipleRecordResponse>, response: Response<MultipleRecordResponse>) {
        val records = response.body()!!.record!!

        records.forEachIndexed { i, record ->
            this.componentsView[i].text = record.temperature!! + " ºC"

            if (i > 0) { // Pula o primeiro registro pois ele não exibe data, somente o valor
                this.datesViews[i-1].text = record.date!! // "i-1" pois o array de datas é menor
            }
        }
    }

    override fun onFailure(call: Call<MultipleRecordResponse>, t: Throwable) {
        TODO("Not yet implemented")
    }
}