# 🏗 Scaffold-ETH - 🗳 Conviction Cloud

This is the second iteration of a simple conviction voting system.

The way conviction voting work is conceptually simple:

* User approves and locks an ERC20 on behalf of some string (this is effectively the vote)
* The longer the token is locked the more voting weight the string has.

In this example, a live convition cloud forms with the real-time votes. 

Users can withdraw their tokens at any time. 

The first iteration displayed a word-cloud with all the votes on it.
This second iteration moves the conviction scora calculation on-chain, adds an exponential decay function used when users withdraw their votes[1], and adds a chart showing the forecasted conviction scores 10 days in the future:

![Conviction Chart](https://user-images.githubusercontent.com/98137565/162845415-6936c3b7-ee37-4c9b-83fb-70030930b1ce.png)

You can click "Go to tomorrow!" to move the clock of your *local* hardhat chain 24h in the future - this will allow you to simulate people
voring and removing their votes over time.

[1] Well, sort of: exponential decay is hard in Solidity, so for now I used a simple half-life calculation to approximate the exponential decay.

# 🏄‍♂️ Quick Start

Prerequisites: [Node (v16 LTS)](https://nodejs.org/en/download/) plus [Yarn](https://classic.yarnpkg.com/en/docs/install/) and [Git](https://git-scm.com/downloads)

1. clone/fork 🏗 scaffold-eth and checkout the `conviction-cloud` branch:

```bash
git clone https://github.com/scaffold-eth/scaffold-eth.git
cd scaffold-eth
git checkout conviction-cloud
```

2. install and start your 👷‍ Hardhat chain:

```bash
yarn install
yarn chain
```

3. in a second terminal window, start your 📱 frontend:

```bash
yarn start
```

4. edit the file `packages/hardhat/deploy/00_deploy_your_token.js` by replacing the two ethereum addresses with your own.
These will receive 10 GTC test tokens each

5. in a third terminal window, 🛰 deploy your contracts:

```bash
yarn deploy
```

6. you can now visit [http://localhost:3000/exampleui](http://localhost:3000/exampleui) and you should see the following:

![Example UI](https://user-images.githubusercontent.com/98137565/162340614-f89063ef-ecef-4abe-afce-fc5dabbb16ce.png)

At this point you can approve a certain amount of tokens and then vote on a string of your choice. The steps to do so are:

1. Type the amount of tokens you want to stake and click "Approve". This will trigger a transaction - confirm on Metamask.

![Approval](https://user-images.githubusercontent.com/98137565/162340740-52260375-e8ef-4993-b6d5-173d63771e26.png)

2. Type your vote and click "Vote". This will require another transaction, so approve in Metamask.

![Vote](https://user-images.githubusercontent.com/98137565/162340858-62a8f87f-0f0d-4a02-8c03-be6af8609214.png)

You will now see your vote appear in a cloud...but it will not look like a cloud yet, since there's only one vote! Go ahead and repeat the process, cast another vote 🗳

You can also switch account in Metamask (as long as the account has received some tokens when you deployed) and see the cloud change in real time when you cast votes from a separate window.

You can click "Go to tomorrow!" to move the clock of your *local* hardhat chain 24h in the future - this will allow you to simulate people
voring and removing their votes over time. Remember to restart your local chain between deployments to go back to today.

Eventually you will see something like this:

![Conviction Cloud](https://user-images.githubusercontent.com/98137565/162336968-1731f84c-df63-443c-aa5a-643e4221ec6b.png)

And the chart might look something like this:

![Conviction Chart](https://user-images.githubusercontent.com/98137565/162845415-6936c3b7-ee37-4c9b-83fb-70030930b1ce.png)


# 📚 Documentation

Documentation, tutorials, challenges, and many more resources, visit: [docs.scaffoldeth.io](https://docs.scaffoldeth.io)

# 🔭 Learning Solidity

📕 Read the docs: https://docs.soliditylang.org

📚 Go through each topic from [solidity by example](https://solidity-by-example.org) editing `YourContract.sol` in **🏗 scaffold-eth**

- [Primitive Data Types](https://solidity-by-example.org/primitives/)
- [Mappings](https://solidity-by-example.org/mapping/)
- [Structs](https://solidity-by-example.org/structs/)
- [Modifiers](https://solidity-by-example.org/function-modifier/)
- [Events](https://solidity-by-example.org/events/)
- [Inheritance](https://solidity-by-example.org/inheritance/)
- [Payable](https://solidity-by-example.org/payable/)
- [Fallback](https://solidity-by-example.org/fallback/)

📧 Learn the [Solidity globals and units](https://docs.soliditylang.org/en/latest/units-and-global-variables.html)

# 🛠 Buidl

Check out all the [active branches](https://github.com/scaffold-eth/scaffold-eth/branches/active), [open issues](https://github.com/scaffold-eth/scaffold-eth/issues), and join/fund the 🏰 [BuidlGuidl](https://BuidlGuidl.com)!

  
 - 🚤  [Follow the full Ethereum Speed Run](https://medium.com/@austin_48503/%EF%B8%8Fethereum-dev-speed-run-bd72bcba6a4c)


 - 🎟  [Create your first NFT](https://github.com/scaffold-eth/scaffold-eth/tree/simple-nft-example)
 - 🥩  [Build a staking smart contract](https://github.com/scaffold-eth/scaffold-eth/tree/challenge-1-decentralized-staking)
 - 🏵  [Deploy a token and vendor](https://github.com/scaffold-eth/scaffold-eth/tree/challenge-2-token-vendor)
 - 🎫  [Extend the NFT example to make a "buyer mints" marketplace](https://github.com/scaffold-eth/scaffold-eth/tree/buyer-mints-nft)
 - 🎲  [Learn about commit/reveal](https://github.com/scaffold-eth/scaffold-eth/tree/commit-reveal-with-frontend)
 - ✍️  [Learn how ecrecover works](https://github.com/scaffold-eth/scaffold-eth/tree/signature-recover)
 - 👩‍👩‍👧‍👧  [Build a multi-sig that uses off-chain signatures](https://github.com/scaffold-eth/scaffold-eth/tree/meta-multi-sig)
 - ⏳  [Extend the multi-sig to stream ETH](https://github.com/scaffold-eth/scaffold-eth/tree/streaming-meta-multi-sig)
 - ⚖️  [Learn how a simple DEX works](https://medium.com/@austin_48503/%EF%B8%8F-minimum-viable-exchange-d84f30bd0c90)
 - 🦍  [Ape into learning!](https://github.com/scaffold-eth/scaffold-eth/tree/aave-ape)

# 💌 P.S.

🌍 You need an RPC key for testnets and production deployments, create an [Alchemy](https://www.alchemy.com/) account and replace the value of `ALCHEMY_KEY = xxx` in `packages/react-app/src/constants.js` with your new key.

📣 Make sure you update the `InfuraID` before you go to production. Huge thanks to [Infura](https://infura.io/) for our special account that fields 7m req/day!

# 🏃💨 Speedrun Ethereum
Register as a builder [here](https://speedrunethereum.com) and start on some of the challenges and build a portfolio.

# 💬 Support Chat

Join the telegram [support chat 💬](https://t.me/joinchat/KByvmRe5wkR-8F_zz6AjpA) to ask questions and find others building with 🏗 scaffold-eth!

---

🙏 Please check out our [Gitcoin grant](https://gitcoin.co/grants/2851/scaffold-eth) too!

### Automated with Gitpod

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#github.com/scaffold-eth/scaffold-eth)
