const DISCORD_URI_ENDPOINT = 'https://discord.com/api/oauth2/authorize';
const CLIENT_ID = encodeURIComponent('1028594481588604938');
const RESPONSE_TYPE = encodeURIComponent('token');
const REDIRECT_URI = encodeURIComponent(chrome.identity.getRedirectURL());
const SCOPE = encodeURIComponent('identify email');
const STATE = encodeURIComponent('meet' + Math.random().toString(36).substring(2, 15));

console.log(chrome.identity.getRedirectURL)

let user_signed_in = false;

function create_auth_endpoint() {
    let nonce = encodeURIComponent(Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));

    let endpoint_url =
        `${DISCORD_URI_ENDPOINT}
?client_id=${CLIENT_ID}
&redirect_uri=${REDIRECT_URI}
&response_type=${RESPONSE_TYPE}
&scope=${SCOPE}
&nonce=${nonce}`;

    return endpoint_url;
}


chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'login') {
        chrome.identity.launchWebAuthFlow({
            url: create_auth_endpoint(),
            interactive: true
        }, function (redirect_uri) {
            if (chrome.runtime.lastError || redirect_uri.includes('access_denied')) {
                console.log("Could not authenticate.");
                sendResponse('fail');
            } else {
                user_signed_in = true;
                sendResponse('success');
            }
        });

        return true;
    } else if (request.message === 'logout') {
        user_signed_in = false;

        sendResponse('success');
    }
});


chrome.runtime.onInstalled.addListener(onInstalled);
async function onInstalled() {
  const result = await fetch(`https://api.securityforeveryone.com/api/scans/list`, {
  headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
  }
})
const data = await result.json();
console.log(data);
  
}
   //update session
  chrome.runtime.onUpdateAvailable.addListener( hasUpdate );
  function hasUpdate( e ) {
      console.log( 'hasUpdate', e );
      chrome.runtime.reload();
  }







   /*
  chrome.runtime.onInstalled.addListener(() => {
    console.log("onInstalled...");
 
    async function startRequest() {
        const response = await fetch("https://api.securityforeveryone.com/api/scans/list", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
      const data = await response.json(),
      console.log(data),
    }
  };

  });

async function startRequest()  {
    
    const response = await fetch("https://api.securityforeveryone.com/api/scans/list", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
        const data = await response.json()
        console.log(data)

    
}








  chrome.runtime.onInstalled.addListener(onInstalled);
  function onInstalled() {
    console.log("background.js onInstalled")

    chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension have been successfully installed!");
  });
    
  }
*/