import "./styles.css";
import { useEffect, useState } from "react";
const Row = 3;
const Col = 3;
let order = 0;
let isAll = false;
export default function App() {
  const [board, setBoard] = useState([]);
  const [selected, setSelected] = useState([]);
  useEffect(() => {
    setBoard(createBoard());
  }, []);

  useEffect(() => {
    const copyBoard = [...board];
    const findLength = board.filter((el) => el !== null);
    if (selected.length === findLength.length) {
      isAll = true;
    } else {
      isAll = false;
    }
    if (isAll) {
      selected.forEach((el, index) => {
        const ele = el;
        const newFileme = copyBoard.find((el) => el?.id === ele);
        return setTimeout(() => {
          newFileme.isClicked = false;
          setSelected([]);
          setBoard(copyBoard);
        }, 1000 * (index + 1));
      });
    }
  }, [selected, board]);

  function createBoard() {
    let row = [];
    let pointer = 1;
    for (let i = 0; i < Row; i++) {
      for (let j = 0; j < Col; j++) {
        if (!(i === 1 && j > 0)) {
          row.push({ i, j, isClicked: false, order: null, id: pointer });
          pointer++;
        } else {
          row.push(null);
        }
      }
    }
    return row;
  }

  const handleClick = (currentIdx) => {
    const copyBoard = [...board];
    const cellValue = copyBoard.find((el) => el?.id === currentIdx);
    cellValue.isClicked = true;
    cellValue.order = ++order;

    if (!selected.includes(cellValue?.id)) {
      setSelected((prev) => [...prev, cellValue.id]);
    } else {
      const deleteThat = selected.filter((el) => el.id !== cellValue.id);
      setSelected(deleteThat);
    }
    setBoard(copyBoard);
  };

  return (
    <div className="App">
      {board.map((col, i) => {
        if (col !== null) {
          return (
            <div
              style={{ backgroundColor: col.isClicked ? "green" : "" }}
              onClick={() => handleClick(col.id)}
              key={col.id}
              className="cell"
            ></div>
          );
        } else {
          return <div key={`index-${i}`}></div>;
        }
      })}
    </div>
  );
}
