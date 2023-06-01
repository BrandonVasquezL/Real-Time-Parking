#include <WiFi.h>
#include <ESPAsyncWebSrv.h>
#include <Arduino.h>
#include <SPIFFS.h>

const char* ssid = "SANTY";
const char* password = "caracoles123";

AsyncWebServer server(80);

void setup() {
  Serial.begin(115200);
  conectarse();

  server.on("/estacionamiento", HTTP_GET, [](AsyncWebServerRequest* request) {
    if (!SPIFFS.begin(true)) {
      Serial.println("An Error has occurred while mounting SPIFFS");
      return;
    }

    String path = request->url();
    if (path != "/estacionamiento" && path != "/index.html") {
      request->send(404, "text/plain", "Página no encontrada");
      return;
    }

    File archivo = SPIFFS.open("/index.html");

    if (!archivo) {
      request->send(404, "text/plain", "Archivo no encontrado");
    } else {
      String html;
      while (archivo.available()) {
        html += archivo.readString();
      }
      archivo.close();
      request->send(200, "text/html", html);
    }
  });

  server.onNotFound([](AsyncWebServerRequest* request) {
    if (request->url() == "/favicon.ico") {
      request->send(404);  // Ignorar el caso del favicon
    } else {
      request->send(404, "text/plain", "Favicon error");
    }
  });

  server.begin();
}

void loop() {
  // Tu código principal aquí (si lo tienes)
}

void conectarse() {
  WiFi.begin(ssid, password);
  Serial.println("Estableciendo conexión con SSID " + String(ssid));

  unsigned long inicioConexion = millis();

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.print(".");

    if (millis() - inicioConexion > 10000) {
      Serial.println("\nError: No se pudo establecer la conexión WiFi.");
      return;
    }
  }

  Serial.println("\nConectado a la red con dirección IP: " + WiFi.localIP().toString());
}