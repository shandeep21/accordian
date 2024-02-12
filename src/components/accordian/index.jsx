import { useState } from "react";
import data from "./data";
import "./styles.css";

export default function Accordian() {
  const [getSelected, setSelected] = useState(null);
  const [getMultiSelectEnabled, setMultiSelectEnabled] = useState(false);
  const [getMultiSelect, setMultiSelect] = useState([]);

  function singleClick(id) {
    console.log("id is ", id);
    setSelected(id === getSelected ? null : id);
  }

  function multiSelect(id) {
    let copyGetMultiSelect = [...getMultiSelect];
    setMultiSelect(copyGetMultiSelect);
    const findIndexOfSelectedId = copyGetMultiSelect.indexOf(id);
    if (findIndexOfSelectedId === -1) {
      copyGetMultiSelect.push(id);
    } else {
      copyGetMultiSelect.splice(findIndexOfSelectedId, 1);
    }
    console.log(">>>>>>", findIndexOfSelectedId, copyGetMultiSelect);
  }

  function toggleAndClearSelection() {
    setMultiSelectEnabled(!getMultiSelectEnabled);
    setSelected(null);
    setMultiSelect([]);
  }
  return (
    <div className="wrapper">
      <div className="accordian">
        <button
          onClick={() => toggleAndClearSelection()}
          //   onClick={() => setMultiSelectEnabled(!getMultiSelectEnabled)}
          className={
            getMultiSelectEnabled ? "multibuttonenable" : "mulitbuttondisable"
          }
        >
          Multi Select
        </button>
        {data && data.length >= 1 ? (
          data.map((dataItem) => (
            <div className="dataItem">
              <div
                onClick={
                  getMultiSelectEnabled
                    ? () => multiSelect(dataItem.id)
                    : () => singleClick(dataItem.id)
                }
                className="dataTitle"
              >
                <h1>{dataItem.question}</h1>
                <span>+</span>
              </div>
              {getSelected === dataItem.id ||
              getMultiSelect.indexOf(dataItem.id) != -1 ? (
                <div className="content">{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>No Data Available</div>
        )}
      </div>
    </div>
  );
}
