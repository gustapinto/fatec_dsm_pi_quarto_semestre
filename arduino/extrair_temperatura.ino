// Inclui as bibliotecas necessárias
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

// Código mockado da placa, será enviado para a API para cadastrar o arduino
// e no JSON de temperatura
#define ID_PLACA = 12345678;

int pino_dht = 3; // Precisa ser um pino PWM
int pino_led_temp = 2;
int pino_led_umid = 4;

float temperatura;
float umidade;

// Configura o pino dht
DHT_Unified dht(pino_dht, DHT11);

void pisca_led(int led) {
    digitalWrite(led, HIGH);
    delay(1000);
    digitalWrite(led, LOW);
    delay(1000);
}

void setup()
{
    pinMode(pino_led_temp, OUTPUT);
    pinMode(pino_led_umid, OUTPUT);

    Serial.begin(9600);

    // Inicializa o sensor de temperatura e de umidade
    sensor_t sensor;

    dht.begin();
    dht.temperature().getSensor(&sensor);
    dht.humidity().getSensor(&sensor);
}

void loop()
{
    // Inicializa o evento de medição de temperatura e umidade
    sensors_event_t event;

    // Faz a leitura da temperatura
    dht.temperature().getEvent(&event);

    if (!isnan(event.temperature)) {
        temperatura = event.temperature;

        Serial.print("Temperatura: ");
        Serial.print(temperatura);
        Serial.println();

        pisca_led(pino_led_temp);
    }

    // Faz a leitura da umidade
    dht.humidity().getEvent(&event);

    if (!isnan(event.relative_humidity)) {
        umidade = event.relative_humidity;

        Serial.print("Umidade: ");
        Serial.print(umidade);
        Serial.println();

        pisca_led(pino_led_umid);
    }

    // Coleta dados de 30 em 30 segundos
    delay(30000);
}