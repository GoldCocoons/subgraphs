import { Address, BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { Token, Transaction } from "../generated/schema";

export function loadOrCreateTransaction(txHash: Bytes, timestamp: BigInt, addresses: Address[], token: Token, amount: BigDecimal, amountWeight: BigDecimal, amountUsd: BigDecimal): Transaction {
    let transaction = Transaction.load(txHash.toHexString());

    if (transaction === null) {
        transaction = new Transaction(txHash.toHexString());
        transaction.timestamp = timestamp;
        transaction.from = addresses[0];
        transaction.to = addresses[1];
        transaction.token = token.id;

        transaction.amount = amount;
        transaction.amountWeight = amountWeight;
        transaction.amountUsd = amountUsd;
    }

    return transaction as Transaction;
}


export function loadOrCreateToken(address: Address): Token {
    let token = Token.load(address.toHexString());
    if (token === null) {
        token = new Token(address.toHex());
        token.save()
    }

    return token as Token;
}