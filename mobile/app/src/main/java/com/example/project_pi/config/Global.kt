package com.example.project_pi.config

import android.app.Application
import com.example.project_pi.dataclasses.Arduino

class Global : Application() {
    companion object {
        private var jwtToken: String = ""
        private var arduinos: List<Number> = listOf()

        fun setToken(token: String) {
            this.jwtToken = token.trim()
        }

        fun getToken(): String {
            return this.jwtToken
        }

        fun setArduinos(newArduinos: Array<Arduino>) {
            newArduinos.map { arduino ->
                this.arduinos += arduino.code!!
            }
        }

        fun getArduinos(): Array<Number> {
            return this.arduinos.toTypedArray()
        }
    }

    override fun onCreate() {
        super.onCreate()
    }
}
