import 'dotenv/config';
import cors from 'cors';
import express from 'express';

const app = express();

app.use(cors());

app.get('/did/v1/', (req, res) => {
  console.log("Processing : ",req.query.id);

  let did = req.query.id;
  if (did.startsWith("did:holo:")){
    let hash = req.query.id.split("did:holo:");
    console.log("Hash: ",hash);
    resolve(hash[1]).then(did_doc=>{
      if(did_doc){
        res.send(did_doc)
      }else{
        res.status(500).send('Error: Key does not exist in DeepKey')
      }
    })
  }
});

app.listen(process.env.PORT, () =>{
  console.log(`* did:holo reslover listening on port ${process.env.PORT}!`)
  console.log(`* Expected DeepKey on port ${process.env.HCPORT}!`)
}
);

function wrapDidDocument (key, status) {
  // Create Document
  if(status.Ok == "live"){
    return {
      '@context': 'https://www.w3.org/2019/did/v1',
      id: "did:holo:"+key,
      "publicKey": [{
    		"id": "did:holo:"+key+"#key-1",
    		"type": "Ed25519VerificationKey2018",
    		"publicKeyHex": key
    	}],
      "authentication": ["did:holo:"+key+"#key-1"],
      status
    }
  }
  // For Now Sends an Error
  // TODO: Return the most updated key
  if(status.Ok == "Update"){
    return null
  }

  // For Now Sends an Error
  // TODO: Return the most updated key
  if(status.Ok == "Delete"){
    return null
  }
  else if(status.Ok == "Doesn't Exists"){
    return null
  }
  else {
    return null
  }
}

function resolve (did) {
    return callZome(did).then(r=>{
      return wrapDidDocument(did,JSON.parse(r))
    }
    )
}

function callZome(did){
  let data = {
    "id": "0",
    "jsonrpc": "2.0",
    "method":'call',
    params: {
        instance_id: "dpki_happ",
        zome: "dpki",
        function: "key_status",
        args: {
            key:did
        }
    }
  }

  return fetch("http://localhost:"+process.env.HCPORT, {
          method: 'POST', // *GET, POST, PUT, DELETE, etc.
          mode: 'cors', // no-cors, cors, *same-origin
          headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(data), // body data type must match "Content-Type" header
      }).then(response => response.json())
        .then(data => {
          console.log("-->",data) // Prints result from `response.json()` in getRequest
          return data.result
        })
        .catch(error => console.error("Error: ",error))
}

// ==================== Helpers ============================ //
// function bytes32toString (bytes32) {
//   return Buffer.from(bytes32.slice(2), 'hex')
//     .toString('utf8')
//     .replace(/\0+$/, '')
// }
//
// function stringToBytes32 (str) {
//   const buffstr =
//     '0x' +
//     Buffer.from(str)
//       .slice(0, 32)
//       .toString('hex')
//   return buffstr + '0'.repeat(66 - buffstr.length)
// }
