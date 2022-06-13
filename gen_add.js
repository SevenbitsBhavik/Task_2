const ethers = require("ethers");
const con = require("/home/asus/Desktop/Project 2/databse.js")

const mnemonic = require("./config/mnemonic") ;
    
let i=0;
async function generateAddresss(){
    while(i<100){    
            const path = require("./config/mnemonicPath")
            let mnemonicPath =  path+i;
            const wallet = ethers.Wallet.fromMnemonic(mnemonic,mnemonicPath);
            console.log(wallet.address);
            // con.query("insert into addresses(address, privatekey, publickey) values(?,?,?)",[await wallet.address, await wallet.privateKey, await wallet.publicKey]) 
            i++;
        }
}
generateAddresss()
