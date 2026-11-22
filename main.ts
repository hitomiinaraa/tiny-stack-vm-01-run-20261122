import{readFileSync as A,writeFileSync as B,mkdirSync as C}from"node:fs";
function V(p,q){
let s=new Int32Array(257),m=new Int32Array(256),d=[],y=[],sp=0,pc=0,n=0,i=0,a,b,v,t;
for(;;){
if(n>999999)return[y,10];
if(pc<0||pc>=p.length)return[y,9];
let k=p[pc],L=k==1?1:k==2?4:k>47&&k<52?2:0,j=pc+1+L;
if(k>7&&!(k>15&&k<35&&k!=31)&&!(k>47&&k<53)&&k!=64&&k!=65&&!(k>79&&k<84))return[y,5];
if(j>p.length)return[y,9];
n++;pc=j;
if(!k)return[y,0];
if(k==1||k==2){
if(sp>255)return[y,3];
s[sp++]=k==1?(v=p[pc-1])>127?v-256:v:p[pc-4]|p[pc-3]<<8|p[pc-2]<<16|p[pc-1]<<24;
}else if(k==3){
if(sp<1)return[y,2];sp--;
}else if(k==4){
if(sp<1)return[y,2];if(sp>255)return[y,3];s[sp]=s[sp-1];sp++;
}else if(k==5){
if(sp<2)return[y,2];v=s[sp-1];s[sp-1]=s[sp-2];s[sp-2]=v;
}else if(k==6){
if(sp<2)return[y,2];if(sp>255)return[y,3];s[sp]=s[sp-2];sp++;
}else if(k==7){
if(sp<3)return[y,2];v=s[sp-3];s[sp-3]=s[sp-2];s[sp-2]=s[sp-1];s[sp-1]=v;
}else if(k==23||k==27){
if(sp<1)return[y,2];s[sp-1]=k==23?-s[sp-1]:~s[sp-1];
}else if(k>15&&k<35){
if(sp<2)return[y,2];b=s[--sp];a=s[sp-1];
if(k>18&&k<23&&!b)return[y,4];
s[sp-1]=k==16?a+b:k==17?a-b:k==18?Math.imul(a,b):k==19?a/b|0:k==20?a%b:k==21?(a>>>0)/(b>>>0)|0:k==22?(a>>>0)%(b>>>0)|0:k==24?a&b:k==25?a|b:k==26?a^b:k==28?a<<b:k==29?a>>b:k==30?(a>>>b)|0:k==32?a==b?1:0:k==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;
}else if(k<51){
v=p[pc-2]|p[pc-1]<<8;if(v>32767)v-=65536;
if(k==48)pc+=v;
else{if(sp<1)return[y,2];a=s[--sp];if((k==49)===(a==0))pc+=v;}
}else if(k==51){
if(d.length>63)return[y,7];d.push(pc);pc=p[pc-2]|p[pc-1]<<8;
}else if(k==52){
if(!d.length)return[y,8];pc=d.pop();
}else if(k==64){
if(sp<1)return[y,2];a=s[sp-1];if(a<0||a>255)return[y,6];s[sp-1]=m[a];
}else if(k==65){
if(sp<2)return[y,2];a=s[--sp];b=s[--sp];if(a<0||a>255)return[y,6];m[a]=b;
}else if(k==80){
if(sp<1)return[y,2];t=""+s[--sp];if(y.length+t.length>65536)return[y,11];for(v of t)y.push(v.charCodeAt(0));
}else if(k==81){
if(sp<1)return[y,2];if(y.length>65535)return[y,11];y.push(s[--sp]&255);
}else if(k==82){
if(sp>255)return[y,3];s[sp++]=i<q.length?q[i++]:-1;
}else{
if(sp<1)return[y,2];return[y,s[--sp]&255];
}
}
}
for(let n=1;n<41;n++){
let g="i"+("00"+n).slice(-3),r=V(A("/input/"+g+"/program.bin"),A("/input/"+g+"/input.bin"));
C("/output/"+g,{recursive:true});B("/output/"+g+"/stdout.bin",Buffer.from(r[0]));B("/output/"+g+"/exit.txt",""+r[1]);
}
