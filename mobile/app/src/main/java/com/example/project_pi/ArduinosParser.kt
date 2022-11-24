package com.example.project_pi

import com.example.project_pi.dataclasses.Arduino

class ArduinosParser {
    companion object {
        fun getCodesFromArduinos(arduinos: Array<Arduino>): Array<Number> {
            var codes: List<Number> = listOf()

            arduinos.forEach { arduino ->
                codes += arduino.code!!
            }

            return codes.toTypedArray()
        }
    }
}