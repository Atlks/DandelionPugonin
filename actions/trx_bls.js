
//  npm install tronweb
//  npm install request
// C:\Program Files\nodejs\node.exe
// node.exe D:\wamp64\www\ossn\actions\trx_bls.js

// const privateKey = "..."; 
// var address = "TM2TmqauSEiRf16CyFgzHV2BVxBejY9iyR"; 
// //查询一个账号的信息，通过返回值中的balance得到余额。
//  tronWeb.trx.getAccount(
//       address,
// ).then(output => {console.log('- Output:', output, '\n');});


// curl - X POST  https://api.shasta.trongrid.io/wallet/getaccount -d 
// '{"address": "TM2TmqauSEiRf16CyFgzHV2BVxBejY9iyR",
// "visible": true
//      }'


// const { exec } = require("child_process");
//  exec("cat index.js", (error, data, getter) => {
//      if (error) { console.log("error", error.message); return;
//      } 
//      if (getter) { console.log(" data", data); 

/**
 * 
 * 
 * const { exec } = require('child_process');
command="dir"
exec(command, 
    function(error, stdout, stderr){ console.log(stdout); }
    )


 */


    //npm install api --save
 
// npm install ajv --save


/*
    const sdk = require('api')('@tron-cn/v4.5.1#5063zl4fayuhn');

sdk['get-account-info-by-address']({address: 'TBETEgkqNJHc6ACW942quMkw6afzb8Vnqy'})
  .then(res => console.log(res))
  .catch(err => console.error(err));
  //   { data: [], success: true, meta: { at: 1656348492674, page_size: 1 } }
  */


     const sdk = require('api')('@tron-cn/v4.5.1#2eyyc2il3wlb567');
sdk['account-getaccount']({address: 'TBETEgkqNJHc6ACW942quMkw6afzb8Vnqy', "visible": true })
  .then(res => console.log(res))
  .catch(err => console.error(err));
  console.log(333333)
    
   setTimeout(() => {
      console.log('fff')
   }, 9000);


   /*

const { exit } = require('process');
    var request = require('request');
const { timer } = require('rxjs');
    //wallet_getAccountBalance
// 'https://api.shasta.trongrid.io/wallet/getaccount'
    var mainapi="https://api.trongrid.io/wallet/getaccount"
        mainapi='https://api.trongrid.io/wallet/getaccountx'

      //   mainapi='https://api.trongrid.io/wallet/triggerconstantcontract'
console.log(mainapi)
    var options = {
        headers: {"TRON-PRO-API-KEY": "506b99aa-89e1-4cc3-b864-98a5fa591c02",'Content-Type' :'application/json' },
        url: mainapi,
        method: 'POST',
        json:true,
        body: {
            "address": "TBETEgkqNJHc6ACW942quMkw6afzb8Vnqy",
            "visible": true
        }
    };


request.post(
    
    options
   ,
    function (error, response, body) {
      //  console.log(body)
        console.log(1111111111)
        if(error)
        {
            console.log(333333)
            console.log(error)
        }
         else {
            console.log(666666)
            console.log(body);
        }
    }
);

*/


