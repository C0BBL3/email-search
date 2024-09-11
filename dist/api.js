"use strict";

(() => {
      // src/api.js
    async function getUser (adminPublicKey, email) {
        adminPublicKey = 'pk_atest_abcdefghijklmnopqrstuvwxyz12345678'; // dummy key

        try {
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Strict-Transport-Security': "max-age=31536000",
                'Admin-Public-API-Key': adminPublicKey,
            };

            // const res = await chrome.runtime.sendMessage(
            //     {
            //         contentScriptQuery: "GET",
            //         url: `${url}/api/beta${version}/admin/user/${email}`,
            //         headers
            //     },
            //     (response) => {
            //         console.log(response);
            //         if (response != undefined && response != "") {
            //             callback(response);
            //         }
            //         else {
            //             callback(null);
            //         }
            //     }
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