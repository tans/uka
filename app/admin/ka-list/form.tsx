"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState } from "react";

export default function KaForm(props) {
  let [form, setForm] = useState(
    props.ka || {
      price: 1,
      title: "",
    },
  );
  return (
    <>
      <Drawer>
        <DrawerTrigger>{props.children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{form.id ? "修改商品" : "创建商品"}</DrawerTitle>
            <DrawerDescription>
              <div>
                <div className="mt-2">商品标题</div>
                <Input
                  value={form.title}
                  type="text"
                  onChange={(e) => {
                    form.title = e.target.value;
                    setForm({ ...form });
                  }}
                ></Input>
                <div className="mt-2">商品价格</div>
                <Input
                  value={form.price}
                  type="number"
                  onChange={(e) => {
                    form.price = e.target.value;
                    setForm({ ...form });
                  }}
                ></Input>
              </div>
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button
              onClick={async () => {
                let { status } = await (
                  await fetch("/admin/api/ka", {
                    method: "POST",
                    body: JSON.stringify(form),
                  })
                ).json();
                location.reload();
              }}
            >
              提交
            </Button>
            <DrawerClose>
              <Button variant="outline">取消</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
