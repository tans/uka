"use client";

import { useEffect, useState } from "react";
import KaForm from "./form";
import { Button, buttonVariants } from "@/components/ui/button";

export default function KaList(props) {
  let [list, setList] = useState([]);
  useEffect(function () {
    (async function () {
      let { list } = await (await fetch("/admin/api/ka")).json();
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
          <div className="flex-1">{item.title}</div>
          <div className="w-20">{item.price}</div>
          <KaForm ka={item}>
            <div className={buttonVariants()}>修改</div>
          </KaForm>
        </div>
      ))}
    </>
  );
}
