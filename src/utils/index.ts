import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { ERC20 } from "../../generated/paxg/ERC20";
import { ERC20NameBytes } from "../../generated/paxg/ERC20NameBytes";
import { ERC20SymbolBytes } from "../../generated/paxg/ERC20SymbolBytes";
import { ONE_BI, ZERO_BD, ZERO_BI } from "./constant";

// return 0 if denominator is 0 in division
export function safeDiv(amount0: BigDecimal, amount1: BigDecimal): BigDecimal {
    if (amount1.equals(ZERO_BD)) {
        return ZERO_BD
    } else {
        return amount0.div(amount1)
    }
}

export function exponentToBigDecimal(decimals: BigInt): BigDecimal {
    let bd = BigDecimal.fromString("1");
    for (let i = ZERO_BI; i.lt(decimals as BigInt); i = i.plus(ONE_BI)) {
        bd = bd.times(BigDecimal.fromString("10"));
    }
    return bd;
}

export function convertTokenToDecimal(tokenAmount: BigInt, exchangeDecimals: BigInt): BigDecimal {
    if (exchangeDecimals == ZERO_BI) {
        return tokenAmount.toBigDecimal();
    }
    return tokenAmount.toBigDecimal().div(exponentToBigDecimal(exchangeDecimals));
}

export function isNullEthValue(value: string): boolean {
    return value == "0x0000000000000000000000000000000000000000000000000000000000000001";
}

export function fetchTokenSymbol(tokenAddress: Address): string {
    let contract = ERC20.bind(tokenAddress);
    let contractSymbolBytes = ERC20SymbolBytes.bind(tokenAddress);

    let symbolValue = "unknown";
    let symbolResult = contract.try_symbol();
    if (symbolResult.reverted) {
        let symbolResultBytes = contractSymbolBytes.try_symbol();
        if (!symbolResultBytes.reverted) {
            if (!isNullEthValue(symbolResultBytes.value.toHex())) {
                symbolValue = symbolResultBytes.value.toString();
            }
        }
    } else {
        symbolValue = symbolResult.value;
    }
    return symbolValue;
}

export function fetchTokenName(tokenAddress: Address): string {
    let contract = ERC20.bind(tokenAddress);
    let contractNameBytes = ERC20NameBytes.bind(tokenAddress);

    let nameValue = "unknown";
    let nameResult = contract.try_name();
    if (nameResult.reverted) {
        let nameResultBytes = contractNameBytes.try_name();
        if (!nameResultBytes.reverted) {
            if (!isNullEthValue(nameResultBytes.value.toHex())) {
                nameValue = nameResultBytes.value.toString();
            }
        }
    } else {
        nameValue = nameResult.value;
    }
    return nameValue;
}

export function fetchTokenDecimals(tokenAddress: Address): BigInt {
    let contract = ERC20.bind(tokenAddress);
    let decimalValue = 18;
    let decimalResult = contract.try_decimals();
    if (!decimalResult.reverted) {
        decimalValue = decimalResult.value;
    }
    return BigInt.fromI32(decimalValue);
}

export function fetchTokenSupply(tokenAddress: Address): BigInt {
    let contract = ERC20.bind(tokenAddress);
    let totalSupplyValue = ZERO_BI;
    let totalSupplyResult = contract.try_totalSupply();
    if (!totalSupplyResult.reverted) {
        totalSupplyValue = totalSupplyResult.value;
    }
    return totalSupplyValue;
}
