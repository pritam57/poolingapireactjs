import React from "react";
import { useSelector } from "react-redux";
import "./Screen2.css";
const Screen2 = () => {

    const jsonprint = useSelector((state: any) => state.addingitem);
    var arr = jsonprint.split("," );
    console.log(arr);
    console.log(arr[0]);

    return (

        <div className="main" >
        <div>
            <h1> raw JSON. </h1>
            <div >
                {arr.map((a: any, b: any) => {
                    return (
                        <h4 key={b}>{a},</h4>
                    )
                })}
            </div>
        </div>
    </div>
    )
}

export default Screen2;
