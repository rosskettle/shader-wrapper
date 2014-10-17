precision mediump float;

uniform vec2 uResolution;
uniform float uComponentValue;
uniform int uComponent;
const   int cX = 0;
const   int cY = 1;
const   int cZ = 2;

void main(void) {

	float X = 50.0 / 100.0;
	float Y = 50.0 / 100.0;
	float Z = 50.0 / 100.0;

	float R = X *  3.2406 + Y * -1.5372 + Z * -0.4986;
	float G = X * -0.9689 + Y *  1.8758 + Z *  0.0415;
	float B = X *  0.0557 + Y * -0.2040 + Z *  1.0570;

	if (R > 0.0031308)
	  R = 1.055 * pow(R, 1.0 / 2.4) - 0.055;
	else
	  R = 12.92 * R;

	if (G > 0.0031308)
	  G = 1.055 * pow(G, 1.0 / 2.4) - 0.055;
	else
	  G = 12.92 * G;

	if (B > 0.0031308)
	  B = 1.055 * pow(B, 1.0 / 2.4) - 0.055;
	else
	  B = 12.92 * B;
	gl_FragColor = vec4(R, G, B, 1.0);
}


/*
var_X = X / 100        //X from 0 to  95.047      (Observer = 2°, Illuminant = D65)
var_Y = Y / 100        //Y from 0 to 100.000
var_Z = Z / 100        //Z from 0 to 108.883

var_R = var_X *  3.2406 + var_Y * -1.5372 + var_Z * -0.4986
var_G = var_X * -0.9689 + var_Y *  1.8758 + var_Z *  0.0415
var_B = var_X *  0.0557 + var_Y * -0.2040 + var_Z *  1.0570

if ( var_R > 0.0031308 )
  var_R = 1.055 * ( var_R ^ ( 1 / 2.4 ) ) - 0.055
else
  var_R = 12.92 * var_R

if ( var_G > 0.0031308 )
  var_G = 1.055 * ( var_G ^ ( 1 / 2.4 ) ) - 0.055
else
  var_G = 12.92 * var_G

if ( var_B > 0.0031308 )
  var_B = 1.055 * ( var_B ^ ( 1 / 2.4 ) ) - 0.055
else
  var_B = 12.92 * var_B

R = var_R * 255
G = var_G * 255
B = var_B * 255
*/