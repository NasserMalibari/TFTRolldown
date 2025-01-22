import { useState } from "react";
import Shop from "../components/Shop";
import '../css/MainPage.css'
import React from "react";
// import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
// TODO: Meta


export type Unit = {
  name: string;
  starLevel: number;
  position: number;
}

interface ClonePosition {
  x: number;
  y: number;
}

function MainPage() {

  const [boardState, setBoardState] = useState<Unit[]>(new Array(28).fill(null));
  const [hovered, setHovered] = useState<boolean[]>(new Array(28).fill(false));

  // const [isDragging, setIsDragging] = useState<boolean>(false);
  const isDraggingRef = React.useRef(false);
  const [clonePosition, setClonePosition] = useState<ClonePosition>({ x: 0, y: 0 });
  const [clonedGroup, setClonedGroup] = useState<SVGElement  | null>(null);
  const clonedGroupElementRef = React.useRef<SVGGElement | null>(null);


  // console.log(clonePosition);
  // Handle mousedown event to initiate cloning and dragging
  // const handleMouseDown = (e: React.MouseEvent): void => {

  //   // const a = (e.target as HTMLElement);
  //   // const b = (e.target as HTMLElement).parentElement;
  //   const c = (e.target as HTMLElement).parentElement?.parentElement as HTMLElement;

  //   // console.log(a);
  //   // console.log(b);
  //   console.log(c);

  //   const groupElement = c;
  //   // console.log
  //   // const groupElement = e.target?.closest('g') as SVGGElement;

  //   if (!groupElement) {
  //     console.error("groupElement not selected");
  //   }
  //   // Clone the group element
  //   const clonedGroupElement = groupElement.cloneNode(true) as SVGGElement;

  //   // Set the cloned group to the state
  //   setClonedGroup(clonedGroupElement);
  //   setIsDragging(true);

  //   // Set the initial position of the cloned group
  //   setClonePosition({
  //     x: e.pageX,
  //     y: e.pageY,
  //   });

  //   // Prevent default behavior
  //   e.preventDefault();

  //   // Mousemove event listener to track the mouse movement
  //   const onMouseMove = (e: MouseEvent): void => {
  //     console.log('move');
  //     console.log(e.pageX)
  //     if (isDragging && clonedGroupElement) {
  //       setClonePosition({
  //         x: e.pageX,
  //         y: e.pageY,
  //       });
  //     }
  //   };

  //   // Mouseup event listener to stop dragging
  //   const onMouseUp = (): void => {
  //     console.log('up')
  //     setIsDragging(false);
  //     setClonedGroup(null);

  //     // Remove the event listeners
  //     document.removeEventListener("mousemove", onMouseMove);
  //     document.removeEventListener("mouseup", onMouseUp);
  //   };

  //   // Attach event listeners for mousemove and mouseup
  //   document.addEventListener("mousemove", onMouseMove);
  //   document.addEventListener("mouseup", onMouseUp);
  // };

  const handleMouseDown = (e: React.MouseEvent): void => {
    const c = (e.target as HTMLElement).parentElement?.parentElement as HTMLElement;
    const groupElement = c;
  
    if (!groupElement) {
      console.error("groupElement not selected");
      return;
    }
  
    const clonedGroupElement = groupElement.cloneNode(true) as SVGGElement;
  
    // Update refs
    clonedGroupElementRef.current = clonedGroupElement;
    isDraggingRef.current = true;
  
    setClonedGroup(clonedGroupElement);
    // setIsDragging(true);
  
    setClonePosition({
      x: e.pageX,
      y: e.pageY,
    });
  
    const onMouseMove = (e: MouseEvent): void => {
      if (isDraggingRef.current && clonedGroupElementRef.current) {
        setClonePosition({
          x: e.pageX,
          y: e.pageY,
        });
      }
    };
  
    const onMouseUp = (): void => {
      isDraggingRef.current = false;
      clonedGroupElementRef.current = null;
  
      // setIsDragging(false);
      setClonedGroup(null);
  
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  function buyUnit(unit: Unit): void {
    console.log(unit.name)


    const n = 5;
    setBoardState((prevBoardState) => {
      const updatedBoard = [...prevBoardState];
      updatedBoard[n] = unit; // Update the 5th position
      updatedBoard[10] = unit; // Update the 10th position
      return updatedBoard;
    });
    return;
  }


  function moveUnit(from: number, to: number) {

    if (boardState[from] === null) {
      console.error("No unit in from square");
    }

    setBoardState((prevBoardState) => {
      const newBoardState = [...prevBoardState]; // Create a copy of the array
      [newBoardState[from], newBoardState[to]] = [newBoardState[to], newBoardState[from]]; // Swap elements
      return newBoardState; // Update the state with the new array
    });
  }
  
  // console.log(boardState)
  // const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
  //   const draggedElement = (e.target as HTMLElement).outerHTML;
  //   const draggedElementParentId = (e.target as HTMLElement).parentElement?.id;
  
  //   // Get the new position after dragging
  //   // const newPosition = { x: data.x, y: data.y };
    
  //   console.log(`${draggedElement}`)
  //   console.log(`Dragged element ID: ${draggedElementParentId}`);
  //   // console.log(`New position: x = ${newPosition.x}, y = ${newPosition.y}`);
  //   // get from index
    

  //   // get to index

  //   // setBoardState((prevBoardState) => {
  //   //   const newBoardState = [...prevBoardState]; // Create a copy of the array
  //   //   [newBoardState[5], newBoardState[10]] = [newBoardState[10], newBoardState[5]]; // Swap elements
  //   //   return newBoardState; // Update the state with the new array
  //   // });
  //   // setPosi
  // }
  // console.log(clonedGroup)

  return (
    <>
      <h1 className="text-4xl text-blue-500">Vite Project</h1>
      <div className="flex flex-col" >
        <div className="border">INFO</div>
        <div className="">
          <div className="border">Traits</div>
          <div className="border" id="board">
                  {/* Render the clone group */}
                {clonedGroup && (
                  <div
                    style={{
                      position: "absolute",
                      left: `${clonePosition.x}px`,
                      top: `${clonePosition.y}px`,
                      height: '100px',
                      width: '100px',
                      backgroundColor: 'blue',
                      pointerEvents: "none",
                    }}
                    // dangerouslySetInnerHTML={{ __html: clonedGroup.outerHTML }}
                  />
                )}
            <svg className="w-full md:w-[684px] xl:w-[760px]" viewBox="0 0 760 420">
              <g transform="translate(22, 14)">
                {boardState.map((unit, index) =>
                  unit ? (
                      <g  key={index} id={`hex${index}`} transform={indexToTransformString(index)}
                      onMouseDown={handleMouseDown}>
                        <path
                          d="M48.49742261192856 0L96.99484522385713 28L96.99484522385713 84L48.49742261192856 112L0 84L0 28Z"
                          fill="transparent"
                          transform="translate(-5.5, -6)"
                        ></path>
                        <path
                          d="M43.30127018922193 0L86.60254037844386 25L86.60254037844386 75L43.30127018922193 100L0 75L0 25Z"
                          fill="rgba(0, 0, 0, 0.6)"
                        ></path>
                        <g>
                          <path
                            d="M43.30127018922193 0L86.60254037844386 25L86.60254037844386 75L43.30127018922193 100L0 75L0 25Z"
                            fill="transparent"
                            stroke="rgba(187, 187, 187, 0.75)"
                            strokeWidth="3.5"
                            transform="translate(0.5, 0.5)"
                          ></path>
                        </g>
                      </g>
                  ) : (
                    // empty hex
                    <g key={index} id={`hex${index}`} transform={indexToTransformString(index)}>
                      <path
                        d="M48.49742261192856 0L96.99484522385713 28L96.99484522385713 84L48.49742261192856 112L0 84L0 28Z"
                        fill="transparent"
                        transform="translate(-5.5, -6)"
                      ></path>
                      <path
                        onMouseOver={() => 
                          isDraggingRef.current &&
                          setHovered((prev) => {
                          const newHovered = [...prev];
                          newHovered[index] = true;
                          return newHovered;
                        })}
                        onMouseLeave={
                          () => 
                            setHovered((prev) => {
                            const newHovered = [...prev];
                            newHovered[index] = false;
                            return newHovered;
                          })
                        }
                        d="M43.30127018922193 0L86.60254037844386 25L86.60254037844386 75L43.30127018922193 100L0 75L0 25Z"
                        // fill="rgba(0, 0, 0, 0.6)"
                        fill={hovered[index] ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.6)"}
                      ></path>
                    </g>
                  )
                )}
              </g>
            </svg>
          </div>
        </div>
        <Shop buyUnit={buyUnit} />
      </div>
    </>
)

}

export default MainPage;

function indexToTransformString(index: number): string {

  switch (index) {
    case 0:
      return "translate(48,292)";
    case 1:
      return "translate(144,292)";
    case 2:
      return "translate(240,292)";
    case 3:
      return "translate(336,292)";
    case 4:
      return "translate(432,292)";
    case 5:
      return "translate(528,292)";
    case 6:
      return "translate(624,292)";
    case 7:
      return "translate(0,196)";
    case 8:
      return "translate(96,196)";
    case 9:
      return "translate(192,196)";
    case 10:
      return "translate(288,196)";
    case 11:
      return "translate(384,196)";
    case 12:
      return "translate(480,196)";
    case 13:
      return "translate(576,196)";
    case 14:
      return "translate(48,100)";
    case 15:
      return "translate(144,100)";
    case 16:
      return "translate(240,100)";
    case 17:
      return "translate(336,100)";
    case 18:
      return "translate(432,100)";
    case 19:
      return "translate(528,100)";
    case 20:
      return "translate(624,100)";
    case 21:
      return "translate(0,4)";
    case 22:
      return "translate(96,4)";
    case 23:
      return "translate(192,4)";
    case 24:
      return "translate(288,4)";
    case 25:
      return "translate(384,4)";
    case 26:
      return "translate(480,4)";
    case 27:
      return "translate(576,4)";
    default:
      return "";
  }   
}
