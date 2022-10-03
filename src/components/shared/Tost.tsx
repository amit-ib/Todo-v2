import React, { useEffect, useState } from "react";
import { tostType } from "../../App";

interface Props {
  delay: number;
  //children: React.ReactNode;
  setTost: React.Dispatch<React.SetStateAction<tostType>>;
  tostMessage: string;
  tostType: string;
}
const Tost = ({ delay, setTost, tostMessage, tostType }: Props) => {
  useEffect(() => {
    console.log("first");
    const timer = setTimeout(() => {
      setTost({ tostState: false, tostMessage: "", tostType: "" });
    }, delay);
    return () => clearTimeout(timer);
  }, [tostMessage]);

  return (
    <div className={`alert alert-${tostType}`}>
      <div className={`${tostType}`}></div> {tostMessage}
    </div>
  );
};

export default Tost;
