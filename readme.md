# Star Notary Decentralized App

This dapp allows users to notarize(own) a star if it isn't owned by anyone yet. Once a user creates/owns a star they can list it for sale. Users can also buy stars from other ethereum addresses. This project uses the ERC721 interface as each star represents a Non-Fungible Token.

## Instructions

    - Download or clone this repo
    - npm install
    1) To run the backend
        - ```truffle develop``` to start a development console
        - In the dev console run the following commands
            - ```compile``` to compile solidity contracts
            - ```migrate --reset``` or migrating the contract to the locally running Ethereum network
            - ```test``` to run the test suites
    2) To run the frontend
        - open another terminal and ```cd /app```
        - ```npm run dev``` to start the client side app on a local server
