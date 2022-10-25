// Biblioteca padrão do ESP 8266 para conectar no Wi-fi
#include <ESP8266WiFi.h>
// Biblioteca usada para fazer requisições HTTP
#include <Fetch.h>

const char* ssid = "";
const char* password = "";
const char* url = "https://termostato.programame.dev/api/arduino";

void setup() {
    Serial.begin(115200);

    delay(100);

    // Inicia a conexão wi-fi
    WiFi.begin(ssid, password);

    // Aguarda até que o Wi-fi esteja conectado, aguardando 1 segundo
    // entre cada tentativa
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
    }
}

void loop() {
    // Cria um objeto options para controlar as opções HTTP
    RequestOptions options;
    // Define o método da requisição como GET
    options.method = "GET";

    // Faz a requisição na API
    Response res = fetch(url, options);
    if (res.status < 400) {
        // Checa se a requisição falhou
        Serial.print("Requisição falhou com status:");
        Serial.print(res.status);
        Serial.println();

        return;
    }

    // Obtém o corpo da resposta e o printa na serial
    String body = res.text();

    Serial.println(body);

    delay(1000);
}
