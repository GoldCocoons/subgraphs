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
export const WETH_USDC_ADDRESS: Address = Address.fromString("0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc");
export const PAXG_ETH_ADDRESS: Address = Address.fromString("0x9C4Fe5FFD9A9fC5678cFBd93Aa2D4FD684b67C4C");
export const TETHERG_ETH_ADDRESS: Address = Address.fromString("0x9C4Fe5FFD9A9fC5678cFBd93Aa2D4FD684b67C4C");
export const CACHE_ETH_ADDRESS: Address = Address.fromString("0x2Cd2d275cdb237e696c60419109Fac5F331484E1");
// Other Tokens
export const ADDRESS_ZERO: Address = Address.fromString("0x0000000000000000000000000000000000000000");
export const WETH_ADDRESS: Address = Address.fromString("0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2");
export const USDC_ADDRESS: Address = Address.fromString("0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48");

