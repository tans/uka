"use client";

import { useEffect, useState } from "react";
import ManualForm from "./form";
import { Button, buttonVariants } from "@/components/ui/button";
import CopyButton from "@/app/order/[hash]/copy-button";
import { CopyIcon } from "@radix-ui/react-icons";

export default function (props) {
  let [list, setList] = useState([]);
  useEffect(function () {
    (async function () {
      let { list } = await (await fetch("/admin/api/manual")).json();
      setList(list);
    })();
  }, []);
  return (
    <>
      {list.map((item) => (
        <div
          key={item.id}
          className="w-full py-1 px-2 my-2 bg-gray-50 rounded-md flex items-center"
        >
          <div className="flex-1">{item.log}</div>
          <div className="w-20">{item.quota} </div>
          <div className="w-32">m-{item.hash} </div>
          <div className="w-8">
            {item.used && <CheckIcon className="w-6 h-6"></CheckIcon>}
          </div>
          <ManualForm manual={item}>
            <div className={buttonVariants()}>修改</div>
          </ManualForm>

          <div className="ml-2">
            <CopyButton text={"m-" + item.hash}>
              <CopyIcon></CopyIcon>
            </CopyButton>
          </div>
        </div>
      ))}
    </>
  );
}
