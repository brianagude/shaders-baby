#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  vec3 color=vec3(0.);
  
  float b=step(.4,st.x);
  float l=step(.1,st.y);
  float t=step(.4,1.-st.x);
  float r=step(.1,1.-st.y);
  
  float pct=b*l*t*r;
  
  color=vec3(pct);
  
  gl_FragColor=vec4(color,1.);
}