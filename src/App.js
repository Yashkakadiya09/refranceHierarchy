import { useState } from "react";
import { toast } from "react-toastify";
import Tree from "./Tree";

function App() {
  const [title, setTitle] = useState("");

  const [dropId, setDropId] = useState(null);
  const [allData, setAllData] = useState([]);
  const notify = () => toast("Title Is Alredy Exist!");

  const handleClick = () => {
    let ExistTitle = allData.find((data, i) => data?.title === title);
    if (!ExistTitle) {
      const DataArray = [
        {
          id: new Date().getTime().toString() + 1,
          title: title,
          refrenceCategory:
            dropId === null ? "" : dropId === "RefrenceCategory" ? "" : dropId,
        },
      ];
      setAllData((prev) => [...prev, ...DataArray]);
    } else {
      notify();
    }
    setTitle("");
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    const draggedItem = JSON.parse(e.dataTransfer.getData("application/json"));

    let createParent = allData.map((data) => {
      if (data.id === draggedItem.id) {
        data.refrenceCategory = "";
      }
      return data;
    });
    setAllData(createParent);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "40%",
            height: "25vw",
            padding: "2vw",
            margin: "5vw 2vw 2vw 5vw",
            gap: "1vw",
            boxShadow: "1px 1px 30px #cccccc",
            borderRadius: "20px",
            backgroundColor: "#b3ffb3",
          }}
        >
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <h3>
              Create
              <span
                style={{
                  color: "red",
                }}
              >
                Hierarchy
              </span>
            </h3>
          </div>
          <h4>Title</h4>
          <input
            type="text"
            name="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h4>Refrence Category</h4>
          <select
            name="RefrenceCategory"
            id="RefrenceCategory"
            onChange={(e) => setDropId(e.target.value)}
          >
            <option value="RefrenceCategory">RefrenceCategory:-</option>
            {allData?.map((data, i) => {
              return (
                <option key={i + 2} value={data?.id}>
                  {data?.title}
                </option>
              );
            })}
          </select>
          <div>
            <button
              style={{ marginTop: "1vw" }}
              type="button"
              className="btn btn-danger"
              onClick={() => handleClick()}
            >
              Save
            </button>
          </div>
        </div>
        <div
          style={{
            width: "50%",
            margin: "3vw 10vw",
            padding: "2vw 2vw",
            boxShadow: "1px 1px 30px #cccccc",
            borderRadius: "20px",
            backgroundColor: "#b3ffb3",
          }}
        >
          <div
            style={{
              width: "100%",

              paddingLeft: "5vw",
            }}
          >
            <h3>
              H
              <span
                style={{
                  color: "red",
                }}
              >
                ierarch
              </span>
              y
            </h3>
          </div>
          <Tree data={allData} parentId="" onTreeDataUpdate={setAllData} />
          {allData.length > 1 && (
            <div
              style={{
                marginTop: "1vw",
                backgroundColor: "rosybrown",
                padding: "1vw",

                boxShadow: "1px 1px 10px black",
                borderRadius: "50%",
                width: "10vw",
                overflow: "hidden",
              }}
              draggable={false}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e)}
            >
              + Parent
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
