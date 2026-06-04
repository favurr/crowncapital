export async function getCryptoPrices() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,usd-coin&vs_currencies=usd",
    { cache: "no-store" }, // ensures fresh data
  );

  if (!res.ok) throw new Error("Failed to fetch crypto prices");

  const data = await res.json();

  return {
    BTC: 1 / data.bitcoin.usd,
    ETH: 1 / data.ethereum.usd,
    USDT: 1 / data.tether.usd,
    USDC: 1 / data["usd-coin"].usd,
  };
}

export async function getDepositCryptoPrices() {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether,usd-coin&vs_currencies=usd",
    { cache: "no-store" }, // ensures fresh data
  );

  if (!res.ok) throw new Error("Failed to fetch crypto prices");

  const data = await res.json();

  return {
    BTC: 1 * data.bitcoin.usd,
    ETH: 1 * data.ethereum.usd,
    USDT: 1 * data.tether.usd,
    USDC: 1 * data["usd-coin"].usd,
  };
}
