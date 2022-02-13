
//file lato server che servirà per il deploy del contratto

//indirizzo del contratto che verrà usato
const address = "0x437BCBE25c243Fa6F5E03cAC6E7e8fe4678C67E6";
const bytecode = "0x1604eF136dBBD95AD8b9B97C1a5Da7B1Ca50Cd1b";

const Web3 = require('web3');
const Ethereum_Tx = require('ethereumjs-tx').Transaction;

const web3 = new Web3();
web3.setProvider(web3.givenProvider || 'ws://localhost:8545');


//abi del contratto che verrà usato
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "requested",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "available",
				"type": "uint256"
			}
		],
		"name": "InsufficientBalance",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Sent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balances",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minter",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "send",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];


function transazione(){


	//credito disponibile
	const balance = ethereum.request({ 
		method: "eth_getBalance", 
		params: [accounts[0] , "latest"],
	});



    //se l'utente è connesso allora mostro il bottone per la transazione
    if(UtenteConnesso(account)){

        loginButton.style.display = "none";
        transazione_btn.style.display = "block";

        const deploy_contratto = Web3.eth.Contract(JSON.parse(abi));
        const payload = {
            data: bytecode,
        };

        let params = {
            from: account,
            gas: 8000000,
            gasPrice: web3.utils.toWei('0.1', 'ether'),
        };

        //creo il contratto
        deploy_contratto.deploy(payload).send(params, (error, transactionHash) => {
            if(error) console.log(error);
            else console.log(transactionHash);
        }).on("confirmation", () => {}).then((newContractInstance) => {
            alert("Contratto deployato: ", newContractInstance.options.address);
        }).catch((err) => {
            console.log("Qualcosa è andato storto nel deploy del contratto.");
        });

    }
};

//da finire 

