import { Address, BigDecimal, log } from "@graphprotocol/graph-ts";
import { convertTokenToDecimal, safeDiv } from ".";
import { UniV2Pair } from "../../generated/paxg/UniV2Pair";
import { Token } from "../../generated/schema";
import { loadOrCreateToken } from "../entities";
import { ADDRESS_ZERO, CACHE_ADDRESS, CACHE_ETH_ADDRESS, PAXG_ADDRESS, PAXG_ETH_ADDRESS, TETHERG_ADDRESS, WETH_ADDRESS, WETH_USDC_ADDRESS, ZERO_BD } from "./constant";

export function findUsdPerTokenOnChain(token: Token): BigDecimal {
    let usdPerToken = ZERO_BD;

    let pairAddress = ADDRESS_ZERO;
    if (token.id == PAXG_ADDRESS.toHexString())
        pairAddress = PAXG_ETH_ADDRESS;
    if (token.id == TETHERG_ADDRESS.toHexString())
        pairAddress = PAXG_ETH_ADDRESS;
    if (token.id == CACHE_ADDRESS.toHexString())
        pairAddress = CACHE_ETH_ADDRESS;

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

    return findUsdPerEth().times(usdPerToken);
}

export function findUsdPerEth(): BigDecimal {
    let usdPerToken = ZERO_BD;

    const pair = UniV2Pair.bind(WETH_USDC_ADDRESS);
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
