var amount;
var reach;
var chooseReason;
let finishAnimation = false;
//logic part of the app

var btn_confirm = document.getElementById('btn-confirm');
var notvalidparameters = document.getElementById('notvalidparameters');

const contractAddress = "0x956CE9DA7Ef96f66d87349920c5A06cF3C2a6AaD";
let abi = {};

web3 = new Web3(ethereum);

//web3_provider = new Web3.providers.WebsocketProvider("wss://ws-mumbai.matic.today/");

//function that wait wuntil the variable becomes true, used for the final animation of the donation
const waitUntil = (condition) => {
  return new Promise((resolve) => {
    let interval = setInterval(() => {
      if (!condition()) return
      clearInterval(interval)
      resolve()
    }, 100)
  });
}

//do a get request that sends the entire Donation.json file and take only the abi
async function getAbiContract() {
  await fetch("https://krypto-medical.herokuapp.com/api/v1/getabi")
    .then((res) => res.json())
    .then((data) => { abi = data.abi; })
    .catch((error) => { console.log(error); });
}

//once a transaction is done call this function that set the data of the transaction into a json file 
async function setDataForTable(addressf, reasonf, amountf) {
  let time_elapsed = new Date().toUTCString();
  
  let dataForTable = {
    address: addressf,
    reason: reasonf,
    amount: amountf,
    time: time_elapsed
  }

  await fetch("https://krypto-medical.herokuapp.com/api/v1/setdatafortable", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForTable),
  });

}

//function that init the transaction where you can send ethereum to the contract
//choosing the reason for the donation the string will be passed in input to the function of the contract
//and automatically the contract send the money to the wallet dedicated to the specific reason choiced
btn_confirm.addEventListener('click', async function () {

  //get the reason for the donation and the amount of the donation
  var reason = chooseReason;
  var quantityOfEthereum = amount;

  //converting the quantity in ethereum in wei and adding a "0x" to let understand metamask that i'm passing a hexadecimal number
  let quantityInWei = BigNumber(quantityOfEthereum).multipliedBy(10 ** 18);

  //getting the address of the person by the cookie
  //doing this because when the user is redirected to the logged page i can't access the account address with the web3 functions
  const fromAddress = window.ethereum.selectedAddress;

  await getAbiContract();
  //setting up the contract with his address and abi
  var Contract = new web3.eth.Contract(abi, contractAddress);

  //da implementare getter per la lettura dei dati dal contratto, poi è finito
  
  //sendig the transaction to the contract with the address of the person, the reason for the donation and the amount of the donation
  await Contract.methods.sendc(reason).send({
    from: fromAddress,
    to: contractAddress,
    value: "0x" + quantityInWei.toString(16),
    gas: "300000"
  }).then(async (response) => {

    finishAnimation = true;

    var topdonor = await Contract.methods.readtopdonor().call();
    var topdonated = await Contract.methods.readtopdonated().call();
    var totaldonation = await Contract.methods.readtotaldonation().call();

    topdonated = BigNumber(topdonated).dividedBy(10 ** 18);
    totaldonation = BigNumber(totaldonation).dividedBy(10 ** 18);
    
    let data = {
      topdonor: topdonor,
      topdonated: topdonated,
      totaldonation: totaldonation
    }

    //setting the data of the stats in the json file
    await fetch("https://krypto-medical.herokuapp.com/api/v1/setstats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    await setDataForTable(fromAddress, reason, quantityOfEthereum);
  })
  .catch((err => { console.log(err); }));

});
