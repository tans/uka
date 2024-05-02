export async function fetchTransactions() {
  let contractAddress = process.env.BSC_USDT_TOKEN;
  let address = process.env.BSC_WALLET;
  let endpoint = "https://api.bscscan.com/api";
  if (process.env.TEST) {
    endpoint = "https://api-testnet.bscscan.com/api";
  }
  let url = `${endpoint}?module=account&action=tokentx&contractaddress=${contractAddress}&address=${address}&page=1&offset=5&startblock=0&endblock=999999999&sort=asc&apikey=${process.env.BSCSCAN_KEY}`;

  let { result } = await (await fetch(url)).json();
  return result;
}
