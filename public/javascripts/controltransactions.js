var btn_causale = document.getElementById('btn-causale');
var notvalidparameters = document.getElementById('notvalidparameters');

const contractAddress = "0x56BaE4933CCa54207Dc1afb960fcB8cdd8EFDD35";
let abi = {};

web3 = new Web3(ethereum);

//function that check if the user is logged in
function isConnected() {
    return Boolean(window.ethereum.selectedAddress !== null);
}

//function that redirect to the specified page
function redirect(page) {
    window.location.href = page;
}

//functions taht returns the abi of the contract making a get request that returns the abi of the contract
async function getAbiContract() {
    await fetch("http://localhost:3000/api/v1/getabi")
        .then((res) => res.json())
        .then((data) => {
            abi = data.abi;
        })
        .catch((error) => {
            console.log(error);
        });
}

//function that handle the chain changed event reloading the page
function handleChainChanged() {
    window.location.reload();
}

//function that handle the account changed event checking if he changed account or if he disconnected
function handleAccountChanged() {
    if (isConnected()) {

        let account = window.ethereum.selectedAddress;
        let data = {
            loggedin: true,
            account: account
        }

        let expiredate = new Date("Februari 10, 2099").toUTCString();

        setCookie("loggedin", data.loggedin, expiredate);
        setCookie("account", data.account, expiredate);
    } else handleDisconnect();
};

//function that delete the cookies and redirect to the notlogged.html
function handleDisconnect() {
    delCookie("loggedin");
    delCookie("account");
    redirect('notlogged.html');
}

//function that always are listening for the events
function events() {
    //event handling
    window.ethereum.on('chainChanged', handleChainChanged);

    window.ethereum.on('accountsChanged', handleAccountChanged);

    window.ethereum.on('disconnect', handleDisconnect);
}

//function that set cookies when the user do the login
function setCookie(cookieName, value, expireDate) {
    document.cookie = `${cookieName}=${value}; expires=${expireDate}`;
}

//function to get the cookie to check if is setted
const getCookie = (name) => {
    return document.cookie.split('; ').reduce((r, v) => {
        const parts = v.split('=')
        return parts[0] === name ? decodeURIComponent(parts[1]) : r
    }, '');
}

//function to delete cookies
function delCookie(cookiename, sPath, sDomain) {
    document.cookie = encodeURIComponent(cookiename) +
        "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
        (sDomain ? "; domain=" + sDomain : "") +
        (sPath ? "; path=" + sPath : "");
}


events();

//function that init the transaction where you can send ethereum to the contract
//choosing the reason for the donation the string will be passed in input to the function of the contract
//and automatically the contract send the money to the wallet dedicated to the specific reason choiced
btn_causale.addEventListener('click', async function () {

    //get the reason for the donation and the amount of the donation
    var reason = document.getElementById('sel_donatore').value;
    var quantityOfEthereum = document.getElementById('quantita').value.toString();

    //check for non valid parameter passed
    if (reason === "-- Dona Per --" || quantityOfEthereum === "") notvalidparameters.innerText = "Non hai inserito alcuni parametri correttamente, riprova";

    else {
        notvalidparameters.innerText = "";
        //converting the quantity in ethereum in wei and adding a "0x" to let understand metamask that i'm passing a hexadecimal number
        let quantityInWei = BigNumber(quantityOfEthereum).multipliedBy(10 ** 18);

        //getting the address of the person by the cookie
        //doing this because when the user is redirected to the logged page i can't access the account address with the web3 functions
        const fromAddress = window.ethereum.selectedAddress;

        await getAbiContract();

        //setting up the contract with his address and abi
        var myContract = new web3.eth.Contract(abi, contractAddress);

        //sendig the transaction to the contract with the address of the person, the reason for the donation and the amount of the donation

        console.log(reason);
        await myContract.methods.inviare(reason).send({
            from: fromAddress,
            to: contractAddress,
            value: "0x" + quantityInWei.toString(16),
            gas: "50000"
        }).then(function (result) {
            console.log(result);
        });

        console.log("kill me");
    }
});
