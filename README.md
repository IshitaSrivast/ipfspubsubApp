# README
Publish-Subscribe, called 'pubsub' for short, is provided by IPFS for providing greater network scalability and flexibility. Publishers send messages classified by topic or content and Subscribers receive only the messages they are interested in. This repository is the messaging platform between two IPFS nodes and exchanges messages between Node1 and Node2 on topic of common interest by using PubSub. The two Node implementations have similar code-breakdown and are separate as I was facing the issue as put up in https://github.com/ipfs/js-ipfs/issues/1858 while trying to run multiple IPFS nodes on the same machine. The implementation in the repository resolves the issue and can be used to see the running example of the IPFS PubSub on the same machine.


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

Right now the easiest way to do this is to install and start a `js-ipfs` and `go-ipfs` node. 

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

> N.B. Since our two IPFS nodes are running on the same network they should have already found each other by MDNS. So the "CONNECT TO PEER" field is not required. If you find your pubsub messages aren't getting through, check the output from your `jsipfs daemon` command and find the first address listed in "Swarm listening on" - it'll look like `/ip4/127.0.0.1/tcp/4002/ipfs/Qm...`. Paste this address into the "CONNECT TO PEER" field for the browser that is connected to your go-ipfs node and hit connect.

Finally, use the "SUBSCRIBE TO PUBSUB TOPIC" and "SEND MESSAGE" fields to do some pubsub-ing, you should see messages sent from one browser appear in the log of the other (provided they're both subscribed to the same topic) by clicking on API button.


## Code Execution
#### Clip:
![alt text](https://github.com/IshitaSrivast/ipfspubsubApp/blob/master/files/tutorial.gif)

## Code Breakdown
The node1-api has serv.js file that contains functions:
- `function nodeConnect` to create IPFS node and connect it to the browser
- `function nodeConnect`for peer discovery and connection
- `function subscribe` takes a topic as an argument and uses pubsub.subscribe to recieve messages relate to the topic.
- `function send` takes message as and uses pubsub.publish to send messages related to the topic.


The node2-api has similar code breakdown.


## Conclusion
The exchange of messages between Node1 and Node2 on topic of common interest is successfully implemented by the use of PubSub.
