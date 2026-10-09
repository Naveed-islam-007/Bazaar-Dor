"use client";

import { useEffect, useState } from "react";

const DateText = () => {
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(
      new Date().toLocaleDateString("bn-BD", {
        dateStyle: "full",
        timeZone: "Asia/Dhaka",
      })
    );
  }, []);

  return <span className="min-h-4 text-xs text-gray-600">{date}</span>;
};

export default DateText;