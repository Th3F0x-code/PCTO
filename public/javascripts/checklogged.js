//function that check if the user is logged in
function isConnected() {return Boolean(window.ethereum.selectedAddress !== null); }

//function that redirect to the specified page
function redirect(page) {window.location.href = page; }

//function that always are listening for the events
function events() {
    //event handling
    window.ethereum.on('chainChanged', handleChainChanged);

    window.ethereum.on('accountsChanged', handleAccountChanged);

    window.ethereum.on('disconnect', handleDisconnect);
}

//function that set cookies when the user do the login
function setCookie(cookieName, value,  expireDate) {document.cookie = `${cookieName}=${value}; expires=${expireDate}`; }

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

//function that handle the chain changed event reloading the page
function handleChainChanged(){window.location.reload(); }

//function that handle the account changed event checking if he changed account or if he disconnected
function handleAccountChanged() {
    if(isConnected()) {

        let account = window.ethereum.selectedAddress;
        let data = {
            loggedin: true,
            account: account
        }

        let expiredate = new Date("Februari 10, 2099").toUTCString();

        setCookie("loggedin", data.loggedin, expiredate);
        setCookie("account", data.account, expiredate);
    }
    else handleDisconnect(); 
 };

 //function that delete the cookies and redirect to the notlogged.html
function handleDisconnect(){
    delCookie("loggedin");
    delCookie("account");
    redirect('index.html');
}

//function that check for the existence of the cookie so if the user del
async function handleDeleteCookie(){
    if(getCookie("loggedin") != "true" || getCookie("account") != ethereum.selectedAddress) {
        delCookie("loggedin");
        delCookie("account");
        redirect('index.html');
    }
}

events();

if(window.ethereum.selectedAddress !== null) setInterval(handleDeleteCookie, 500);