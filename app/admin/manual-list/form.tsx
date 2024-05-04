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

export default function (props) {
  let [form, setForm] = useState(
    props.manual || {
      quota: 1,
      log: "",
    },
  );
  return (
    <>
      <Drawer>
        <DrawerTrigger>{props.children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerDescription>
              <div>
                <div className="mt-2">备注</div>
                <Input
                  value={form.log}
                  type="text"
                  onChange={(e) => {
                    form.log = e.target.value;
                    setForm({ ...form });
                  }}
                ></Input>
                <div className="mt-2">额度</div>
                <Input
                  value={form.quota}
                  type="number"
                  onChange={(e) => {
                    form.quota = e.target.value;
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
                  await fetch("/admin/api/manual", {
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
