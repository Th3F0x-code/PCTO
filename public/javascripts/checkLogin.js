var loginBtn = document.getElementById('logo-container');

//functions that check if cookies are setted: in that case if they're setted go to logged.html otherwise
//stay in notlogged.html and do the login
//function checkCookies(){if(document.cookie.indexOf('loggedin=true') !== -1) redirect('success.html'); }

//function that redirect to the specified page
function redirect(page) {window.location.href = page; }

//function that set cookies when the user do the login
function setCookie(cookieName, value,  expireDate) {document.cookie = `${cookieName}=${value}; expires=${expireDate}`; }

let isMetaMask = Boolean(window.ethereum);

//if metamask is not installed change the sentence of the login button
if(!isMetaMask) document.getElementById('text-login').innerHTML = "Please <b><a style='text-decoration: underline; cursor: pointer;' href='https://metamask.io/'>install MetaMask</a></b> to use <b>Krypto-Medical</b>";

else{
    document.getElementById('text-login').innerHTML = "<b>Connect </b>your MetaMask wallet by </span><b>clicking the icon</b> below"

    loginBtn.addEventListener('click' , async () => {
        
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' }); //get the user's account by the connection
        //to metamask
        let account = accounts[0];

        var data = {
            loggedin: true,
            account: account
        }
    
        //set cookies
        let expiredate = new Date("Februari 10, 2099").toUTCString();
        setCookie("loggedin", data.loggedin, expiredate);
        setCookie("account", data.account, expiredate);
        redirect('success.html');

    });
}