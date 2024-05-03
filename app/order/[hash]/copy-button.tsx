"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function ({ text, children }) {
  return (
    <>
      <CopyToClipboard text={text}>
        <Button
          onClick={() => {
            toast({ title: "复制成功", duration: 1000 });
          }}
        >
          {children}
        </Button>
      </CopyToClipboard>
    </>
  );
}
