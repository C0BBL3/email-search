"use strict";
(() => {
  const url = 'http://localhost:3333';
  // const url = 'https://www.mathacademy.com';

  const version = 5;
  
  // src/extension.js
  var loaderId = setInterval(() => {
    if (!window._gmailjs) {
      return;
    }
    clearInterval(loaderId);
    startExtension(window._gmailjs);
  }, 100);

  function startExtension(gmail) {
    console.log("Extension loading...");
    window.gmail = gmail;
    gmail.observe.on("load", () => {
      const userEmail = gmail.get.user_email();
      console.log("Hello, " + userEmail + ". This is your extension talking!");
      gmail.observe.on("view_email", (domEmail) => {
        console.log("Looking at email:", domEmail);
        const emailData = gmail.new.get.email_data(domEmail);
        console.log("Email data:", emailData);
        console.log("Email from:", emailData.from.address);

        const adminPublicKey = 'pk_atest_abcdefghijklmnopqrstuvwxyz12345678'; // dummy key
            
        getUser(adminPublicKey, emailData.from.address).then((user) =>
          console.log(user)
        )
      });
      gmail.observe.on("compose", (compose) => {
        console.log("New compose window is opened!", compose);
      });
    });
  }

  async function getUser (adminPublicKey, email) {
    try {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Strict-Transport-Security': "max-age=31536000",
        'Admin-Public-API-Key': adminPublicKey,
      };

      // const res = await chrome.runtime.sendMessage(
      //   {
      //     contentScriptQuery: "GET",
      //     url: `${url}/api/beta${version}/admin/user/${email}`,
      //     headers
      //   },
      //   (response) => {
      //     console.log(response);
      //     if (response != undefined && response != "") {
      //       callback(response);
      //     }
      //     else {
      //       callback(null);
      //     }
      //   }
      // );

      const res = await fetch(`${url}/api/beta${version}/admin/user/${email}`, { method: 'GET', headers });
      console.log(res);
      return (await res.json());
    } catch (error) {
      let res = 'Error fetching user: ';
      res += JSON.stringify(error.response ? error.response.data : error.message);
      return res;
    }
  };
})();
//# sourceMappingURL=extension.js.map
