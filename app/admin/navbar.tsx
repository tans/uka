"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Link } from "next-view-transitions";
export default function (props) {
  let { id, current } = props;

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger data-state={current == "home" ? "open" : "closed"}>
          <Link href={"/admin"}>首页</Link>
        </MenubarTrigger>
        <MenubarTrigger data-state={current == "order" ? "open" : "closed"}>
          <Link href={"/admin/order-list"}>订单</Link>
        </MenubarTrigger>
        <MenubarTrigger data-state={current == "ka" ? "open" : "closed"}>
          <Link href={"/admin/ka-list"}>套餐</Link>
        </MenubarTrigger>
        <MenubarTrigger data-state={current == "manual" ? "open" : "closed"}>
          <Link href={"/admin/manual-list"}>手发</Link>
        </MenubarTrigger>
      </MenubarMenu>
    </Menubar>
  );
}
