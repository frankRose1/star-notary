# Star Notary Decentralized App

This dapp allows users to notarize(own) a star if it isn't owned by anyone yet. Once a user creates/owns a star they can list it for sale. Users can also buy stars from other ethereum addresses. This project uses the ERC721 interface as each star represents a Non-Fungible Token.

## Details

    - truffle version: 5.1.8
    - OpenZeppelin version: 2.4.0
    - ERC-721 Token Name: Star Notary Token
    - ERC-721 Token Symbol: STN
    - Token Address on the Rinkeby Network: PENDING

## Instructions

    - You will need an ethereum wallet such as Metamask in order to run this locally
    - Download or clone this repo
    - npm install
    1) To run the backend
        - ```truffle develop``` to start a development console
           - import at least two of the test accounts to Metamask
        - In the dev console run the following commands
            - ```compile``` to compile solidity contracts
            - ```migrate --reset``` or migrating the contract to the locally running Ethereum network
            - ```test``` to run the test suites
    2) To run the frontend
        - open another terminal and ```cd /app```
        - ```npm run dev``` to start the client side app on a local server
