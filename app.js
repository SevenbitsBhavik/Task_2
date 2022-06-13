// const { result } = require("lodash");
const Web3 = require("web3") 
const {infuraLink} = require("./config/infura");
console.log(infuraLink);
const web3 = new Web3(new Web3.providers.HttpProvider(infuraLink))
const con = require("/home/asus/Desktop/Project 2/databse.js")

   
async function main(){
	const latest = await web3.eth.getBlockNumber();
	console.log(latest);
	con.query("Select id from blocks ORDER BY id DESC LIMIT 1",async function (err,result){
		last_id = Number(result[0].id)
		// console.log(abc +1)
		for(var b=last_id+1;b<=latest;b++){
			console.log(b)
			block = await web3.eth.getBlock(b)
			let process = 0;
			let transactions = await block.transactions;
			for(var i=0;i<transactions.length;i++)
			{
				let toadd = "";
				try{
					trn = await web3.eth.getTransaction(transactions[i])
					toadd = await trn.to;
				}
				catch(e){
					console.log("error occured at transaction :" + i + transactions[i]);
				}
				console.log(block.timestamp)
				if(toadd != undefined){
					console.log(toadd);
					await con.query("select address from addresses where address = ?",[toadd],async function (err, result) {
						if(err){
							console.log(err)
						}
						console.log(result);
						if(result.length>0){
							let sql = "select * from blocks where id ="+block.number;
							console.log(block.number)
							date_time = block.timestamp
							con.query(sql, function(err, rows, fields) {
								if(rows.length>0){
									process = rows[0].process + 1
									con.query("update blocks set process="+ process + " where id="+block.number)
								}
							});
							console.log("!")
							con.query("insert into transactions(id, transaction_hash, from_address, to_address, amount) values(?,?,?,?,?)",[trn.nonce, trn.hash, trn.from, toadd, trn.value])
							
						}
					});
				}
			}
			console.log("...................")
			con.query("insert into blocks(id, block_hash, parent_hash, process) values(?,?,?,?)",[block.number, block.hash, block.parentHash, process])
		// Block insertion
		}
	})
}










function unixTime(){
	var myDate = new Date( 1654492184 *1000);
	console.log(myDate.toLocaleString());
}
var abc = []

async function getLastBlockidfromDatabase(){
	let lastBlockId ; 
	let xyz = [];
	con.query("Select id from blocks ORDER BY id DESC LIMIT 1",function ab(err,result){
		// console.log(result[0].id)
		xyz = result;
		// xyz = await result[0].id;
		// ret = JSON.stringify(result)
		// console.log(ret);
		// var json =  await JSON.parse(ret);
		// lastBlockId = await (json[0].id)
		// console.log(lastBlockId)
		// return(result[0].id)
	})	
}
// 	ab()
// 	console.log(xyz)
// 	// return(result[0].id)
// 	console.log(await xyz)
// }
// getLastBlockidfromDatabase();
// console.log(abc)
// async function abc(){
// 	abc = await getLastBlockidfromDatabase()
// 	console.log(abc)
// }
// abc()
// console.log(abc)


main();
