function checkCookies(){if(document.cookie.indexOf('loggedin=true') !== -1) redirect('donazioni.html'); }

function redirect(page){window.location.href = page; }

checkCookies();