import React, { useState } from "react";
import "./App.css";

function App() {
    type Tpoint = {
        x: number;
        y: number;
    };
    const [points, setPoints] = useState<Tpoint[]>([]);
    const [removedPoints, setRemovedPoints] = useState<Tpoint[]>([]);

    function handlePlaceCircle(e: React.MouseEvent<HTMLDivElement>) {
        const { clientX, clientY } = e;
        setPoints([...points, { x: clientX, y: clientY }]);
    }

    function handleUndo() {
        const newPoints = [...points];
        const poppedPoints = newPoints.pop();
        if (!poppedPoints) return;
        setRemovedPoints([...removedPoints, poppedPoints]);
        setPoints(newPoints);
    }

    function handleRedo() {
        const newRemovedPoints = [...removedPoints];
        const poppedPoints = newRemovedPoints.pop();
        if (!poppedPoints) return;
        setPoints([...points, poppedPoints]);
        setRemovedPoints(newRemovedPoints);
    }

    return (
        <>
            <button className="button" disabled={points.length == 0} onClick={handleUndo}>
                Undo
            </button>
            <button className="button" disabled={removedPoints.length == 0} onClick={handleRedo}>
                Redo
            </button>
            <div className="App" onClick={handlePlaceCircle}>
                {points.map((point, index) => (
                    <div
                        key={index}
                        className="point"
                        style={{ left: point.x - 5 + "px", top: point.y - 10 + "px" }}
                    ></div>
                ))}
            </div>
        </>
    );
}

export default App;
