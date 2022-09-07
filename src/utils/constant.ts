import { Address, BigDecimal, BigInt } from "@graphprotocol/graph-ts";

export let ZERO_BI = BigInt.fromI32(0);
export let ONE_BI = BigInt.fromI32(1);
export let ZERO_BD = BigDecimal.fromString("0");
export let ONE_BD = BigDecimal.fromString("1");

// Token Weight In Ounce (0z)
export const PAXG_WEIGHT = "1";

// Token Addresses
// Gold Tokens
export const PAXG_ADDRESS: Address = Address.fromString("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
// Pair Addresses
export const PAXG_USDP_ADDRESS: Address = Address.fromString("0x709f7B10F22EB62b05913B59b92DDd372d4E2152");
// Other Tokens
export const ADDRESS_ZERO: Address = Address.fromString("0x0000000000000000000000000000000000000000");
export const WETH_ADDRESS: Address = Address.fromString("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
export const USDC_ADDRESS: Address = Address.fromString("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48");

