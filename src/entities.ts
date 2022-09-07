import { Address, BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { ERC20 } from "../generated/paxg/ERC20";
import { Address as OwnerAddress, AddressTransfer, Balance, Token, Transfer } from "../generated/schema";
import { convertTokenToDecimal, fetchTokenDecimals, fetchTokenName, fetchTokenSymbol } from "./utils";
import { ONE_BD, PAXG_ADDRESS, PAXG_WEIGHT } from "./utils/constant";
import { findUsdPerTokenOnChain } from "./utils/pricing";

export function loadOrCreateTransfer(txHash: Bytes, timestamp: BigInt, addresses: Address[], token: Token, amount: BigDecimal, amountWeight: BigDecimal, amountUsd: BigDecimal): Transfer {
    let transfer = Transfer.load(txHash.toHexString());

    if (transfer === null) {
        transfer = new Transfer(txHash.toHexString());
        transfer.timestamp = timestamp;
        transfer.from = addresses[0];
        transfer.to = addresses[1];
        transfer.token = token.id;

        transfer.amount = amount;
        transfer.amountWeight = amountWeight;
        transfer.amountUsd = amountUsd;
        transfer.save();
    }

    return transfer as Transfer;
}

export function loadOrCreateToken(address: Address): Token {
    let token = Token.load(address.toHexString());

    if (token === null) {
        let tokenWeight = ONE_BD;
        if (address.toHexString() == PAXG_ADDRESS.toHexString())
            tokenWeight = BigDecimal.fromString(PAXG_WEIGHT);

        token = new Token(address.toHexString());
        token.weight = tokenWeight;
        token.decimals = fetchTokenDecimals(address);
        token.ticker = fetchTokenSymbol(address);
        token.name = fetchTokenName(address);
        token.save()
    }

    return token as Token;
}

export function loadOrCreateAddress(address: Address): OwnerAddress {
    let ownerAddress = OwnerAddress.load(address.toHexString());

    if (ownerAddress === null) {
        ownerAddress = new OwnerAddress(address.toHexString());
        ownerAddress.save()
    }

    return ownerAddress as OwnerAddress;
}

export function loadOrCreateAddressTransfer(address: OwnerAddress, transfer: Bytes): AddressTransfer {
    const id = address.id.concat(transfer.toHexString());
    let addressTransfer = AddressTransfer.load(id);

    if (addressTransfer === null) {
        addressTransfer = new AddressTransfer(id);
        addressTransfer.address = address.id;
        addressTransfer.transfer = transfer.toHex();
        addressTransfer.save()
    }

    return addressTransfer as AddressTransfer;
}

export function createOrUpdateBalance(address: OwnerAddress, token: Token): Balance {
    const id = token.id.concat('-').concat(address.id);
    let balance = Balance.load(id);

    if (balance === null) {
        balance = new Balance(id);
        balance.address = address.id;
    }

    const ercToken = ERC20.bind(Address.fromString(token.id));
    const addressBalance = ercToken.balanceOf(Address.fromString(address.id));

    const amount = convertTokenToDecimal(addressBalance, token.decimals);
    const amountWeight = amount.times(token.weight);
    const amountUsd = findUsdPerTokenOnChain(token).times(amount);

    balance.amount = amount;
    balance.amountWeight = amountWeight;
    balance.amountUsd = amountUsd;
    balance.save();

    return balance as Balance;
}