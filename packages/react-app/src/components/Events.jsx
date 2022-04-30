import { List, Button } from "antd";
import { useEffect, useState } from "react";
import { useEventListener } from "eth-hooks/events/useEventListener";
import Address from "./Address";

const { ethers } = require("ethers");
/**
  ~ What it does? ~
  Displays a lists of events
  ~ How can I use? ~
  <Events
    contracts={readContracts}
    contractName="YourContract"
    eventName="SetPurpose"
    localProvider={localProvider}
    mainnetProvider={mainnetProvider}
    startBlock={1}
  />
**/

const convictionMultiplier = 0.001;

export default function Events({
  address,
  contracts,
  contractName,
  eventName,
  localProvider,
  mainnetProvider,
  startBlock,
  currentTimestamp,
  tx,
  readContracts,
  writeContracts,
}) {
  // 📟 Listen for broadcast events
  const events = useEventListener(contracts, contractName, eventName, localProvider, startBlock);

  const [deposits, setDeposits] = useState([]);

  const [maxValue, setMaxValue] = useState(1);

  useEffect(() => {
    console.log("EVENTS UPDATED", events);

    for (let e in events) {
      console.log("looking at event", e, events[e]);
      //if(events[e].args.voter.toLowerCase() == address.toLowerCase()){
      console.log("FOUND AN EVENT OF MINE!");
      let exists;
      for (let d in deposits) {
        if (deposits[d].voteID.toNumber() === events[e].args.voteID.toNumber()) {
          exists = true;
          break;
        }
      }
      if (!exists) {
        console.log("this is new and not added yet");
        setDeposits([
          ...deposits,
          {
            ...events[e].args,
          },
        ]);
      }
      //}
    }
  }, [events, deposits]);

  console.log("deposits", deposits);

  const [depositStatus, setDepositStatus] = useState({});
  const [calcedAmount, setCalcedAmount] = useState({});
  const [totalVotes, setTotalVotes] = useState([]);

  useEffect(async () => {
    return false;
    console.log("deposits have changed...");
    let statusObj = {};
    let calcedAmountObj = {};
    let totalVotesObj = {};
    for (let d in deposits) {
      let status = await contracts.YourContract.voteStatus(deposits[d].voteID);
      console.log("STATUS OF ", deposits[d].voteID, "IS", status);
      let calced =
        parseFloat(ethers.utils.formatEther(deposits[d].amount)) +
        convictionMultiplier *
          (currentTimestamp - deposits[d].timestamp.toNumber()) *
          ethers.utils.formatEther(deposits[d].amount);
      console.log("CALC OF ", deposits[d].voteID, "IS", calced);
      statusObj[deposits[d].voteID] = status;
      calcedAmountObj[deposits[d].voteID] = calced;
      if (status) {
        if (!totalVotesObj[deposits[d].vote]) totalVotesObj[deposits[d].vote] = 0;
        totalVotesObj[deposits[d].vote] += calced;
      }
    }
    setDepositStatus(statusObj);
    setCalcedAmount(calcedAmountObj);
    let votesArray = [];
    let currMaxValue = 0;
    for (let v in totalVotesObj) {
      currMaxValue = Math.max(totalVotesObj[v], currMaxValue);
      votesArray.push({
        text: v,
        value: totalVotesObj[v],
      });
    }
    console.log("ASD");
    setMaxValue(currMaxValue);
    setTotalVotes(votesArray);
  }, [deposits, currentTimestamp]);

  console.log("totalVotes", totalVotes);

  return (
    <div style={{ width: 800, margin: "auto", marginTop: 32, paddingBottom: 32 }}>
      <h2>Events:</h2>
      <List
        bordered
        dataSource={events.reverse()}
        renderItem={item => {
          return (
            <List.Item /*key={item.blockNumber + "_" + item.args.sender + "_" + item.args.purpose}*/>
              <div>#{item.args.voteID.toNumber()}</div>
              <div>
                <Address address={item.args.voter} ensProvider={mainnetProvider} fontSize={16} />
              </div>
              <div> Ξ{item.args.amount && ethers.utils.formatEther(item.args.amount)}</div>
              <div> {item.args.vote}</div>
              <div> {currentTimestamp - item.args.timestamp.toNumber()}</div>
              <div> {ethers.utils.formatEther(item.args.amount)} </div>
              <div>
                {" "}
                <b>{calcedAmount[item.args.voteID]}</b>{" "}
              </div>
              <div>{depositStatus[item.args.voteID] ? " ACTIVE " : " CLOSED "}</div>
              <div>
                {" "}
                <Button
                  style={{ marginTop: 8 }}
                  disabled={item.args.voter !== address || !depositStatus[item.args.voteID]}
                  onClick={async () => {
                    /* look how you call setPurpose on your contract: */
                    /* notice how you pass a call back for tx updates too */
                    /*const result = tx(writeContracts.YourContract.withdraw(item.args.voteID.toNumber()), update => {
                      console.log("📡 Transaction Update:", update);
                      if (update && (update.status === "confirmed" || update.status === 1)) {
                        console.log(" 🍾 Transaction " + update.hash + " finished!");
                        console.log(
                          " ⛽️ " +
                            update.gasUsed +
                            "/" +
                            (update.gasLimit || update.gas) +
                            " @ " +
                            parseFloat(update.gasPrice) / 1000000000 +
                            " gwei",
                        );
                      }
                    });
                    console.log("awaiting metamask/web3 confirm result...", result);
                    console.log(await result);*/
                  }}
                >
                  Close
                </Button>
              </div>
            </List.Item>
          );
        }}
      />
    </div>
  );
}
