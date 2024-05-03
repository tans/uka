"use client";

import { useEffect } from "react";

export default function ({ payed, hash }) {
  useEffect(function () {
    if (!payed) {
      setTimeout(function () {
        fetch("/api/check-pay", {
          method: "POST",
          body: JSON.stringify({
            hash,
          }),
        })
          .then(function (res) {
            return res.json();
          })
          .then(function (json) {
            if (json.payed) {
              location.reload();
            }
          });
      }, 5000);
    }
  }, []);
  return <></>;
}
