"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BNB, USDT } from "ccy-icons";
import { useState } from "react";
export default function ({ kaList }) {
  let [kaId, setKaId] = useState(kaList[0].id);

  let submitOrder = async () => {
    let { order } = await (
      await fetch("/order", {
        method: "POST",
        body: JSON.stringify({
          kaId: kaId,
        }),
      })
    ).json();
    let orders = localStorage.getItem("orders");
    orders = JSON.parse(orders || "[]");
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    location.href = "/order/" + order.hash;
  };

  return (
    <>
      <div className="my-2 flex ">
        <div className="p-2 mr-2 bg-gray-100 border rounded-md inline-block">
          <BNB className="w-6 h-6" />
        </div>
        <div className="p-2 bg-gray-100 border rounded-md inline-block">
          <USDT className="w-6 h-6" />
        </div>
      </div>
      <div className="my-2">选择套餐</div>
      <RadioGroup
        value={kaId}
        onValueChange={(value) => {
          setKaId(value);
        }}
      >
        {kaList.map((item) => (
          <div
            key={item.id}
            className="flex hover:bg-gray-100 items-center space-x-2 border px-2 rounded-md"
          >
            <RadioGroupItem value={item.id} id={"option-" + item.id} />
            <Label htmlFor={"option-" + item.id} className="w-full">
              <div className="flex items-center">
                <div className="flex-1 p-4"> {item.title} </div>
                <div className="text-red-800">{item.price} U</div>
              </div>
            </Label>
          </div>
        ))}
      </RadioGroup>

      <div className="mt-4">
        <Button onClick={submitOrder}>提交订单</Button>
      </div>
    </>
  );
}
