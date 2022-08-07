function bin2hex (s) {
    chars99='0123456789abcdef'
    s99=""
    for(i=0;i<s.length-3;i=i+4)
    {

      //  console.log("cur idx:"+i)
        cur4lenStr=s.substr(i,4)

    
      //  console.log(cur4lenStr)
         
        s99=s99+chars99.charAt('0b'+cur4lenStr);
      //  console.log( chars99.charAt('0b'+cur4lenStr))
        
    }
    return s99;
     
  }


console.log(Math.round(Math.random())); 

//获取128位数字
function get128bitNum()
{
  var  s=""
    for(i=0;i<128;i++){
        n=Math.round(Math.random())   //当前随机数0 or 1
    s=s+n;
    }
    return s;
}


console.log(get128bitNum())
//console.log(bin2hex(s))

function hex2bin(h)
{
    var s=""
   for(ch99 of h){
    s=s+hex2bin_single(ch99)
   }
    return s;
}

function hex2bin_single(h)
{
    var x = h;//这是一个十六进制的字符串表示
    var y=parseInt(x, 16);//十六进制转为十进制
    var z=y.toString(2);//十进制转为2进制
    if(z.length==3)
      return '0'+z
      if(z.length==2)
      return '00'+z
      if(z.length==1)
      return '000'+z
      if(z.length==4)
      return z;
}


console.log(hex2bin('1bc'));

console.log(parseInt('01101001110',2))