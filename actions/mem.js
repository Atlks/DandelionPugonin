


//   npm install bip39     npm install ethereum-hdwallet
//  node.exe D:\wamp64\www\ossn\actions\mem.js

const bip39 = require('bip39')
//const HDWallet = require('ethereum-hdwallet');
//生成英文助记词
const mnemonic = bip39.generateMnemonic();  
// const mnemonic = bip39.generateMnemonic(128, null, bip39.wordlists.chinese_simplified); //生成中文助记词

console.log('助记词：' + mnemonic); //生成助记词







  async function example2() {
  
    const hdWallet = require('tron-wallet-hd');
    
    const utils=hdWallet.utils;
    
    const accounts = await utils.generateAccountsWithMnemonic(mnemonic,1);
    console.log(accounts)

  }


async function example() {
    //  tonMnemonic =require('tonweb-mnemonic')  ;
    tonMnemonic.wordlists.EN;
    // -> array of all words

    
    await tonMnemonic.mnemonicToSeed(mnemonic);
    // -> Uint8Array(32) [183, 90, 187, 181, .. ]

    const keyPair = await tonMnemonic.mnemonicToKeyPair(mnemonic);
    // -> {publicKey: Uint8Array(32), secretKey: Uint8Array(64)}

    toHexString(keyPair.publicKey);
    // -> "8c8dfc9f9f58badd76151775ff0699bb2498939f669eaef2de16f95a52888c65"

   console.log(toHexString(keyPair.secretKey) ) 
   
}

//example()
example2()
// async function getAddress(mnemonic) {

// 	const seed = await bip39.mnemonicToSeed(mnemonic); //生成种子

// 	const hdwallet = HDWallet.fromSeed(seed);

// 	for (var i = 0; i < 10; i++) { // 用同一个种子生成多个地址

// 		console.log('=============地址' + (i + 1) + '=================')

// 		const key = hdwallet.derive("m/44'/195'/0'/0/" + i); // 地址路径的最后一位设置为循环变量
// 		console.log("PrivateKey = " + key.getPrivateKey().toString('hex')); // 私钥
// 		console.log("PublicKey = " + key.getPublicKey().toString('hex')); // 公钥
// 		const EthAddress = '0x' + key.getAddress().toString('hex'); //地址
// 		console.log('ETH Address = ' + EthAddress);
// 	}
// }

// getAddress(mnemonic); //执行函数