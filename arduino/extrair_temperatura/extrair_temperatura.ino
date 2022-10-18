// Inclui as bibliotecas necessárias
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

// Código mockado da placa, será enviado para a API para cadastrar o arduino
// e no JSON de temperatura
#define DELAY_MS 30000
#define ID_PLACA 12345678
// Precisa ser um pino PWM (4 -> Pino D2 do node mcu)
#define PINO_DHT 4

float temperatura;
float umidade;

// Configura o pino dht, instanciando um novo
// objeto
DHT dht(PINO_DHT, DHT11);

void setup()
{
    Serial.begin(115200);

    // Inicializa o sensor de temperatura e de umidade
    dht.begin();
}

void loop()
{
    temperatura = dht.readTemperature();

    Serial.print("Temperatura: ");
    Serial.print(temperatura);
    Serial.println();

    umidade = dht.readHumidity();

    Serial.print("Umidade: ");
    Serial.print(umidade);
    Serial.println();

    delay(DELAY_MS);
}