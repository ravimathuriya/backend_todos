import React from "react";

export default function Alert(props) {
  const capital = (word) => {

    if (word === "danger") {
        word = "error"
    }

    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  
  return (
    <div style={{height:"60px"}}>

      {props.alert && (
        <div
          className={`alert alert-${props.alert.tpe} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{capital(props.alert.tpe)}</strong> : {props.alert.msg}
        </div>
      )}
    </div>
  );
}