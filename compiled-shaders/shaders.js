var shaders = {
  hsv:     [
    'precision mediump float;',
    
    'uniform vec2 uResolution;',
    'uniform float uValue;',
    'uniform int uChannel;',
    'const   int cH = 0;',
    'const   int cS = 1;',
    'const   int cV = 2;',
    
    'void main(void) {',
    
    '   float x = 1.0 / uResolution.x * gl_FragCoord.x;',
    '   float y = 1.0 / uResolution.y * gl_FragCoord.y;',
    
    '   if (uChannel == cH) {',
    '      H = uValue;',
    '      S = x;',
    '      V = y;',
    '   } else if (uChannel == cS) {',
    '      H = x;',
    '      S = uValue;',
    '      V = y;',
    '   } else if (uChannel == cV) {',
    '      H = x;',
    '      S = y;',
    '      V = uValue;',
    '   }',
    
    '   float sector = H * 6.0;',
    '   if (sector == 6.0)',
    '     sector = 0.0;',
    
    '   float side = floor(sector);',
    '   float f = sector - side;',
    
    '   float var_1 = V * (1.0 - S);',
    '   float var_2 = V * (1.0 - S * (sector - side));',
    '   float var_3 = V * (1.0 - S * (1.0 - (sector - side)));',
    
    '   vec3 rgb;',
    
    '   if (side == 0) {',
    '     rgb.r = V;',
    '     rgb.g = var_3;',
    '     rgb.b = var_1;',
    '   } else if (side == 1) {',
    '     rgb.r = var_2;',
    '     rgb.g = V;',
    '     rgb.b = var_1;',
    '   } else if (side == 2) {',
    '     rgb.r = var_1;',
    '     rgb.g = V;',
    '     rgb.b = var_3;',
    '   } else if (side == 3) {',
    '     rgb.r = var_1;',
    '     rgb.g = var_2;',
    '     rgb.b = V;',
    '   } else if (side == 4) {',
    '     rgb.r = var_3;',
    '     rgb.g = var_1;',
    '     rgb.b = V;',
    '   } else {',
    '     rgb.r = V;',
    '     rgb.g = var_1;',
    '     rgb.b = var_2;',
    '   }',
    '   gl_FragColor = vec4(rgb, 1.0);',
    '}'
    ].join('\n'),
  rgb:     [
    'precision mediump float;',
    'uniform vec2 uResolution;',
    'uniform float uValue;',
    'uniform int uChannel;',
    'const   int cR = 0;',
    'const   int cG = 1;',
    'const   int cB = 2;',
    
    'void main(void) {',
    '  float x = 1.0 / uResolution.x * gl_FragCoord.x;',
    '  float y = 1.0 / uResolution.y * gl_FragCoord.y;',
    '  vec3 rgb;',
    '  if (uChannel == cR) {',
    '    rgb.r = uValue;',
    '    rgb.g = x;',
    '    rgb.b = y;',
    '  } else if (uChannel == cG) {',
    '    rgb.r = x;',
    '    rgb.g = uValue;',
    '    rgb.b = y;',
    '  } else if (uChannel == cB) {',
    '    rgb.r = x;',
    '    rgb.g = y;',
    '    rgb.b = uValue;',
    '  gl_FragColor = vec4(rgb, 1.0);',
    '}'
    ].join('\n'),
  xyz:     [
    'precision mediump float;',
    
    'uniform vec2 uResolution;',
    'uniform float uComponentValue;',
    'uniform int uComponent;',
    'const   int cX = 0;',
    'const   int cY = 1;',
    'const   int cZ = 2;',
    
    'void main(void) {',
    
    '	float X = 50.0 / 100.0;',
    '	float Y = 50.0 / 100.0;',
    '	float Z = 50.0 / 100.0;',
    
    '	float R = X *  3.2406 + Y * -1.5372 + Z * -0.4986;',
    '	float G = X * -0.9689 + Y *  1.8758 + Z *  0.0415;',
    '	float B = X *  0.0557 + Y * -0.2040 + Z *  1.0570;',
    
    '	if (R > 0.0031308)',
    '	  R = 1.055 * pow(R, 1.0 / 2.4) - 0.055;',
    '	else',
    '	  R = 12.92 * R;',
    
    '	if (G > 0.0031308)',
    '	  G = 1.055 * pow(G, 1.0 / 2.4) - 0.055;',
    '	else',
    '	  G = 12.92 * G;',
    
    '	if (B > 0.0031308)',
    '	  B = 1.055 * pow(B, 1.0 / 2.4) - 0.055;',
    '	else',
    '	  B = 12.92 * B;',
    '	gl_FragColor = vec4(R, G, B, 1.0);',
    '}',
    
    
    '/*',
    'var_X = X / 100        //X from 0 to  95.047      (Observer = 2°, Illuminant = D65)',
    'var_Y = Y / 100        //Y from 0 to 100.000',
    'var_Z = Z / 100        //Z from 0 to 108.883',
    
    'var_R = var_X *  3.2406 + var_Y * -1.5372 + var_Z * -0.4986',
    'var_G = var_X * -0.9689 + var_Y *  1.8758 + var_Z *  0.0415',
    'var_B = var_X *  0.0557 + var_Y * -0.2040 + var_Z *  1.0570',
    
    'if ( var_R > 0.0031308 )',
    '  var_R = 1.055 * ( var_R ^ ( 1 / 2.4 ) ) - 0.055',
    'else',
    '  var_R = 12.92 * var_R',
    
    'if ( var_G > 0.0031308 )',
    '  var_G = 1.055 * ( var_G ^ ( 1 / 2.4 ) ) - 0.055',
    'else',
    '  var_G = 12.92 * var_G',
    
    'if ( var_B > 0.0031308 )',
    '  var_B = 1.055 * ( var_B ^ ( 1 / 2.4 ) ) - 0.055',
    'else',
    '  var_B = 12.92 * var_B',
    
    'R = var_R * 255',
    'G = var_G * 255',
    'B = var_B * 255',
    '*/'
    ].join('\n'),
  lab:     [
    'precision mediump float;',
    
    'uniform vec2 uResolution;',
    'uniform float uComponentValue;',
    'uniform int uComponent;',
    'const   int cL = 0;',
    'const   int cA = 1;',
    'const   int cB = 2;',
    
    'void main(void) {',
    '	float L = 80.0;',
    '	float a = 80.0;',
    '	float b = 80.0;',
    
    '	float Y = ( L + 16.0 ) / 116.0;',
    '	float X = a / 500.0 + Y;',
    '	float Z = Y - b / 200.0;',
    
    '	if (pow(Y, 3.0) > 0.008856)',
    '	  Y = pow(Y, 3.0);',
    '	else',
    '	  Y = (Y - 16.0 / 116.0) / 7.787;',
    
    '	if (pow(X, 3.0) > 0.008856)',
    '	  X = pow(X, 3.0);',
    '	else',
    '	  X = (X - 16.0 / 116.0) / 7.787;',
    
    '	if (pow(Z, 3.0) > 0.008856)',
    '	  Z = pow(Z, 3.0);',
    '	else',
    '      Z = (Z - 16.0 / 116.0) / 7.787;',
    
    '	float R = X *  3.2406 + Y * -1.5372 + Z * -0.4986;',
    '	float G = X * -0.9689 + Y *  1.8758 + Z *  0.0415;',
    '	float B = X *  0.0557 + Y * -0.2040 + Z *  1.0570;',
    
    '	if (R > 0.0031308)',
    '	  R = 1.055 * pow(R, 1.0 / 2.4) - 0.055;',
    '	else',
    '	  R = 12.92 * R;',
    
    '	if (G > 0.0031308)',
    '	  G = 1.055 * pow(G, 1.0 / 2.4) - 0.055;',
    '	else',
    '	  G = 12.92 * G;',
    
    '	if (B > 0.0031308)',
    '	  B = 1.055 * pow(B, 1.0 / 2.4) - 0.055;',
    '	else',
    '	  B = 12.92 * B;',
    
    '	gl_FragColor = vec4(R, G, B, 1.0);',
    '}'
    ].join('\n')
}