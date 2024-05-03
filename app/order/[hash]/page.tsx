import Container from "@/components/app/container";
import prisma from "@/lib/prisma";
import Countdown from "./countdown";
import dayjs from "dayjs";
import { BNB, USDT } from "ccy-icons";
import CopyButton from "./copy-button";
import {
  CheckIcon,
  CopyIcon,
  InfoCircledIcon,
  UpdateIcon,
} from "@radix-ui/react-icons";
import Loop from "./loop";

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
        <Loop payed={order.payed} hash={order.hash}></Loop>
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

        <div className="bg-gray-50 p-4 rounded border shadow-sm">
          <div className="my-2 text-xl">收款地址: &nbsp;</div>
          <div className="font-black text-gray-600 mr-2">{order.address}</div>

          {!order.payed && (
            <CopyButton text={order.address}>
              <CopyIcon></CopyIcon>
              复制
            </CopyButton>
          )}
        </div>

        <div className="bg-gray-50 p-4 rounded border shadow-sm mt-4">
          <div className="my-2 text-xl">支付金额:</div>
          <div className="flex items-center">
            <div>套餐: </div>
            <div>{order.ka.title}</div>
          </div>

          <div className="flex items-center">
            <div className="text-red-800 font-black mr-4">{order.price} U</div>
          </div>
          {!order.payed && (
            <CopyButton text={order.price}>
              <CopyIcon></CopyIcon>
              复制
            </CopyButton>
          )}
        </div>

        {!order.payed && (
          <div className="mt-4 text-blue-900 flex items-center">
            <UpdateIcon className="animate-spin"></UpdateIcon>
            <div>自动检查链上交易数据中</div>
          </div>
        )}

        {order.payed && (
          <div>
            <div className="mt-4 flex items-center">
              <CheckIcon className="w-8 h-8 text-red-900"></CheckIcon>
              <div>
                <span className="text-red-900">支付成功</span>，兑换码：
              </div>
              <div className="font-black mr-2">{"key-" + order.hash}</div>
              <CopyButton text={"key-" + order.hash}>
                <CopyIcon></CopyIcon>
                复制
              </CopyButton>
            </div>
            <div className="mt-2 flex items-center text-gray-400">
              <InfoCircledIcon className="w-6 h-6"></InfoCircledIcon>
              复制兑换码到公众号发送兑换
            </div>
          </div>
        )}
      </Container>
    </>
  );
}
