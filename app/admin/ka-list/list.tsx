"use client";

import { useEffect, useState } from "react";

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
        <div key={item.id}>
          <div>{item.title}</div>
          <div>{item.price}</div>
        </div>
      ))}
    </>
  );
}
