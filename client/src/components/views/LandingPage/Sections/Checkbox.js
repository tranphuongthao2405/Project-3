import React, { useState } from "react";
import { Checkbox, Collapse } from "antd";

const { Panel } = Collapse;

function CheckBox(props) {
  const [check, setCheck] = useState([]);
  const handleToggle = (id) => {
    const currentIndex = check.indexOf(id);
    const newCheck = [...check];

    if (currentIndex === -1) {
      newCheck.push(id);
    } else {
      newCheck.splice(currentIndex, 1);
    }

    setCheck(newCheck);

    props.handleFilters(newCheck);
  };

  const renderCheckboxLists = () =>
    props.list &&
    props.list.map((value, index) => (
      <React.Fragment key={index}>
        <Checkbox
          onChange={() => handleToggle(value._id)}
          type="checkbox"
          checked={check.indexOf(value._id) === -1 ? false : true}
        />
        &nbsp;&nbsp;
        <span>{value.name}</span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={["0"]}>
        <Panel header="Places" key="1">
          {renderCheckboxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
