import { create as IpfsHttpClient } from 'ipfs-http-client'
import { toString as uint8ArrayToString } from "uint8arrays/to-string";
const sleep = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms))

import cors from 'cors';

//import bodyParser from 'body-parser'

import express from 'express'
var app = express();

import readline from 'readline'
const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
let ipfs
let topic
let peerId
let msgvar
let msgvar2
async function reset () {
      if (ipfs && topic) {
        console.log(`Unsubscribing from topic ${topic}`)
        await ipfs.pubsub.unsubscribe(topic)
      }
      topic = null
      peerId = null
      ipfs = null
    }


async function nodeConnect (url) {
      await reset()
      console.log(`Connecting to ${url}`)
      ipfs = IpfsHttpClient(url)
      const { id, agentVersion } = await ipfs.id()
      peerId = id
      console.log(`<span class="green">Success!</span>`)
      console.log(`Version ${agentVersion}`)
      console.log(`Peer ID ${id}`)
}


async function peerConnect (addr) {
      if (!addr) throw new Error('Missing peer multiaddr')
      if (!ipfs) throw new Error('Connect to a node first')
      console.log(`Connecting to peer ${addr}`)
      await ipfs.swarm.connect(addr)
      console.log(`<span class="green">Success!</span>`)
      console.log('Listing swarm peers...')
      await sleep()
      const peers = await ipfs.swarm.peers()
      peers.forEach(peer => {
        const fullAddr = `${peer.addr}/ipfs/${peer.peer.toString()}`
        console.log(`<span class="${addr.endsWith(peer.peer.toString()) ? 'teal' : ''}">${fullAddr}</span>`)
      })
      console.log(`(${peers.length} peers total)`)
    }

async function subscribe (nextTopic) {
      if (!nextTopic) throw new Error('Missing topic name')
      if (!ipfs) throw new Error('Connect to a node first')

      const lastTopic = topic

      if (topic) {
      topic = null
      console.log(`Unsubscribing from topic ${lastTopic}`)
      await ipfs.pubsub.unsubscribe(lastTopic)
      }

      console.log(`Subscribing to ${nextTopic}...`)

      await ipfs.pubsub.subscribe(nextTopic, msg => {
      console.info('got message', msg)
      const from = msg.from

      if (peerId.equals(from)) {
      return `Ignoring message ${msg.sequenceNumber} from self`
      }

      console.log(`Message ${msg.sequenceNumber} from ${from}:`)
      msgvar = `Message ${msg.sequenceNumber} from ${from}:`

      try {
        msgvar2 = JSON.stringify(uint8ArrayToString(msg.data), null, 2)
      console.log(JSON.stringify(uint8ArrayToString(msg.data), null, 2))
      } catch (_) {
        msgvar2 = uint8ArrayToString(msg.data, 'base16')
      console.log(uint8ArrayToString(msg.data, 'base16'))
      }
      })

      topic = nextTopic
      console.log(`<span class="green">Success!</span>`)
}

async function send (msg) {
      if (!msg) throw new Error('Missing message')
      if (!topic) throw new Error('Subscribe to a topic first')
      if (!ipfs) throw new Error('Connect to a node first')
  
      console.log(`Sending message to ${topic}...`)
      await ipfs.pubsub.publish(topic, msg)
      console.log(`<span class="green">Success!</span>`)
    }
// async function main(){
//       await nodeConnect('/ip4/127.0.0.1/tcp/5001')
//       await peerConnect('/ip4/127.0.0.1/tcp/4002/p2p/12D3KooWKggtKyAxqM2eNkH9XWUzetzqj7Mbapqbxt4mz998bg53')
//       let sub = 'books';
//       await subscribe(sub)
//       // rl.question('Subscribe to: ', async (sub) => {
//       //       // sub = name
//       //       await subscribe(sub)
//       //       rl.question('Send Message: ', async (msg) =>{
//       //             await send(msg)
//       //             rl.close();
//       //       })      
//       //     });
// }

app.use(cors());

app.get('/api/send', async (req, res) => {
      var _nodeUrl = req.query.nodeUrl;
      //var _peerUrl = req.query.peerUrl;
      var _subscription = req.query.subscription;
      var _message = req.query.message;
      // var _subscription = 'books'
      // var _message = "hello from api"

      // const Q_string =  `getlast?i=${_i}`;
      // const ipfs = await getLast(Q_string);
      
      //await nodeConnect('/ip4/127.0.0.1/tcp/5001')
      //await peerConnect('/ip4/127.0.0.1/tcp/4002/p2p/12D3KooWKggtKyAxqM2eNkH9XWUzetzqj7Mbapqbxt4mz998bg53')
      await nodeConnect(_nodeUrl)
      //await peerConnect(_peerUrl)
      await subscribe(_subscription)
      await send(_message)
      res.send(`Subscribed to ${_subscription} and Sent Message: ${_message}`);
    })
app.get('/api/see', async (req,res)=>{
  let msgjson = {
    "message1": msgvar,
    "message2": msgvar2
  }
  res.send(msgjson)
})

app.listen(6117, () => {
      console.log('API is running on http://localhost:6117')
    })

// app.listen(5223, () => {
//       console.log('API is running on http://localhost:5223')
//     })
//main()