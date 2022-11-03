// Bibiliotecas do sensor de temperatura e umidade
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>
// Bibiliotecas para conexão com o wifi e requisições HTTP
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

#define DHT_PIN 4
#define DELAY_MS 5000
// Define as variáveis de acesso ao wi-fi
#define WIFI_SSID "Nostradamus"
#define WIFI_PASSWORD "zigur@t3"

// Define o código da placa e a url base da api
String const CODE = "12345678";
String const API_BASE_URL = "https://termostato.programame.dev";

// Configura o sensor DHT
DHT dht(DHT_PIN, DHT11);
// Configura o cliente HTTP para realizar as requisições
WiFiClient client;
HTTPClient http;

/// Obtém os dados de temperatura e umidade do sensor
std::tuple<float, float> getSensorData()
{
    float temperature = dht.readTemperature();
    float humidity = dht.readHumidity();

    return {temperature, humidity};
}

/// Faz login na API e retorna o Token JWT correspondente
String login() {
    StaticJsonDocument<400> response;

    http.begin(client, API_BASE_URL + "/api/login");
    http.addHeader("content-type", "application/json");

    String payload = "{\"arduinoCode\": " + CODE + "}";
    int responseCode = http.POST(payload);

    if (responseCode != HTTP_CODE_OK) {
        return "";
    }

    String responseBody = http.getString();
    http.end();

    DeserializationError error = deserializeJson(response, responseBody);
    if (error) {
        return "";
    }

    String tokenType = response["result"]["type"];
    String token = response["result"]["token"];

    return tokenType + " " + token;
}

/// Faz a requisição para realizar a criação de um novo registro
/// de temperatura
void createRecord(float temperature, float humidity, String token) {
    http.begin(client, API_BASE_URL + "/api/arduino");
    http.addHeader("content-type", "application/json");
    http.addHeader("Authorization", token);

    String payload = "{}";
    int responseCode = http.POST(payload);
    if (responseCode != HTTP_CODE_OK) {
        return;
    }

    http.end();
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
        delay(100);
    }
}

void loop()
{
    auto [temperature, humidity] = getSensorData();

    String token = login();
    if (token == "") {
        return;
    }

    createRecord(temperature, humidity, token);

    delay(DELAY_MS);
}