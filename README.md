# README

This is a

### Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

- Git - [Download & Install Git](https://git-scm.com/downloads). OSX and Linux machines typically have this already installed.
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- IPFS Daemon - [Install js-ipfs](https://github.com/ipfs/js-ipfs) and [Download & Install IPFS Desktop](https://docs.ipfs.io/install/ipfs-desktop/) that will run the go version of IPFS or head over to https://dist.ipfs.io/#go-ipfs and hit the "Download go-ipfs" button. Extract the archive and read the instructions to install.

### Installation and Running example

With Node.js and git installed, install the project dependencies:

```console
$ npm install
```

Start the example application:

```sh
npm start
```

### 1. Start two IPFS nodes

To demonstrate pubsub we need two nodes running so pubsub messages can be passed between them.

Right now the easiest way to do this is to install and start a `js-ipfs` and `go-ipfs` node. There are other ways to do this, see [this document on running multiple nodes](https://github.com/ipfs-examples/js-ipfs-examples/running-multiple-nodes) for details.

### 2. Start the IPFS nodes

#### JS IPFS node

```sh
npm install -g ipfs
jsipfs init
# Configure CORS to allow ipfs-http-client to access this IPFS node
jsipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://127.0.0.1:8888"]'
# Start the IPFS node, enabling pubsub
jsipfs daemon
```

#### GO IPFS node

```sh
ipfs init
# Configure CORS to allow ipfs-http-client to access this IPFS node
ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '["http://127.0.0.1:8888"]'
# Start the IPFS node, enabling pubsub
ipfs daemon --enable-pubsub-experiment
```

In the "API ADDR" field enter `/ip4/127.0.0.1/tcp/5001` in one browser and `/ip4/127.0.0.1/tcp/5002` in the other and hit the "Connect" button.

This connects each browser to an IPFS node and now from the comfort of our browser we can instruct each node to listen to a pubsub topic and send/receive pubsub messages to each other.

> N.B. Since our two IPFS nodes are running on the same network they should have already found each other by MDNS. So you probably won't need to use the "CONNECT TO PEER" field. If you find your pubsub messages aren't getting through, check the output from your `jsipfs daemon` command and find the first address listed in "Swarm listening on" - it'll look like `/ip4/127.0.0.1/tcp/4002/ipfs/Qm...`. Paste this address into the "CONNECT TO PEER" field for the browser that is connected to your go-ipfs node and hit connect.

Finally, use the "SUBSCRIBE TO PUBSUB TOPIC" and "SEND MESSAGE" fields to do some pubsub-ing, you should see messages sent from one browser appear in the log of the other (provided they're both subscribed to the same topic).


## Code Execution
#### Clip:
![alt text](https://github.com/Aryamanraj/multicallQuotes/blob/master/files/gif3.gif)

## Code Breakdown
The code contains three functions:
- `price(link)` takes a link as an argument and returns a smart contract instance of the AggregatorV3Interface using the ABI in the code.
- `masterlist(listing)` takes a list of integers as an argument and returns a dictionary of the selected cryptocurrencies and their corresponding contract addresses.
- `main()` is the main function that prompts the user to select cryptocurrencies from a list. It uses the `multicall` function from Brownie to retrieve the price data from the selected contracts, and stores the result in a list of dictionaries. The result is then printed.

## Conclusion
This script can be used as a starting point for retrieving price data from smart contracts on the Ethereum network using Brownie.
