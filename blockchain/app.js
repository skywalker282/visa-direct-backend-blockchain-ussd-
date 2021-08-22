const Block = require("./block");
const Blockchain = require("./blockchain");
const Transaction = require("./transaction");

let frankasCoin = new Blockchain();

// console.log("Mining block 1 ...");
// frankasCoin.createBlock(
//   new Block(1, "10/07/2017", { transferID: 236032345320134, amount: 34500.001 })
// );

// console.log("Mining block 2 ...");
// frankasCoin.createBlock(
//   new Block(2, "23/08/2017", {
//     transferID: 431132323003000,
//     amount: 100800.002,
//   })
// );

// console.log("Mining block 3 ...");
// frankasCoin.createBlock(
//   new Block(3, "30/09/2017", { transferID: 231032345334201, amount: 4500.02 })
// );

// console.log(frankasCoin.testValidity());

frankasCoin.createTransaction(new Transaction("000012", "230005", 340));
frankasCoin.createTransaction(new Transaction("340000", "315672", 1000));
frankasCoin.createTransaction(new Transaction("111034", "345620", 520));

console.log("\n Starting the miner");
frankasCoin.minePendingTransactions("300049");

console.log(
  "Balance of Cris Cirhuza is",
  frankasCoin.getAdressBalance("300049")
);

console.log("\n Starting the miner");
frankasCoin.minePendingTransactions("300049");

console.log(
  "Balance of Cris Cirhuza is",
  frankasCoin.getAdressBalance("300049")
);

console.log(JSON.stringify(frankasCoin.chain));
