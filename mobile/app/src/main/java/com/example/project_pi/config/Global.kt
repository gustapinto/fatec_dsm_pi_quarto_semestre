package com.example.project_pi.config

import android.app.Application

class Global : Application() {
    companion object {
        private var jwtToken: String = ""

        fun setToken(token: String) {
            this.jwtToken = token.trim()
        }

        fun getToken(): String {
            return this.jwtToken
        }
    }

    override fun onCreate() {
        super.onCreate()
    }
}
