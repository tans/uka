import Container from "@/components/app/container";
import prisma from "@/lib/prisma";
import Countdown from "./countdown";
import dayjs from "dayjs";
import { BNB, USDT } from "ccy-icons";
import CopyButton from "./copy-button";
import { CopyIcon, UpdateIcon } from "@radix-ui/react-icons";

export default async function ({ searchParams, params }) {
  let { hash } = params;
  let order = await prisma.order.findFirst({
    where: {
      hash: hash,
    },
    include: {
      ka: true,
    },
  });
  if (!order) {
    return <>没有找到订单数据：{hash}</>;
  }
  return (
    <>
      <Container>
        {!order.payed && (
          <>
            <div className="text-center text-gray-800 font-black py-4">
              订单截止支付时间
            </div>
            <div className="text-center flex justify-center">
              <Countdown
                endTime={dayjs(order.createdAt)
                  .add(30, "minute")
                  .toDate()
                  .getTime()}
              >
                <div className="text-lg text-red-800">已过期</div>
              </Countdown>
            </div>
          </>
        )}

        <div className="my-4 bg-gray-50 p-4">
          <div>注意事项：</div>
          <div>1. 复制金额和地址到钱包进行转账</div>
          <div>2. 请确认小数准确, 否则无法自动确认交易。</div>
          <div className="flex items-center">
            3. 使用BSC链的USDT
            <USDT className="w-4 h-4"></USDT>
          </div>
        </div>

        <div className="flex items-center">
          收款地址: &nbsp;
          <CopyButton text={order.address}>
            <CopyIcon></CopyIcon>
          </CopyButton>
        </div>
        <div className="flex items-start">
          <div className="font-black text-gray-600 mr-2">{order.address}</div>
        </div>

        <div className="leading-10 text-lg">
          <div className="mt-8 flex items-center">
            <div>套餐: </div>
            <div>{order.ka.title}</div>
          </div>

          <div className="flex items-center">
            <div>支付金额:</div>
            <div className="text-red-800 font-black mr-4">{order.price}</div>
            <CopyButton text={order.price}>复制</CopyButton>
          </div>
        </div>

        <div className="mt-4 text-blue-900 flex items-center">
          <UpdateIcon className="animate-spin"></UpdateIcon>
          <div>自动检查链上交易数据中</div>
        </div>
      </Container>
    </>
  );
}
