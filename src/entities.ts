import { Address, BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Token, Transfer } from "../generated/schema";
import { fetchTokenDecimals, fetchTokenName, fetchTokenSymbol } from "./utils";
import { ONE_BD, PAXG_ADDRESS, PAXG_WEIGHT } from "./utils/constant";

export function loadOrCreateTransfer(txHash: Bytes, timestamp: BigInt, addresses: Address[], token: Token, amount: BigDecimal, amountWeight: BigDecimal, amountUsd: BigDecimal): Transfer {
    let transaction = Transfer.load(txHash.toHexString());

    if (transaction === null) {
        transaction = new Transfer(txHash.toHexString());
        transaction.timestamp = timestamp;
        transaction.from = addresses[0];
        transaction.to = addresses[1];
        transaction.token = token.id;

        transaction.amount = amount;
        transaction.amountWeight = amountWeight;
        transaction.amountUsd = amountUsd;
    }

    return transaction as Transfer;
}


export function loadOrCreateToken(address: Address): Token {
    let token = Token.load(address.toHexString());
    if (token === null) {
        let tokenWeight = ONE_BD;
        if (address.toHexString() == PAXG_ADDRESS.toHexString())
            tokenWeight = BigDecimal.fromString(PAXG_WEIGHT);

        token = new Token(address.toHex());
        token.weight = tokenWeight;
        token.decimals = fetchTokenDecimals(address);
        token.ticker = fetchTokenSymbol(address);
        token.name = fetchTokenName(address);
        token.save()
    }

    return token as Token;
}