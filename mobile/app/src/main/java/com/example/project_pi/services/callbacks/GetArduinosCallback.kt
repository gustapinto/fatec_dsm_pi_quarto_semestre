package com.example.project_pi.services.callbacks

import android.widget.TextView
import com.example.project_pi.ArduinosParser
import com.example.project_pi.RetrofitInitializer
import com.example.project_pi.config.Global
import com.example.project_pi.dataclasses.ConnectionsResponse
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class GetArduinosCallback : Callback<ConnectionsResponse> {
    private val field: TextView

    constructor(field: TextView) {
        this.field = field
    }

    override fun onResponse(call: Call<ConnectionsResponse>, response: Response<ConnectionsResponse>) {
        val arduinos = response.body()!!.arduinos!!
        val arduinosCodes = ArduinosParser.getCodesFromArduinos(arduinos)

        while (Global.getToken() == "") {
            println("Awaiting")
            Thread.sleep(500)
        }

        RetrofitInitializer()
            .thermostatService()
            .getLastRecord(arduinosCodes, Global.getToken())
            .enqueue(GetLastRecordCallback(this.field))
    }

    override fun onFailure(call: Call<ConnectionsResponse>, t: Throwable) {
        TODO("Not yet implemented")
    }
}