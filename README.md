# did holo resolver (Driver)

Decentralized Identifiers are designed to be compatible with any distributed ledger or network (called the target system). This is specing and prototyping a DID method for holochain.

**`did:holo:`**

## Documentations:
- [Decentralized Identifiers- Data Model and Syntaxes](https://w3c-ccg.github.io/did-spec/)
- [did:holo resolver specs](./doc/did_holo_spec.md)

## Installation

* `git clone git@github.com:Holo-Host/did-holo-resolver.git`
* `cd did-holo-resolver`
* `npm install`
* `npm start`

### Build a Docker image

```bash
$ docker build -t  did-holo-resolver .
```

### Run our Docker container

OK, now that we have our Docker image built, we can use it to launch a container.

To do that, we use the docker run command with the name of the image we want to use.

We’ll also provide the dash ‘p’ parameter with the run command to map the ports that our Docker container and Node app will be using.

Remember, in our Dockerfile we exposed port 8800 but in our code, Node is using port 3000.

So, the run command will look like this.

```bash
$ docker run -p 8800:3000 hello-world
```

That's it! Your Node.js app is running in Docker.

### Clean up

When you're done walking through this demo you can use the following steps to remove the hello-world container and image.

#### 1. Get the container id

Use the docker ps command to list the running containers and copy the container id.

```bash
$ docker ps
```
#### 2. Stop the container

```bash
$ docker stop your-container-id
```
#### 3. Remove the container

```bash
$ docker rm your-container-id
```
#### 4. Remove the image

```bash
$ docker rmi hello-world
```

## Authors
* **Joel Ulahanna** - [zo-el](https://github.com/zo-el)

## License
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)

Copyright (C) 2017, The MetaCurrency Project (Eric Harris-Braun, Arthur Brock, et. al.)

This program is free software: you can redistribute it and/or modify it under the terms of the license provided in the LICENSE file (GPLv3). This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.

Note: We are considering other 'looser' licensing options (like MIT license) but at this stage are using GPL while we're getting the matter sorted out.

