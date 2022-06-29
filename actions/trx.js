// npm install tronweb
// node D:\wamp64\www\ossn\actions\trx.js
//   npm install tronweb --save


const TronWeb = require('tronweb')

const tronWeb = new TronWeb({
    fullHost: 'https://api.trongrid.io',
    headers: { "TRON-PRO-API-KEY":'506b99aa-89e1-4cc3-b864-98a5fa591c02' }
    
})
// for(i=0;i<10;i++)
// {
//     console.log( tronWeb.createAccount())
// }


//     headers: { "TRON-PRO-API-KEY":'506b99aa-89e1-4cc3-b864-98a5fa591c02' } 

async function start() {
     

        const TronWeb = require('tronweb')

        const tronWeb = new TronWeb({
            fullHost: 'https://api.trongrid.io',
         
            
        })
      
        wltadd='TCx2hGiHnZEhGX9zbLPch6fqg5h5mAaKv3'
        tronWeb.setAddress(wltadd);  //set owner addr
      //  console.log( tronWeb)
  
        //get balnce
        contractAddress='TVWpn7Gd65MZpWUZHGDWVzibnJEBvHfA5p'
        contract = await tronWeb.contract().at(contractAddress);
        rzt= await contract.balanceOf(wltadd).call();   //owner_address isn't set.
       console.log( (rzt.toString()) )  //bignumber




 }
 start()

 setTimeout(() => {
    console.log('ffff')
    
 }, 9000);
// promise=tronWeb.createAccount()
// promise.then(function(value) {
//     console.log(reason)
// }).catch(function(reason) {
//     console.log(reason)
// })


 //     rzt=await tronWeb.trx.getAccount('TCx2hGiHnZEhGX9zbLPch6fqg5h5mAaKv3')  //ok include balcnce  ,,but loks ony trx asset bal

// rzt= tronWeb.trx.getTokensIssuedByAddress(wltadd)   //empty



 //rzt= tronWeb.trx.getContract(wltadd)  //empty

        // read trc20 account balance
// let contract = await tronWeb.contract().at("TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"); 
// let result = await contract.balanceOf('TZ13rQk53DDvK2pR4nfBLyuYTR4EGAFBwT').call();
    //   console.log( contract)
     // TVWpn7Gd65MZpWUZHGDWVzibnJEBvHfA5p     piso token

     //tronWeb.trx.getBalance(CONTRACT_ADDRESS);
       // let rzt =await tronWeb.trx.getBalance('TCx2hGiHnZEhGX9zbLPch6fqg5h5mAaKv3');   //only trx bls
   
         //204354300