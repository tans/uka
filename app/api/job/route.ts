import { fetchTransactions } from "@/lib/chain";
import prisma from "@/lib/prisma";

import BigNumber from "bignumber.js";
import dayjs from "dayjs";

export const dynamic = "force-dynamic";

interface Tx {
  blockNumber: String;
  timeStamp: String;
  hash: String;
  nonce: String;
  blockHash: String;
  from: String;
  contractAddress: String;
  to: String;
  value: String;
  tokenName: String;
  tokenSymbol: String;
  tokenDecimal: String;
  transactionIndex: String;
  gas: String;
  gasPrice: String;
  gasUsed: String;
  cumulativeGasUsed: String;
  input: String;
  confirmations: String;
}
let checkTx = async (tx: Tx) => {
  let price = new BigNumber(tx.value)
    .dividedBy("1000000000000000000")
    .toString();
  let _tx = await prisma.tx.findFirst({
    where: {
      hash: tx.hash,
    },
  });
  if (_tx?.checked) {
    return;
  }

  let order = await prisma.order.findFirst({
    where: {
      price: price,
      createdAt: {
        gt: dayjs().add(-30, "minute").toDate(),
      },
    },
  });

  if (!order) {
    return;
  }
  if (order.payed) {
    console.log("order checked ", order);
  }

  await prisma.order.update({
    where: { id: order.id },
    data: {
      payed: true,
    },
  });

  await prisma.tx.create({
    data: {
      checked: true,
      orderId: order.id,
      hash: tx.hash,
    },
  });
};

export async function GET(request) {
  let result = await fetchTransactions();
  for (let tx of result) {
    await checkTx(tx);
  }
  return Response.json({ status: true });
}
