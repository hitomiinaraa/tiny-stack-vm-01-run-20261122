import{readFileSync as A,writeFileSync as B,mkdirSync as C}from"node:fs";
function V(p,q){
let s=new Int32Array(256),m=[],d=[],y=[],sp=0,pc=0,n=0,i=0,a,b,v,t,X,Z,U=(x,y)=>{if(sp<x)throw 2;if(y&&sp>255)throw 3};
try{for(;;){
if(n>=1e6)throw 10;
let k=p[pc],L=[0,1,4][k]||(k>47&&k<52?2:0),j=pc+1+L;
if(pc>>>0>=p.length||j>p.length)throw 9;
n++;pc=j;
if(!k)throw 0;
if(k==1||k==2){
U(0,1);
s[sp++]=k==1?(p[pc-1]<<24)>>24:p.readInt32LE(pc-4)
}else if(k==3){
U(1);sp--
}else if(k==4){
U(1,1);s[sp++]=s[sp-2]
}else if(k==5){
U(2);v=s[sp-1];s[sp-1]=s[sp-2];s[sp-2]=v
}else if(k==6){
U(2,1);s[sp++]=s[sp-3]
}else if(k==7){
U(3);[s[sp-3],s[sp-2],s[sp-1]]=[s[sp-2],s[sp-1],s[sp-3]]
}else if(k==23||k==27){
U(1);s[sp-1]=-s[sp-1]-(k>23)
}else if(k>15&&k<35&&k!=31){
U(2);b=s[--sp];a=s[sp-1];X=a>>>0;Z=b>>>0;
if(!b&k>18&k<23)throw 4;
s[sp-1]=k==16?a+b:k==17?a-b:k==18?Math.imul(a,b):k==19?a/b|0:k==20?a%b:k==21?X/Z|0:k==22?X%Z|0:k==24?a&b:k==25?a|b:k==26?a^b:k==28?a<<b:k==29?a>>b:k==30?(a>>>b)|0:k==32?+(a==b):k==33?+(a<b):+(X<Z)
}else if(k>47&&k<51){
v=p.readInt16LE(pc-2);
if(k==48)pc+=v;else{U(1);a=s[--sp];if((k==49)==!a)pc+=v}
}else if(k==51){
if(d.length>63)throw 7;d.push(pc);pc=p.readUInt16LE(pc-2)
}else if(k==52){
if(!d.length)throw 8;pc=d.pop()
}else if(k==64){
U(1);a=s[sp-1];if(a>>>0>255)throw 6;s[sp-1]=m[a]||0
}else if(k==65){
U(2);a=s[--sp];b=s[--sp];if(a>>>0>255)throw 6;m[a]=b
}else if(k==80){
U(1);t=""+s[--sp];if(y.length+t.length>65536)throw 11;y.push(...Buffer.from(t))
}else if(k==81){
U(1);if(y.length>65535)throw 11;y.push(s[--sp]&255)
}else if(k==82){
U(0,1);s[sp++]=q[i++]??-1
}else if(k==83){
U(1);throw s[--sp]&255
}else throw 5
}}catch(e){return[y,e|0]}
}
let e=process.env,I=e.MAKEFUN_INPUT_DIR||"/input",O=e.MAKEFUN_OUTPUT_DIR||"/output";
for(let n=1;n<41;n++){
let g="i"+("00"+n).slice(-3),r=V(A(I+"/"+g+"/program.bin"),A(I+"/"+g+"/input.bin")),o=O+"/"+g;
C(o,{recursive:true});B(o+"/stdout.bin",Buffer.from(r[0]));B(o+"/exit.txt",""+r[1]);
}
