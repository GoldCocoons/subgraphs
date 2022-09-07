import {
  Transfer
} from "../generated/paxg/paxg";
import { loadOrCreateToken, loadOrCreateTransfer } from "./entities";
import { convertTokenToDecimal } from "./utils";
import { findUsdPerTokenOnChain } from "./utils/pricing";

export function handleTransfer(event: Transfer): void {
  // TODO:
  const token = loadOrCreateToken(event.address);
  const addresses = [event.params.from, event.params.to];
  const amount = convertTokenToDecimal(event.params.value, token.decimals);

  //1. create Transfer entity
  loadOrCreateTransfer(event.transaction.hash, event.block.timestamp, addresses, token, amount, amount.times(token.weight), findUsdPerTokenOnChain(token));
  //2. create Address entity with the sender and receiver address

  //3. create Balance entity with the sender and receiver address
}
