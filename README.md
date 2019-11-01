# Rocket: a new way of bidding, selling or bidding on the blockchain

Smart Contracts are applications that run on the Ethereum virtual machine. That is nothing other than a decentralized `world computer` in which` each node of the Ethereum Blockchain` provides their computational power to sustain the network (Blockchain).

There are many ways to put your `Smart-Contracts` on one of the publicly available networks of Ethereum; you can download ethereum Wallet for developers and upload it by that means, use remix ethereum, you can also use a framework called truffle or other ways, such as configuring an api Web3 (for developers with good command in these tools).

### Details

In this project we present a tender where we hope to find someone who offers a smaller amount for carrying out the project, so that the token in this particular case symbolizes the offer we are willing to pay.

### Authors
       Francisco Rosales.s
       John Barrera.

## Project environment  
### Tools
- `node`:
- `npm`:
- `metamask`:
- `truffle`:
- `geth ethereum`:
- `ganache-cli`:
- `git`:

### Project Structure

    $ tree roulette
    roulette/
    ├── .git	: git
    ├── app	: Directory, where all the logic of the project, we call
    |         the Smart Contracts and design the views.
    ├── build	: File to run in production.
    ├── contracts	: Directory of Solidity contracts.
    ├── migrations	: Directory of script implementation files.
    ├── test	: Directory of test files to test your application and contracts.
    ├── node_modules	: Node components
    ├── truffle.js	: Truffle configuration file.
    └── webpack.config.js	: Instance configuration file and plugins for our project.
    └── README.md	: Default README file.


### Architecture of a DApp
  ![Match function](https://user-images.githubusercontent.com/7105645/46321326-4d7cc400-c5a8-11e8-9091-0c16e5f6a9a0.png)

## Deploying Our Project
### Work Environment Preparation

- This project was developed in ubuntu 16, however the OS should not be inconvenient for their deployment.
- Initialize the terminal and update the ubuntu dependencies with the following commands:
  ```git
    $ sudo apt-get upgrade
    $ sudo apt-get update
  ```
- Install node version 8 or higher.
  ```git
    $ sudo apt-get install curl
    $ curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
    $ sudo apt-get install -y nodejs
  ```
- Install truffle
  ```git
    $ sudo npm install -g truffle@4.1.13
  ```
- In your browser install [MetaMask][Metamask] (to run Smart Contracts)
  ![Match function](https://user-images.githubusercontent.com/7105645/46318508-5f586a00-c59c-11e8-8889-4e2a71f16cd4.PNG)

- Install an Ethereum node on your computer, so you can use it locally.

There are 2 ways using `ganache-cli`, to simulate an ethereum node, you don't have to download the entire existing blockchain because you create a new one in local mode, and using` Geth` that allows you to connect to any of the ethereum networks (main, ropsten, rinkeby or others that you can create).

  - **Way 1:**

    On your computer we will use `ganache-cli`, for them we install the program.
    ```git
      $ sudo npm install -g ganache-cli
    ```
  - **Way 2:**

    In this way we prefer that you download on your real machine (not the virtual one), since it downloads the ethereum blockchain, in this example Ropsten.
    ```git
      $ sudo apt-get install software-properties-common
      $ sudo add-apt-repository -y ppa:ethereum/ethereum
      $ sudo apt-get update
      $ sudo apt-get install ethereum
    ```
    We start geth in the Ropsten network (do not close the terminal and this creates the connection with the ethereum network).
    ```git
      $ geth --testnet --syncmode "light" --rpc --rpcapi db,eth,net,web3,personal --cache=1024 --allow-insecure-unlock
    ```
    In another terminal we access the node once it has synchronized and downloaded all the data.
    ```git
      $ geth attach http://127.0.0.1:8545
    ```
    Creating a new account (Only on the network you started):
    ```git
      > personal.newAccount()
    ```
    > **Note**: Your new account must be protected. So you need to create a password.
    ```git
     Passphrase:
     Repeat passphrase:
     "0x05204abe320e1d45c229cecd395daf13a4f58f52"

    ```

    Granting permissions for truffle can access our account (we do this every time you want to deploy a Smart Contract)
    ```git
      > personal.unlockAccount(eth.accounts[0])
      true
    ```

    We verify our balance
    ```git
      > web3.fromWei(eth.getBalance(eth.accounts[0]), "ether")
      true
    ```


### Project Installation

- We download our github project, remember that if you modified the contract you need to run it again and check that the version of the smart contract in solidity is in force (this is a problem, Solidity is still in development and is constantly changing).
  ```git
    $ git clone https://github.com/esc000658/rocket.git
  ```
  > **Nota**: Our project includes a friendly graphical interface, and was developed using webpack and truffle.

### Project Deployment
- We deploy our project locally.

  - Start `ganache-cli`, this will show us 10 private keys with 100 ethers, we can copy some of them to try later.
  ```git
    $ ganache-cli
  ```
  - In our browser we open metamask and select localhost; Then we import the private keys of the accounts that we will add.
  - We access the address of our project through the linux terminal and execute these commands, to compile to deploy the Smart Contract.
    - Only if you updated or modified the Smart Contract version:
    ```git
      $ truffle compile
    ```
    - If you are using ganache-cli:
    ```git
      $ truffle migrate --network local --reset
    ```
    - If we use geth we can deploy with this command:
    ```git
      $ truffle migrate --network ropsten --reset
    ```
  - We access the address of our project through the terminal and execute these commands, to compile to deploy the Smart Contract.
  ```git
    $ npm run dev
  ```
  And if you are on a web server:
  ```git
    $ npm run build
  ```
## Ready, now we can use it!

Access the website of our project (http://188.166.116.72) or the one you deployed on your computer or server.

  > **Remember**: To choose the Ropsten network and enable the rocket project in Metamasks

  ![Match function](https://cdn-images-1.medium.com/max/1120/1*75KXDVrE50xLgHGbwPQxgw.png)


  ![Match function](https://cdn-images-1.medium.com/max/1120/1*7Q8cx9SFm6xHqNoE3fgKrg.png)


## Conclusion  
The proofs of concept carried out on the project were successful considering that we are in the first stage and the application includes only objects that are represented by a code.

In the later stages we will create a contract that allows the creation of digital products that will be included in the rocket platform.

## keyword
	Dapp, Smart Contract, Ethereum, Blockchain, truffle, geth

[Linux]:https://www.vmware.com/products/workstation-for-linux.html
[Windows]:https://www.vmware.com/products/workstation.html
[Mac]:https://www.vmware.com/products/fusion.html
[Ubuntu]:https://www.ubuntu.com/download/desktop
[Metamask]:https://metamask.io/#how-it-works
