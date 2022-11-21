package com.example.project_pi.config

import android.content.Context
import android.net.wifi.WifiManager
import android.provider.Settings.Secure

class Config {
    companion object {
        fun getApiUrl(): String {
            return "https://termostato.programame.dev/api/"
        }

        fun getAndroidId(ctx: Context): String {
            return Secure.getString(ctx.contentResolver, Secure.ANDROID_ID)
        }
    }
}