// Bibiliotecas do sensor de temperatura e umidade
#include <ArduinoJson.h>
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
// Bibiliotecas para conexão com o wifi e requisições HTTP
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define DHT_PIN 4
#define DELAY_MS 5000
// Define as variáveis de acesso ao wi-fi
#define WIFI_SSID "Nostradamus"
#define WIFI_PASSWORD "zigur@t3"

// Define o código da placa e a url base da api
String const CODE = "123456";
String const API_BASE_URL = "https://termostato.programame.dev";

// Configura o sensor DHT
DHT dht(DHT_PIN, DHT11);

/// Obtém os dados de temperatura e umidade do sensor
std::tuple<float, float> getSensorData()
{
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    return {temperature, humidity};
}

/// Faz login na API e retorna o Token JWT correspondente
String login()
{
    WiFiClientSecure client;
    HTTPClient http;
    StaticJsonDocument<384> response;

    String endpoint = API_BASE_URL + "/api/auth";
    String payload = "{\"arduinoCode\": " + CODE + "}";

    client.setInsecure();  // Desabilita validação de certificado
    // <std::string>.c_str() converte uma std::string para char*
    http.begin(client, endpoint.c_str());
    http.addHeader("content-type", "application/json");

    int httpCode = http.POST(payload.c_str());
    if (httpCode >= 400) {
        return "";
    }

    String body = http.getString();
    http.end();

    DeserializationError error = deserializeJson(response, body);
    if (error) {
        return "";
    }

    return response["result"];
}

void setup()
{
    Serial.begin(115200);
    delay(100);

    // Inicializa o sensor de temperatura e de umidade
    dht.begin();

    // Inicializa o wi-fi
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(1000);
    }

    Serial.println();
    Serial.println("Wi-Fi Conectado");
}

void loop()
{
    auto [temperature, humidity] = getSensorData();

    String token = login();
    if (token == "") {
        return;
    }

    Serial.println(token);

    delay(DELAY_MS);
}