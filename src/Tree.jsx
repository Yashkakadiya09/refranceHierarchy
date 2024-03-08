import React, { useEffect, useState } from "react";

const Tree = ({ data, parentId = "", onTreeDataUpdate }) => {
  const [listData, setListData] = useState([]);
  useEffect(() => {
    setListData(data);
  }, [data]);

  const filteredData = listData?.filter(
    (item) => item.refrenceCategory === parentId
  );

  const handleDragStart = (e, item) => {
    // Use dataTransfer to pass data during drag
    e.dataTransfer.setData("application/json", JSON.stringify(item));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetItem) => {
    e.preventDefault();

    const draggedItem = JSON.parse(e.dataTransfer.getData("application/json"));

    if (!isDescendantInArray(draggedItem.id, targetItem)) {
      if (draggedItem.id !== targetItem.id) {
        const updatedData = updateData(data, draggedItem.id, targetItem.id);
        onTreeDataUpdate(updatedData);
      }
    }
    // console.log(isDescendantInArray(draggedItem.id, targetItem));
  };

  const isDescendantInArray = (parentId, item) => {
    if (item.refrenceCategory === parentId) {
      return true;
    }

    if (item.refrenceCategory) {
      const parentItem = listData.find(
        (dataItem) => dataItem.id === item.refrenceCategory
      );

      return isDescendantInArray(parentId, parentItem);
    }

    return false;
  };

  const updateData = (data, draggedItemId, newParentId) => {
    return data.map((item) => {
      if (item.id === draggedItemId) {
        return {
          ...item,
          refrenceCategory: newParentId,
        };
      }
      return item;
    });
  };

  return (
    <div style={{ margin: "1vw" }}>
      {filteredData.map((item) => (
        <>
          <div
            key={item.id}
            title={item?.title}
            style={{
              marginTop: "1vw",
              backgroundColor: "white",
              padding: "0.5vw 0.5vw 0.5vw 1vw",

              boxShadow: "1px 1px 2px #99ff66",
              borderRadius: "20px",
              maxWidth: "15vw",
              overflow: "hidden",
            }}
            draggable={item.refrenceCategory === "" ? false : true}
            onDragStart={(e) => handleDragStart(e, item)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, item)}
          >
            <span>{item.title}</span>
          </div>

          <div style={{ paddingLeft: "2vw" }}>
            <Tree
              data={data}
              parentId={item.id}
              onTreeDataUpdate={onTreeDataUpdate}
            />
          </div>
        </>
      ))}
    </div>
  );
};

export default Tree;
