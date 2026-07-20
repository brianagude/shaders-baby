#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float box(vec2 st,vec4 dim){
  float b=step(dim.x,st.x);
  float l=step(dim.y,st.y);
  float t=step(dim.z,1.-st.x);
  float r=step(dim.w,1.-st.y);
  
  return b*l*t*r;
}

float outline(vec2 st,vec4 dim,float thickness){
  return box(st,dim)-box(st,dim+thickness);
}

void main(){
  vec2 st=gl_FragCoord.xy/u_resolution.xy;
  vec3 color=vec3(.925,.870,.834);
  
  vec3 red=vec3(.755,.001,.139);
  vec3 yellow=vec3(.900,.778,0.);
  vec3 blue=vec3(0.,0.,1.);
  vec3 black=vec3(0.,0.,0.);
  
  float sq1=outline(st,vec4(-.1,.6,-.1,.15),.02);
  float sq2=outline(st,vec4(.3,-.1,.05,-.1),.02);
  float sq3=outline(st,vec4(.7,-.1,-.05,-.1),.02);
  float sq4=outline(st,vec4(-.5,.6,.835,-.1),.02);
  float sq5=outline(st,vec4(.3,-.1,-.68,.8),.02);
  float box1=box(st,vec4(0.,.6,.7,0.));
  float box2=box(st,vec4(.95,.6,0.,0.));
  float box3=box(st,vec4(.7,0.,0.,.8));
  
  color=mix(color,red,box1);
  color=mix(color,yellow,box2);
  color=mix(color,blue,box3);
  color=mix(color,black,sq1);
  color=mix(color,black,sq2);
  color=mix(color,black,sq3);
  color=mix(color,black,sq4);
  color=mix(color,black,sq5);
  
  gl_FragColor=vec4(color,1.);
}
