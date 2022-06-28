// npm install tronweb
// node D:\wamp64\www\ossn\actions\trx.js
//   npm install tronweb --save


const TronWeb = require('tronweb')

const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers: { "TRON-PRO-API-KEY":'506b99aa-89e1-4cc3-b864-98a5fa591c02' }
    
})
for(i=0;i<10;i++)
{
    console.log( tronWeb.createAccount())
}

 

// promise=tronWeb.createAccount()
// promise.then(function(value) {
//     console.log(reason)
// }).catch(function(reason) {
//     console.log(reason)
// })


