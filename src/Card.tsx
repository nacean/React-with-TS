import React from "react";

const Card = ({
  number,
  cvc,
  date,
}: {
  number: number;
  cvc: number;
  date: string;
}) => {
  return (
    <div>
      number : {number}
      cvc : {cvc}
      date : {date}
    </div>
  );
};

export default Card;
