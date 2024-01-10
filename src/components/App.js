import "./App.css";
import { useState } from "react";
import { create } from "ipfs-http-client";

const client = create("http://127.0.0.1:5002/api/v0");

const App = () => {
    const [file, setFile] = useState(null);
    const [urlArr, setUrlArr] = useState([]);

    const retrieveFile = (e) => {

      const data = e.target.files[0];
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);

      reader.onloadend = () => {
        setFile(Buffer(reader.result));
      };

      e.preventDefault();
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
        console.log("click")
      try {
        const created = await client.add(file);
        const url = `http://127.0.0.1:9090/ipfs/${created.path}`;
        fetch(url,{
          "headers":{
            "Content-Type":"application/json"
          }
        }).then(d=>d.json()).then(d=>console.log(d))
        // setUrlArr((prev) => [...prev, url]);
      } catch (error) {
        console.log(error.message);
      }
    };

  return (
    <div className="App">
      <header className="App-header">IPFS Project</header>

      <div className="main">
        <form onSubmit={handleSubmit}>
          <input type="text" onChange={(e)=>setFile(e.target.value)} />
          <button type="submit" className="button">Submit</button>
        </form>
      </div>

      <div className="display">
        {urlArr.length !== 0
          ? urlArr.map((el,i) => <p  key={i} >{el}</p>)
          : <h3>Upload data</h3>}
      </div>
    </div>
  );
};

export default App;
