var btn_loginMetamask = document.getElementById("btn-loginMetamask");
//funzione che controlla se metmask è installato nel browser e lo ritorna come un booleano
function MetaMaskInstallato(){ return Boolean(window.ethereum); }
//funzione che controlla se l'account dell'utente è connesso dopo aver effettuato la connessione con metamask
function UtenteConnesso(accounts){ return accounts && accounts.length > 0;}

//se metamask non è installato fai apparire un alert
//if(!MetaMaskInstallato()) alert("MetaMask non presente, devi installarlo per utilizzare la nostra dApp");


async function loginToMetaMask(){

    if(MetaMaskInstallato()){
    //mi connetto a metamask
        await ethereum.request({ method: "eth_requestAccounts" })
        //ricarica la pagina nel caso la chain sia cambiata
        ethereum.on("chainChanged", () => window.location.reload());
        
        //quando un utente si connette stampo l'indirizzo dell'account per verificare se è giusto
        await ethereum.on("accountsChanged", (accounts) => {
            if (UtenteConnesso(accounts)) {
                console.log(`Usando account con indirizzo:  ${accounts[0]}.`);
            }
            else console.log("Nessun account collegato.");
            
        });

        
        //l'indirizzo dell'account e il credito disponibile
        //console.log("Account: " + account + "\n" + "Balance: " + balance);
        
        //Possibile messaggio che può comparire da parte di MetaMask
        ethereum.on("message", (message) => alert(message));

        //Controllo avvenuta connessione
        ethereum.on("connect", (info) => {
            console.log(`Connesso alla rete:  ${info}.`);
        });

        //Controllo disconnessione
        ethereum.on("disconnect", (error) => {
            console.log(`Disconnesso dalla rete, errore:  ${error}.`);
        });


        let data = {
            isLoggedIn: true,
            account: ethereum.selectedAddress,
        };
    

        await fetch("http://localhost:3000/api/LoggedPage", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },     
        });
        
    }
    else
        alert("Installa MetaMask per utilizzare la nostra dApp");
};



btn_loginMetamask.addEventListener("click", loginToMetaMask);

