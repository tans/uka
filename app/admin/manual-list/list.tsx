"use client";

import { useEffect, useState } from "react";
import ManualForm from "./form";
import { Button, buttonVariants } from "@/components/ui/button";

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
          <div className="w-8">
            {item.used && <CheckIcon className="w-6 h-6"></CheckIcon>}
          </div>
          <ManualForm manual={item}>
            <div className={buttonVariants()}>修改</div>
          </ManualForm>
        </div>
      ))}
    </>
  );
}
