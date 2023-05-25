#include <WiFi.h>
#include <ESPAsyncWebSrv.h>
#include <Arduino.h>
#include <SPIFFS.h>

const char* ssid = "SANTY";
const char* password = "caracoles123";

AsyncWebServer server(80);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  conectarse();

  server.on("/estacionamiento", HTTP_GET, [](AsyncWebServerRequest *request){
    //Abrir archivo HTML
    File archivo = SPIFFS.open("/index.html");
    if(!SPIFFS.begin(true)){
     Serial.println("An Error has occurred while mounting SPIFFS");
     return;
    }
    //Saber si se lee o no el HTML
    if(!archivo){
      request->send(404, "text/plain", "Archivo no encontrado");
    } else{
      
      String html;
      
      while (archivo.available()) {
        html += archivo.readString();
      }
      archivo.close();
      //Enviar la respuesta a la pagina HTML al cliente
      request->send(200, "text/html", html);
      
    }
  });
  
  server.begin();  
}

void loop() {
  // put your main code here, to run repeatedly:
}

//Saber si se conectó o no a la red
void conectarse(){
  WiFi.begin(ssid, password);
  Serial.println("Estableciendo conexión con SSID "+String(ssid));  

  while(WiFi.status() != WL_CONNECTED){
    delay(1000);
    Serial.println(".");
  }  
  Serial.print("Conectado a la red con dirección ip: ");
  Serial.print(WiFi.localIP());
}

