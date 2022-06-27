# TokenMaker

This repository contains a simple token maker app to easily generate fungible (ERC20) and nonfungible (ER721) contracts/tokens from an Angular based app.
Works on any EVM compatible chain. All ERC721 Tokens (Metadata/ Image) are stored 'on chain' (Base64 encoded tokenURI).

### Development

1. Intall all node packages

```bash
> npm install
```

2. Compile the solidity code to get the artifacts

```bash
> npx hardhat compile
```

3. Start the Angular app

```bash
> ng serve
```

Now you are all set and good to use this app

### Deployment

Well just use Docker :)

```bash
> docker build . --tag tokenmakerimage
```

```bash
> docker run -p PORTS --name tokenmakercontainer tokenmakerimage
```

### About

This project is experimental, use at your own risk. The project is developed in my free time as a way to learn Ethers and Hardhat.
