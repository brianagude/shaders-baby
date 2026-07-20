// Author: Briana Gude
// Title:

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  st.x*=u_resolution.x/u_resolution.y;
  // st.y=u_mouse.x;
  
  vec3 color=vec3(0.);
  color=vec3(st.x,st.y,abs(cos(u_time)));
  
  gl_FragColor=vec4(color,1.);
}