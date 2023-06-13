#include <Servo.h>
#include <LiquidCrystal_I2C.h>


#define sensor A0

Servo servo1;
 
LiquidCrystal_I2C lcd(0x27, 20, 4);
const int Trigger = 11;
const int Echo = 12;
int humedad = 0;

int luz = 0;


void setup() {
lcd.init();
lcd.backlight();
lcd.setCursor(1, 0);
servo1.attach(9);
Serial.begin(9600);//iniciailzamos la comunicación
pinMode(Trigger, OUTPUT); //pin como salida
pinMode(Echo, INPUT);  //pin como entrada
digitalWrite(Trigger, LOW);//Inicializamos el pin con 0
servo1.write(180);
}
void loop() {
  long t; //timepo que demora en llegar el eco
  long d; //distancia en centimetros
  
  int luz = analogRead(A1);
  int humedad = map(analogRead(sensor), 0, 1023, 100, 0);
  
  digitalWrite(Trigger, HIGH);
  delayMicroseconds(10);          //Enviamos un pulso de 10us
  digitalWrite(Trigger, LOW);
  
  t = pulseIn(Echo, HIGH); //obtenemos el ancho del pulso
  d = t/59;  //escalamos el tiempo a una distancia en cm

  lcd.setCursor(1,0);
  lcd.print("D: ");
  
  lcd.print(d);      //Enviamos serialmente el valor de la distancia
  lcd.print("cm");

  lcd.setCursor(1,1);
  lcd.print("H: ");
  lcd.print(humedad);
  lcd.print("% "); 
  lcd.print("L: ");
  lcd.print(luz);
  
  delay(500); 
  lcd.clear();

  if (d < 25 || luz > 400){
    servo1.write(0);
  }


  else{
    servo1.write(180);
  }


  
  }
