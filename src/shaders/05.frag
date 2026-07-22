// Author: Briana Gude
// Title: Creative Coding - July 22

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0;
uniform vec2 u_tex0Resolution;

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  
  float canvasAspect=u_resolution.x/u_resolution.y;
  float imageAspect=u_tex0Resolution.x/u_tex0Resolution.y;
  vec2 uv=st;

  if(canvasAspect>imageAspect){
    uv.y=(uv.y-.5)*(imageAspect/canvasAspect)+.5;
  }else{
    uv.x=(uv.x-.5)*(canvasAspect/imageAspect)+.5;
  }
  
  vec3 color=texture2D(u_tex0,uv).rgb;
  
  gl_FragColor=vec4(color,1.);
}
