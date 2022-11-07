import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let ZERO_BD = BigDecimal.fromString("0");
export let ONE_BD = BigDecimal.fromString("1");

// Token Weight In Ounce (0z)
export const PAXG_WEIGHT = "1";
export const TETHERG_WEIGHT = "1";
export const CACHE_WEIGHT = "0.035274";

// Token Addresses
// Gold Tokens
export const PAXG_ADDRESS: Address = Address.fromString("0x45804880De22913dAFE09f4980848ECE6EcbAf78");
export const TETHERG_ADDRESS: Address = Address.fromString("0x68749665FF8D2d112Fa859AA293F07A622782F38");
export const CACHE_ADDRESS: Address = Address.fromString("0xf5238462e7235c7b62811567e63dd17d12c2eaa0");
// Pair Addresses
export const PAXG_USDP_ADDRESS: Address = Address.fromString("0x709f7B10F22EB62b05913B59b92DDd372d4E2152");
export const TETHERG_USDP_ADDRESS: Address = Address.fromString("0x709f7B10F22EB62b05913B59b92DDd372d4E2152");
export const CACHE_USDC_ADDRESS: Address = Address.fromString("0x2cf500dccf4b8f68126ed155acd351aad8b328fe");
// Other Tokens
export const ADDRESS_ZERO: Address = Address.fromString("0x0000000000000000000000000000000000000000");
export const WETH_ADDRESS: Address = Address.fromString("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
export const USDC_ADDRESS: Address = Address.fromString("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48");

