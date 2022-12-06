import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./Screen1.css";
import { additem } from "../redux/action";
import { useNavigate } from "react-router-dom";

const Screen1 = () => {

  let navigates = useNavigate();
  const dispatch = useDispatch();
  const [value, setvalue] = useState(0);
  const [count, setCount] = useState(0);
  const [minvalue, setminvalue] = useState(0);
  const [maxvalue, setmaxvalue] = useState(20);
  const [apidtata, setapidata] = useState<any[]>([]);
  const [loading, setloading] = useState(true);
  const [jsondata, setjasondata] = useState("");
  const [data, setdata] = useState<any[]>([]);

  useEffect(() => {
    if (apidtata?.length === 0) {
      fetchdata();
      console.log("first time fetchdata called")
      setCount(prevCount => prevCount + 1)
    }
    else {
      const timer = setInterval(() => {
        setCount(prevCount => prevCount + 1)
        fetchdata();
        console.log("fetchdata called after 10 second" + " " + "and count is" + " " + count);
      }, 10000)
      return () => clearTimeout(timer);
    }
  }, [apidtata]);


  function showjson(e: any) {
    console.log(e);
    apidtata.filter((a, b) => {
      if (a.author === e) {
        var obj = a;
        var p = JSON.stringify(obj);
        setjasondata(p);
        dispatch(additem(p));
        console.log("jsondata called" + jsondata);
        //console.log(jsondata[0]+" "+"index 0")
        navigatepage();
      }
    })
  }

  const navigatepage = () => {
    navigates("/screen2")
  }

  function fetchdata() {
    try {
      fetch(`https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${count}`).then((resp) => {
        resp.json().then((dat) => {
          var p = dat.hits;
          setapidata([...apidtata, ...p]);
          if (data.length === 0) {
            setdata([...apidtata, ...p]);
          }
          console.log(apidtata);
          console.log(apidtata.length + 20 + " " + "length array" + " " + count + " " + " is count");
          setloading(false);
        })
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  var length = (apidtata.length) / 20;
  console.log("length", length);


  function pagination(a: any) {
    console.log("called" + a);
    setvalue(a);
    var p = a + 1;
    setminvalue(a * 20);
    setmaxvalue(p * 20);
    console.log(minvalue + " " + maxvalue + " " + "daat");

  }


  function nextpage() {
    var t = value + 1;
    setvalue(t);
    var o = value + 2;
    setminvalue(t * 20);
    setmaxvalue(o * 20);
  }

  function previouspage() {
    var t = value - 1;
    var o = value;
    setvalue(t);
    setminvalue(t * 20);
    setmaxvalue(o * 20);
  }

  return (
    <div  >

      {loading === true ?
        <div>
          <h1>Loading....</h1>
        </ div> :
        <div  >

          <table>

            <tr  >
              <th >sr.no</th>
              <th>title</th>
              <th>URL</th>
              <th>created_at</th>
              <th>author</th>
            </tr>

            {apidtata.map((item: any, b: any) => {

              if (b >= minvalue && maxvalue > b) {

                if (item.title === null) {
                  item.title = "NA"
                }
                else if (item.url === null) {
                  item.url = "NA"
                }
                else if (item.created_at === null) {
                  item.created_at = "NA"
                }
                else if (item.author === null) {
                  item.author = "NA"
                }
                return (
                  <tr key={b} onClick={() => showjson(item.author)}>
                    <td className="a">{b + 1}</td>
                    <td className="b">{item.title}</td>
                    <td className="c">{item.url}</td>
                    <td className="d">{item.created_at}</td>
                    <td className="e">{item.author}</td>
                  </tr>
                )
              }
            })}

          </table>
          <div style={{ display: "flex", flexDirection: "row",flexWrap:"wrap" ,margin: 10 }}>
            {apidtata.length >= 59 ? <button onClick={() => { nextpage() }}>next</button> : <button disabled onClick={() => { nextpage() }}>next</button>}
            {apidtata.map((a: any, b: any) => {
              if (length >= b + 2) {

                return (
                  <button key={b} onClick={() => { pagination(b) }} className="btn">{b + 1}</button>
                )
              }
            })}
            {maxvalue === 20 ? <button disabled onClick={() => { previouspage() }}>previous</button> : <button onClick={() => { previouspage() }}>previous</button>}
          </div>
        </div>
      }

    </div>
  )
}

export default Screen1;
