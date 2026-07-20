#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  vec3 color=vec3(0.);
  
  vec2 bl=smoothstep(vec2(.05),vec2(.15),st);
  vec2 tr=smoothstep(vec2(.05),vec2(.15),1.-st);
  
  float pct=bl.x*bl.y*tr.x*tr.y;
  
  color=vec3(pct);
  
  gl_FragColor=vec4(color,1.);
}