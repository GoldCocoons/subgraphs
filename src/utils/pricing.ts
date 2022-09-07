import { Address, BigDecimal, log } from "@graphprotocol/graph-ts";
import { convertTokenToDecimal, safeDiv } from ".";
import { UniV2Pair } from "../../generated/paxg/UniV2Pair";
import { Token } from "../../generated/schema";
import { loadOrCreateToken } from "../entities";
import { ADDRESS_ZERO, PAXG_ADDRESS, PAXG_USDP_ADDRESS, WETH_ADDRESS, ZERO_BD } from "./constant";

export function findUsdPerTokenOnChain(token: Token): BigDecimal {
    let usdPerToken = ZERO_BD;

    let pairAddress = ADDRESS_ZERO;
    if (token.id == PAXG_ADDRESS.toHexString())
        pairAddress = PAXG_USDP_ADDRESS;

    const pair = UniV2Pair.bind(pairAddress);
    const reserves = pair.try_getReserves();

    if (!reserves.reverted) {
        const token0 = loadOrCreateToken(pair.token0());
        const token1 = loadOrCreateToken(pair.token1());

        const reserve0 = convertTokenToDecimal(reserves.value.value0, token0.decimals);
        const reserve1 = convertTokenToDecimal(reserves.value.value1, token1.decimals);

        const token0isEth = token0.id == WETH_ADDRESS.toHexString();
        usdPerToken = token0isEth ? safeDiv(reserve0, reserve1) : safeDiv(reserve1, reserve0);
    }

    return usdPerToken;
}
