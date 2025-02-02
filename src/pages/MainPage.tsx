import {  useRef, useState } from "react";
import Shop from "../components/Shop";
import '../css/MainPage.css'
import React from "react";
import Info from "../components/Info";
// TODO: Meta


export type Unit = {
  name: string;
  cost: number;
  starLevel: number;
  traits: string[];
}

// interface ClonePosition {
//   x: number;
//   y: number;
// }

type level = "grey" | "bronze" | "silver" | "gold" | "unique" | "prismatic";

const levelPriority: Record<level, number> = {
  unique: 6,
  prismatic: 5,
  gold: 4,
  silver: 3,
  bronze: 2,
  grey: 1,
};

export type Stage = ["1-1", "1-2", "1-3", "1-4", "2-1", "2-2", "2-3", "2-5", "2-6", "2-7",
  "3-1", "3-2", "3-3", "3-5", "3-6", "3-7",
  "4-1", "4-2", "4-3", "4-5", "4-6", "4-7",
  "5-1", "5-2", "5-3", "5-5", "5-6", "5-7",
  "6-1", "6-2", "6-3", "6-5", "6-6", "6-7",
  "7-1", "7-2", "7-3", "7-5", "7-6", "7-7",
];


export type TraitLevel = {
  name: string;
  level: level;
  numActivated: number;
  numNeeded: number;
}

function MainPage() {

  const [boardState, setBoardState] = useState<(Unit | null)[]>(new Array(28).fill(null));
  const [hovered, setHovered] = useState<boolean[]>(new Array(28).fill(false));
  const [gold, setGold] = useState(0);
  const [level, setLevel] = useState(1);
  // const [isDragging, setIsDragging] = useState<boolean>(false);
  const isDraggingRef = React.useRef(false);
  // const [clonePosition, setClonePosition] = useState<ClonePosition>({ x: 0, y: 0 });
  const [clonedGroup, setClonedGroup] = useState<SVGElement  | null>(null);
  const [stage, setStage] = useState<Stage[number]>("1-1");

  const totals = useRef<{ [key: string]: number }>({});

  const [seed, setSeed] = useState<string | undefined>(undefined);
  const [traits, setTraits] = useState<TraitLevel[]>([]);
  const addGold = (amount: number) => {
    setGold(prev => Math.max(0, prev + amount));
  }

  const updateSeed = (newSeed: string) => {
    setSeed(newSeed);
  }

  const increaseStage = (): void => {
    const stages: Stage = ["1-1", "1-2", "1-3", "1-4", "2-1", "2-2", "2-3", "2-5", "2-6", "2-7",
      "3-1", "3-2", "3-3", "3-5", "3-6", "3-7",
      "4-1", "4-2", "4-3", "4-5", "4-6", "4-7",
      "5-1", "5-2", "5-3", "5-5", "5-6", "5-7",
      "6-1", "6-2", "6-3", "6-5", "6-6", "6-7",
      "7-1", "7-2", "7-3", "7-5", "7-6", "7-7",
    ];;
    const currIndex = stages.indexOf(stage);

    if (currIndex >= stages.length - 1) {
      return;
    }

    setStage(stages[currIndex + 1]);
  }

  const decreaseStage = (): void => {
    const stages: Stage = ["1-1", "1-2", "1-3", "1-4", "2-1", "2-2", "2-3", "2-5", "2-6", "2-7",
      "3-1", "3-2", "3-3", "3-5", "3-6", "3-7",
      "4-1", "4-2", "4-3", "4-5", "4-6", "4-7",
      "5-1", "5-2", "5-3", "5-5", "5-6", "5-7",
      "6-1", "6-2", "6-3", "6-5", "6-6", "6-7",
      "7-1", "7-2", "7-3", "7-5", "7-6", "7-7",
    ];
    const currIndex = stages.indexOf(stage);

    if (currIndex <= 0) {
      return;
    }

    setStage(stages[currIndex - 1]);
  }

  const sellUnit = (index: number) => {
    const soldUnit = boardState[index];

    if (soldUnit === null) {
      console.error("trying to sell null unit");
      return;
    }
    
    setGold((prev) => {
      if (soldUnit.starLevel === 1) {
        return prev + (soldUnit.cost);
      } else if (soldUnit.starLevel === 2) {
        if (soldUnit.cost === 1) {
          return prev + (soldUnit.cost * 3);
        } else {
          return prev + (soldUnit.cost * 3) - 1;
        }
      } else {
        if (soldUnit.cost === 1) {
          return prev + (soldUnit.cost * 9);
        } else {
          return prev + (soldUnit.cost * 9) - 1;
        }
      }
    });
    const currNumUnits = totals.current[soldUnit.name];
    if (soldUnit.starLevel === 1) {
      if (currNumUnits < 1) {
        console.error("trying to sell but not enough in totals");
      }
      totals.current[soldUnit.name]--;
    } else if (soldUnit.starLevel === 2) {
      if (currNumUnits < 3) {
        console.error("trying to sell but not enough in totals");
      }
      totals.current[soldUnit.name] -= 3;
    } else if (soldUnit.starLevel === 3) {
      if (currNumUnits < 9) {
        console.error("trying to sell but not enough in totals");
      }
      totals.current[soldUnit.name] -= 9;
    } 
    
    const numLeft = totals.current[soldUnit.name];
    console.log(`numLeft = ${numLeft}`);
    
    if (numLeft <= 0) {
      // remove from trait list
      const newTraits = traits;
      for (const trait of soldUnit.traits) {
        const i = newTraits.findIndex((t) => t.name === trait);
        if (i !== -1) {
          newTraits[i].numActivated--;
          newTraits[i].numNeeded = traitToNumNeeded(trait, newTraits[i].numActivated);
          newTraits[i].level = traitToLevel(trait, newTraits[i].numActivated);
          if (newTraits[i].numActivated === 0) {
            newTraits.splice(i, 1);
          }
        }
      }
      setTraits(newTraits);
    }

    setBoardState((prevBoardState) => {
      const newBoardState = [...prevBoardState];
      newBoardState[index] = null; 
      return newBoardState;
    });

    setHovered((prev) => {
      const newHovered = [...prev];
      newHovered[index] = false;
      return newHovered;
    });
  } 
  
  const increaseLevel = () => {
    setLevel((level) => Math.min(level + 1, 10));
  }

  const decreaseLevel = () => {
    setLevel((level) => Math.max(level - 1, 1));
  }

  const handleMouseDown = (e: React.MouseEvent): void => {
    const c = (e.target as HTMLElement).parentElement?.parentElement as HTMLElement;
    const groupElement = c;

    // find from hex
    const fromHexID = extractHexID(c.id);
    if (!groupElement) {
      console.error("groupElement not selected");
      return;
    }
  
    const clonedGroupElement = groupElement.cloneNode(true) as SVGGElement;
    // Update refs
    isDraggingRef.current = true;
    setClonedGroup(clonedGroupElement);
    // setIsDragging(true);
  
    // setClonePosition({
    //   x: e.pageX,
    //   y: e.pageY,
    // });
  
    // const onMouseMove = (e: MouseEvent): void => {
    //   if (isDraggingRef.current) {
    //     // setClonePosition({
    //     //   x: e.pageX,
    //     //   y: e.pageY,
    //     // });
    //   }
    // };
  
    const onMouseUp = (e2: MouseEvent): void => {
      isDraggingRef.current = false;

      let element = (e2.target as HTMLElement);

      if (element.id === "SELL") {
        // document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        sellUnit(fromHexID);
        return;
      }

      element = element.parentElement as HTMLElement;
      if (!(element?.classList.contains("hex"))) {
        // console.error('element doesnt have hex!');
        element = element.parentElement as HTMLElement;
      }
      
      if (!element?.classList.contains("hex")) {
        console.error("mouseUp on non-hex");
        // document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        return;
      }

      const toHexID = extractHexID(element.id);

      setHovered((prev) => {
        const newHovered = [...prev];
        newHovered[fromHexID] = false;
        return newHovered;
      });
      moveUnit(fromHexID, toHexID);

      setClonedGroup(null);
  
      // document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  
    // document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };


  function buyUnit(unit: Unit): void {
    
    if (unit.name in totals.current) {
      totals.current[unit.name]++;
    } else {
      totals.current[unit.name] = 1;
    }

    const newTraits: TraitLevel[] = [];
    for (const unit in totals.current) {
      if (totals.current[unit] > 0) {
        for (const trait of unitToTraits(unit)) {
          // add it to traitlevels
          const i = newTraits.findIndex((t) => t.name === trait);
          if (i !== -1) {
            newTraits[i].numActivated++;
            newTraits[i].numNeeded = traitToNumNeeded(trait, newTraits[i].numActivated);
            newTraits[i].level = traitToLevel(trait, newTraits[i].numActivated);
          } else {
            newTraits.push({
              name: trait,
              numActivated: 1,
              numNeeded: traitToNumNeeded(trait, 1),
              level: traitToLevel(trait, 1)
            })
          }
        }
      }
      newTraits.sort((a, b) => {
        if (levelPriority[a.level] > levelPriority[b.level]) return -1;
        if (levelPriority[a.level] < levelPriority[b.level]) return 1;
        return b.numActivated - a.numActivated;
      })
      setTraits(newTraits);
    }
    // set the traits

    setGold((prev) => Math.max(prev - unit.cost, 0));
    
    if (totals.current[unit.name] === 3) {
      // Merge logic
      setBoardState((prevBoardState) => {
        const updatedBoardState = [...prevBoardState];
    
        const indicesToMerge: number[] = [];
    
        // Find all units with the same name
        updatedBoardState.forEach((u, index) => {
          if (u !== null && u.name === unit.name) {
            indicesToMerge.push(index);
          }
        });
    
        // If there are exactly 3 units to merge
        if (indicesToMerge.length === 2) {

          // Remove the first two units (set them to null)
          updatedBoardState[indicesToMerge[0]] = null;
          const thirdUnit = updatedBoardState[indicesToMerge[1]];
          if (thirdUnit) {
            thirdUnit.starLevel = 2;
          }
        }
    
        return updatedBoardState;
      });
    } else if (totals.current[unit.name] === 6) {
      // Merge logic
      setBoardState((prevBoardState) => {
        const updatedBoardState = prevBoardState.map(u => u ? { ...u } : null);
        const indicesToMerge: number[] = [];
    
        updatedBoardState.forEach((u, index) => {
          if (u !== null && u.name === unit.name && u.starLevel == 1) {
            indicesToMerge.push(index);
          }
        });
        
        if (indicesToMerge.length === 2) {          
          updatedBoardState[indicesToMerge[0]] = null;
          const thirdUnit = updatedBoardState[indicesToMerge[1]];
          if (thirdUnit) {
            thirdUnit.starLevel = 2;
          }
        }
        return updatedBoardState;
      });
    } else if (totals.current[unit.name] === 9) {
      // Merge logic
      setBoardState((prevBoardState) => {        
        const updatedBoardState = prevBoardState.map(u => u ? { ...u } : null);            
        const indicesToMerge: number[] = [];    
        
        updatedBoardState.forEach((u, index) => {
          if (u !== null && u.name === unit.name) {
            indicesToMerge.push(index);
          }
        });
        
        
        if (indicesToMerge.length === 4) {
        
          updatedBoardState[indicesToMerge[0]] = null;
          updatedBoardState[indicesToMerge[1]] = null;
          updatedBoardState[indicesToMerge[2]] = null;
          const thirdUnit = updatedBoardState[indicesToMerge[3]];
          if (thirdUnit) {
            thirdUnit.starLevel = 3;
          }
        }
        return updatedBoardState;
      });
    } else {
      // unit.starLevel = 2;
      setBoardState((prevBoardState) => {
        const updatedBoard = [...prevBoardState];
        const firstNullIndex = updatedBoard.findIndex((element) => element === null); // Find first null element
        if (firstNullIndex !== -1) {
          updatedBoard[firstNullIndex] = unit; // Update the first null position
        }
        return updatedBoard;
      });
    }
  }


  function moveUnit(from: number, to: number) {

    if (boardState[from] === null) {
      console.error("No unit in from square");
    }

    setBoardState((prevBoardState) => {
      const newBoardState = [...prevBoardState];
      [newBoardState[from], newBoardState[to]] = [newBoardState[to], newBoardState[from]]; // Swap elements
      return newBoardState; 
    });
  }
  
  const clearBoard = () => {
    setBoardState(new Array(28).fill(null));
    setHovered(new Array(28).fill(false));
    setTraits([]);
    totals.current = {};
  }

  return (
    <>
      <h1 className="text-4xl text-blue-500">Vite Project</h1>
      <div className="flex flex-col" style={{
        cursor: isDraggingRef.current ? 'pointer' : 'default'
      }}>
        <div className="border"><Info level={level} increaseLevel={increaseLevel} decreaseLevel={decreaseLevel} clearBoard={clearBoard}
        gold={gold} addGold={addGold} updateSeed={updateSeed} stage={stage} increaseStage={increaseStage}
        decreaseStage={decreaseStage}
        />
        </div>
        <div className="grid grid-cols-[auto_1fr_1fr]">
          <div className="border flex flex-col w-[150px] h-[420px] overflow-auto thin-scrollbar gap-[3px] unselectable">Traits
            {traits.map((trait, index) => 
              <div key={index} className="flex">
                <svg width="32" height="32" viewBox="-4 -2 36 36">
                  {trait.level === "grey" ? 
                    <>
                      <path fill="#111" d="M13.856406460551018 0L27.712812921102035 8L27.712812921102035 24L13.856406460551018 32L0 24L0 8Z"></path>
                      <path transform="translate(2, 2.5)" stroke="#555" stroke-width="1.5" fill="transparent" d="M11.90784930203603 0L23.81569860407206 6.875L23.81569860407206 20.625L11.90784930203603 27.5L0 20.625L0 6.875Z"></path>
                      <image x="4.25" y="6.25" width="19.5" height="19.5" opacity="0.87" href={traitToHref(trait.name, false)}></image>
                    </> :
                    <>
                      <image transform="translate(0, 0)" width="28" href={traitLevelToHref(trait.level)}></image>
                      <image x="3" y="4.5" width="22" height="22" href={traitToHref(trait.name, true)}></image>
                    </>
                  }
                </svg>
                {trait.name} {trait.numActivated}/{trait.numNeeded}
              </div>
            )}
          </div>
          <div className="border" id="board">
                  {/* Render the clone group */}
                {clonedGroup && (
                  // clonedGroupElementRef.current
                  <></>
                  // <div
                  //   style={{
                  //     position: "absolute",
                  //     left: `${clonePosition.x}px`,
                  //     top: `${clonePosition.y}px`,
                  //     height: '100px',
                  //     width: '100px',
                  //     backgroundColor: 'blue',
                  //     pointerEvents: "none",
                  //   }}
                  // />
                )}
            <svg className="w-full md:w-[684px] xl:w-[760px]" viewBox="0 0 760 420">
              <g transform="translate(22, 14)">
                {boardState.map((unit, index) =>
                  unit ? (
                      <g  className="hex" key={index} id={`hex${index}`} transform={indexToTransformString(index)}
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
                          <g>
                          <image height="98" 
                          href={unitToHref(unit.name)}
                          width="98" 
                          clipPath="polygon(50% 0%, 93.301270189% 25%, 93.301270189% 75%, 50% 100%, 6.698729811% 75%, 6.698729811% 25%)" filter="" x="-5" y="2">
                          </image>
                          </g>
                          <path
                            d="M43.30127018922193 0L86.60254037844386 25L86.60254037844386 75L43.30127018922193 100L0 75L0 25Z"
                            fill="transparent"
                            stroke="rgba(187, 187, 187, 0.75)" 
                            // stroke="rgba(355, 0, 0, 0.75)"// this is red
                            strokeWidth="3.5"
                            transform="translate(0.5, 0.5)"
                          ></path>
                        </g>
                        {unit.starLevel == 2 && 
                        <g transform="translate(42, 0)">
                          <g width="22.056631892697467" transform="translate(-22.056631892697467, 0)">
                            <polygon fill="#add1e4" stroke="#111" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="star" points="11.028315946348734,0,14.629583430174119,6.071596490830758,21.516867690885448,7.620378899590744,16.85528913775802,12.921614305658727,17.51059741723443,19.95041096628109,11.028315946348734,17.155158138764698,4.54603447546304,19.95041096628109,5.201342754939447,12.921614305658728,0.5397642018120159,7.620378899590746,7.427048462523347,6.071596490830759"></polygon>
                          </g>
                          <g width="22.056631892697467" transform="translate(0, 0)" >
                            <polygon fill="#add1e4" stroke="#111" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="star" points="11.028315946348734,0,14.629583430174119,6.071596490830758,21.516867690885448,7.620378899590744,16.85528913775802,12.921614305658727,17.51059741723443,19.95041096628109,11.028315946348734,17.155158138764698,4.54603447546304,19.95041096628109,5.201342754939447,12.921614305658728,0.5397642018120159,7.620378899590746,7.427048462523347,6.071596490830759"></polygon>
                          </g>
                        </g>
                        }
                        {unit.starLevel == 3 && 
                          <g transform="translate(42, 0)">
                            <g width="22.056631892697467" transform="translate(-33.0849478390462, 0)">
                              <polygon fill="#dcba11" stroke="#111" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="star" points="11.028315946348734,0,14.629583430174119,6.071596490830758,21.516867690885448,7.620378899590744,16.85528913775802,12.921614305658727,17.51059741723443,19.95041096628109,11.028315946348734,17.155158138764698,4.54603447546304,19.95041096628109,5.201342754939447,12.921614305658728,0.5397642018120159,7.620378899590746,7.427048462523347,6.071596490830759"></polygon>
                            </g>
                            <g width="22.056631892697467" transform="translate(-11.028315946348734, 0)">
                              <polygon fill="#dcba11" stroke="#111" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="star" points="11.028315946348734,0,14.629583430174119,6.071596490830758,21.516867690885448,7.620378899590744,16.85528913775802,12.921614305658727,17.51059741723443,19.95041096628109,11.028315946348734,17.155158138764698,4.54603447546304,19.95041096628109,5.201342754939447,12.921614305658728,0.5397642018120159,7.620378899590746,7.427048462523347,6.071596490830759"></polygon>
                            </g>
                            <g width="22.056631892697467" transform="translate(11.028315946348734, 0)">
                              <polygon fill="#dcba11" stroke="#111" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="star" points="11.028315946348734,0,14.629583430174119,6.071596490830758,21.516867690885448,7.620378899590744,16.85528913775802,12.921614305658727,17.51059741723443,19.95041096628109,11.028315946348734,17.155158138764698,4.54603447546304,19.95041096628109,5.201342754939447,12.921614305658728,0.5397642018120159,7.620378899590746,7.427048462523347,6.071596490830759"></polygon>
                            </g>
                          </g>
                        }
                      </g>
                  ) : (
                    // empty hex
                    <g key={index} className="hex" id={`hex${index}`} transform={indexToTransformString(index)}>
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
        <Shop buyUnit={buyUnit} level={level} addGold={addGold} seed={seed} stage={stage}/>
        <div className="flex items-center justify-center w-full bg-gray-50 h-40 unselectable"
          id="SELL">
            SELL
        </div>
      </div>
    </>
)

}

export default MainPage;

function extractHexID(elementID: string): number {
  let hexID = -1;
  if (!(/hex/.test(elementID))) {
    console.error("element id doesnt have hex in its id")
  } else {
    // extract id
    const match = elementID.match(/hex(\d+)/);
    if (match) {
      hexID = parseInt(match[1], 10);
    }
  }

  return hexID
}


function traitToHref(traitName: string, black: boolean): string {

  const baseUrl = "https://ap.tft.tools/static/trait-icons/TFT13_";
  const suffix = black ? "" : "_w"; 

  switch (traitName.toLowerCase()) {
    case "academy":
      return `${baseUrl}Academy${suffix}.svg`;
    case "automata":
      return `${baseUrl}Hextech${suffix}.svg`;
    case "banished mage":
      return `${baseUrl}MissMageTrait.svg`;
    case "blood hunter":
      return `${baseUrl}BloodHunter.svg`;
    case "black rose":
      return `${baseUrl}Cabal${suffix}.svg`;
    case "chem-baron":
      return `${baseUrl}Crime${suffix}.svg`;
    case "conqueror":
      return `${baseUrl}Warband${suffix}.svg`;
    case "emissary":
      return `${baseUrl}Ambassador.svg`;
    case "enforcer":
      return `${baseUrl}Squad${suffix}.svg`;
    case "experiment":
      return `${baseUrl}Experiment${suffix}.svg`;
    case "family":
      return `${baseUrl}Family${suffix}.svg`;
    case "firelight":
      return `${baseUrl}Hoverboard${suffix}.svg`;
    case "high roller":
      return `${baseUrl}HighRoller.svg`;
    case "junker king":
      return `${baseUrl}JunkerKing.svg`;
    case "machine herald":
      return `${baseUrl}MachineHerald.svg`;
    case "rebel":
      return `${baseUrl}Rebel${suffix}.svg`;
    case "scrap":
      return `${baseUrl}Scrap${suffix}.svg`;
    case "ambusher":
      return `${baseUrl}Ambusher${suffix}.svg`;
    case "artillerist":
      return `${baseUrl}Martialist${suffix}.svg`;
    case "bruiser":
      return `${baseUrl}Bruiser${suffix}.svg`;
    case "dominator":
      return `${baseUrl}Infused${suffix}.svg`;
    case "form swapper":
      return `${baseUrl}FormSwapper${suffix}.svg`;
    case "pit fighter":
      return `${baseUrl}Pugilist${suffix}.svg`;
    case "quickstriker":
      return `${baseUrl}Challenger${suffix}.svg`;
    case "sentinel":
      return `${baseUrl}Titan${suffix}.svg`;
    case "sniper":
      return `${baseUrl}Sniper${suffix}.svg`;
    case "sorcerer":
      return `${baseUrl}Sorcerer${suffix}.svg`;
    case "visionary":
      return `${baseUrl}Invoker${suffix}.svg`;
    case "watcher":
      return `${baseUrl}Watcher${suffix}.svg`;
    default:
      return "";
  }

}

function traitToLevel(traitName: string, numActivated: number): level {

  switch (traitName.toLowerCase()) {
    case "academy":
      if (numActivated <= 2) {
        return "grey";
      } else if (numActivated === 3) {
        return "bronze";
      } else if (numActivated === 4) {
        return "silver"
      } 
      return "gold";
    case "automata":
      if (numActivated < 2) {
        return "grey";
      } else if (numActivated < 4) {
        return "bronze";
      } else if (numActivated < 6) {
        return "silver";
      } else {
        return "gold";
      }
    case "banished mage":
      return "unique";
    case "blood hunter":
      return "unique";
    case "black rose":
      if (numActivated < 3) {
        return "grey";
      } else if (numActivated < 4) {
        return "bronze";
      } else if (numActivated < 5) {
        return "silver";
      } else if (numActivated < 7) {
        return "gold";
      } 
      return "prismatic";
    case "chem-baron":
      if (numActivated < 3) {
        return "grey";
      } else if (numActivated < 4) {
        return "bronze";
      } else if (numActivated < 6) {
        return "silver";
      }
      return "gold";
    case "conqueror":
      if (numActivated < 2) {
        return "grey";
      } else if (numActivated < 4) {
        return "bronze";
      } else if (numActivated < 6) {
        return "silver";
      } else if (numActivated < 9) {
        return "gold";
      }
      return "prismatic";
    case "emissary":
      if (numActivated === 1) {
        return "bronze";
      } else if (numActivated === 4) {
        return "gold";
      }
      return "grey";
    case "enforcer":
      if (numActivated < 2) {
        return "grey";
      } else if (numActivated < 4) {
        return "bronze";
      } else if (numActivated < 6) {
        return "silver";
      } else if (numActivated < 10) {
        return "gold";
      }
      return "prismatic";
    case "experiment":
      if (numActivated < 3) {
        return "grey";
      } else if (numActivated < 5) {
        return "bronze";
      } 
      return "gold";
    case "family":
      if (numActivated < 3) {
        return "grey";
      }
      return "gold"
    case "firelight":
      if (numActivated < 2) {
        return "grey";
      } else if (numActivated < 3) {
        return "bronze";
      } 
      return "gold";
    case "high roller":
      return "unique";
    case "junker king":
      return "unique";
    case "machine herald":
      return "unique"
    case "rebel":
      if (numActivated < 3) {
        return "grey";
      } else if (numActivated < 5) {
        return "bronze";
      } else if (numActivated < 7) {
        return "silver";
      } else if (numActivated < 10) {
        return "gold";
      }
      return "prismatic"
    case "scrap":
      if (numActivated < 2) {
        return "grey";
      } else if (numActivated < 4) {
        return "bronze";
      } else if (numActivated < 6) {
        return "silver";
      } 
      return "gold";
    case "ambusher":
      if (numActivated < 2) {
        return "grey";
      } else if (numActivated < 3) {
        return "bronze";
      } else if (numActivated < 5) {
        return "silver";
      }
      return "gold"
    case "artillerist":
      if (numActivated < 2) {
        return "grey";
      } else if (numActivated < 4) {
        return "bronze";
      } 
      return "gold";
    case "bruiser":
      if (numActivated < 2) {
        return "grey";
      } else if (numActivated < 4) {
        return "bronze";
      } else if (numActivated < 6) {
        return "silver";
      }
      return "gold";
    case "dominator":
      if (numActivated < 2) {
        return "grey";
      } else if (numActivated < 4) {
        return "bronze";
      } else if (numActivated < 6) {
        return "silver";
      }
      return "gold";
    case "form swapper":
      if (numActivated < 2) {
        return "grey";
      } else if (numActivated < 4) {
        return "bronze";
      }
      return "gold";
    case "pit fighter":
      if (numActivated < 2) {
        return "grey";
      } else if (numActivated < 4) {
        return "bronze";
      } else if (numActivated < 6) {
        return "silver";
      }
      return "gold"
    case "quickstriker":
      if (numActivated < 2) {
        return "grey";
      } else if (numActivated < 3) {
        return "bronze";
      } else if (numActivated < 4) {
        return "silver";
      }
      return "gold";
    case "sentinel":
      if (numActivated < 2) {
        return "grey";
      } else if (numActivated < 4) {
        return "bronze";
      } else if (numActivated < 6) {
        return "silver";
      }
      return "gold";
    case "sniper":
      if (numActivated < 2) {
        return "grey";
      } else if (numActivated < 4) {
        return "bronze";
      }
      return "gold";
    case "sorcerer":
      if (numActivated < 2) {
        return "grey";
      } else if (numActivated < 4) {
        return "bronze";
      } else if (numActivated < 6) {
        return "silver";
      }
      return "gold";
    case "visionary":
      if (numActivated < 2) {
        return "grey";
      } else if (numActivated < 4) {
        return "bronze";
      } else if (numActivated < 6) {
        return "silver";
      }
      return "gold";
    case "watcher":
      if (numActivated < 2) {
        return "grey";
      } else if (numActivated < 4) {
        return "bronze";
      } else if (numActivated < 6) {
        return "silver";
      }
      return "gold";
  }
  return  "grey";
}

function unitToHref(unitName: string): string {

  switch (unitName.toLowerCase()) {
    case "amumu":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_amumu.jpg?w=98"
    case "darius":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_darius.jpg?w=98"
    case "draven":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_draven.jpg?w=98"
    case "irelia":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_irelia.jpg?w=98"
    case "lux":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_lux.jpg?w=98"
    case "maddie":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_shooter.jpg?w=98"
    case "morgana":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_morgana.jpg?w=98"
    case "powder":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_blue.jpg?w=98"
    case "singed":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_singed.jpg?w=98"
    case "steb":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_fish.jpg?w=98"
    case "trundle":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_trundle.jpg?w=98"
    case "vex":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_vex.jpg?w=98"
    case "violet":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_red.jpg?w=98"
    case "zyra":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_zyra.jpg?w=98"
    case "akali":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_akali.jpg?w=98"
    case "camille":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_camille.jpg?w=98"
    case "leona":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_leona.jpg?w=98"
    case "nocturne":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_nocturne.jpg?w=98"
    case "rell":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_rell.jpg?w=98"
    case "renata glasc":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_renataGlasc.jpg?w=98"
    case "sett":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_sett.jpg?w=98"
    case "tristana":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_tristana.jpg?w=98"
    case "urgot":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_urgot.jpg?w=98"
    case "vander":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_prime.jpg?w=98"
    case "vladimir":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_vladimir.jpg?w=98"
    case "zeri":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_zeri.jpg?w=98"
    case "ziggs":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_ziggs.jpg?w=98"
    case "blitzcrank":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_blitzcrank.jpg?w=98"
    case "cassiopeia":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_cassiopeia.jpg?w=98"
    case "ezreal":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_ezreal.jpg?w=98"
    case "gangplank":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_gangplank.jpg?w=98"
    case "kog'maw":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_kogmaw.jpg?w=98"
    case "loris":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_beardy.jpg?w=98"
    case "nami":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_nami.jpg?w=98"
    case "nunu":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_NunuWillump.jpg?w=98"
    case "renni":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_chainsaw.jpg?w=98"
    case "scar":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_flyguy.jpg?w=98"
    case "smeech":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_gremlin.jpg?w=98"
    case "swain":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_swain.jpg?w=98"
    case "twisted fate":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_twistedFate.jpg?w=98"
    case "ambessa":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_ambessa.jpg?w=98"
    case "corki":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_corki.jpg?w=98"
    case "dr. mundo":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_drmundo.jpg?w=98"
    case "ekko":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_ekko.jpg?w=98"
    case "elise":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_elise.jpg?w=98"
    case "garen":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_garen.jpg?w=98"
    case "heimerdinger":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_heimerdinger.jpg?w=98"
    case "illaoi":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_illaoi.jpg?w=98"
    case "silco":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_silco.jpg?w=98"
    case "twitch":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_twitch.jpg?w=98"
    case "vi":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_vi.jpg?w=98"
    case "zoe":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_zoe.jpg?w=98"
    case "caitlyn":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_caitlyn.jpg?w=98"
    case "jayce":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_jayce.jpg?w=98"
    case "jinx":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_jinx.jpg?w=98"
    case "leblanc":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_leblanc.jpg?w=98"
    case "malzahar":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_malzahar.jpg?w=98"
    case "mordekaiser":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_mordekaiser.jpg?w=98"
    case "rumble":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_rumble.jpg?w=98"
    case "sevika":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_lieutenant.jpg?w=98"
    case "mel":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_missmage.jpg?w=98"
    case "viktor":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_viktor.jpg?w=98"
    case "warwick":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_warwick.jpg?w=98"
    default:
      return ""
  }
}

export const unitToTraits = (unitName: string): string[] => {

  switch(unitName.toLowerCase()) {
    case "amumu":
      return ["Automata", "Watcher"];
    case "darius":
      return ["Conqueror", "Watcher"];
    case "draven":
      return ["Conqueror", "Pit Fighter"];
    case "irelia":
      return ["Rebel", "Sentinel"];
    case "lux":
      return ["Academy", "Sorcerer"];
    case "maddie":
      return ["Enforcer", "Sniper"];
    case "morgana":
      return ["Black Rose", "Visionary"];
    case "powder":
      return ["Family", "Scrap", "Ambusher"];
    case "singed":
      return ["Chem-Baron", "Sentinel"];
    case "steb":
      return ["Enforcer", "Bruiser"];
    case "trundle":
      return ["Scrap", "Bruiser"];
    case "vex":
      return ["Rebel", "Visionary"];
    case "violet":
      return ["Family", "Pit Fighter"];
    case "zyra":
      return ["Experiment", "Sorcerer"];
    case "akali":
      return ["Rebel", "Quickstriker"];
    case "camille":
      return ["Enforcer", "Ambusher"];
    case "leona":
      return ["Academy", "Sentinel"];
    case "nocturne":
      return ["Automata", "Quickstriker"];
    case "rell":
      return ["Conqueror", "Sentinel", "Visionary"];
    case "renata glasc":
      return ["Chem-Baron", "Visionary"];
    case "sett":
      return ["Rebel", "Bruiser"];
    case "tristana":
      return ["Emissary", "Artillerist"];
    case "urgot":
      return ["Experiment", "Pit Fighter", "Artillerist"];
    case "vander":
      return ["Family", "Watcher"];
    case "vladimir":
      return ["Black Rose", "Watcher", "Sorcerer"];
    case "zeri":
      return ["Firelight", "Sniper"];
    case "ziggs":
      return ["Scrap", "Dominator"];
    case "blitzcrank":
      return ["Automata", "Dominator"];
    case "cassiopeia":
      return ["Black Rose", "Dominator"];
    case "ezreal":
      return ["Academy", "Rebel", "Artillerist"];
    case "gangplank":
      return ["Scrap", "Form Swapper", "Pit Fighter"];
    case "kog'maw":
      return ["Automata", "Sniper"];
    case "loris":
      return ["Enforcer", "Sentinel"];
    case "nami":
      return ["Emissary", "Sorcerer"];
    case "nunu":
      return ["Experiment", "Bruiser", "Visionary"];
    case "renni":
      return ["Chem-Baron", "Bruiser"];
    case "scar":
      return ["Firelight", "Watcher"];
    case "smeech":
      return ["Chem-Baron", "Ambusher"];
    case "swain":
      return ["Conqueror", "Form Swapper", "Sorcerer"];
    case "twisted fate":
      return ["Enforcer", "Quickstriker"];
    case "ambessa":
      return ["Emissary", "Conqueror", "Quickstriker"];
    case "corki":
      return ["Scrap", "Artillerist"];
    case "dr. mundo":
      return ["Experiment", "Dominator"];
    case "ekko":
      return ["Firelight", "Scrap", "Ambusher"];
    case "elise":
      return ["Black Rose", "Form Swapper", "Bruiser"];
    case "garen":
      return ["Emissary", "Watcher"];
    case "heimerdinger":
      return ["Academy", "Visionary"];
    case "illaoi":
      return ["Rebel", "Sentinel"];
    case "silco":
      return ["Chem-Baron", "Dominator"];
    case "twitch":
      return ["Experiment", "Sniper"];
    case "vi":
      return ["Enforcer", "Pit Fighter"];
    case "zoe":
      return ["Rebel", "Sorcerer"];
    case "caitlyn":
      return ["Enforcer", "Sniper"];
    case "jayce":
      return ["Academy", "Form Swapper"];
    case "jinx":
      return ["Rebel", "Ambusher"];
    case "leblanc":
      return ["Black Rose", "Sorcerer"];
    case "malzahar":
      return ["Automata", "Visionary"];
    case "mordekaiser":
      return ["Conqueror", "Dominator"];
    case "rumble":
      return ["Junker King", "Scrap", "Sentinel"];
    case "sevika":
      return ["High Roller", "Chem-Baron", "Pit Fighter"];
    case "mel":
      return ["Banished Mage"];
    case "viktor":
      return ["Machine Herald"];
    case "warwick":
      return ["Experiment", "Blood Hunter"];
    default:
      return [];    
  }
}


const traitLevelToHref = (traitLevel: level): string => {

  switch (traitLevel) {
    case "grey":
      return "";
    case "bronze":
      return "https://ap.tft.tools/img/general/trait_1.png?w=28";
    case "silver":
      return "https://ap.tft.tools/img/general/trait_2.png?w=28"; 
    case "gold":
      return "https://ap.tft.tools/img/general/trait_3.png?w=28";
    case "prismatic":
      return "https://ap.tft.tools/img/general/trait_4.png?w=28";
    case "unique":
      return "https://ap.tft.tools/img/general/trait_5.png?w=28";
  }
}

const traitToNumNeeded = (traitName: string, numActivated: number ): number => {
  // console.log(`input: ${traitName} ${numActivated}`)
  switch (traitName.toLowerCase()) {
    case "academy":
      if (numActivated === 4) {
        return 4;
      } else if (numActivated === 5) {
        return 5;
      } else if (numActivated >= 6) {
        return 6;
      }
      return 3;
    case "automata":
      if (numActivated === 4 || numActivated === 5) {
        return 4;
      } else if (numActivated >= 6) {
        return 6;
      }
      return 2;
    case "banished mage":
      return 1;
    case "blood hunter":
      return 1;
    case "black rose":
      if (numActivated === 5 || numActivated === 6) {
        return 5;
      } else if (numActivated >= 7) {
        return 7;
      }
      return 3;
    case "chem-baron":
      if (numActivated === 4) {
        return 4;
      } else if (numActivated === 5) {
        return 5;
      } else if (numActivated === 6) {
        return 6;
      } else if (numActivated >= 7) {
        return 7;
      }
      return 3;
    case "conqueror":
      if (numActivated === 4 || numActivated === 5) {
        return 4;
      } else if (numActivated === 6 || numActivated === 7) {
        return 6;
      } else if (numActivated >= 8) {
        return 8;
      }
      return 2;
    case "emissary":
      if (numActivated === 4) {
        return 4;
      }
      return 1;
    case "enforcer":
      if (numActivated === 4 || numActivated === 5) {
        return 4;
      } else if (numActivated === 6 || numActivated === 7) {
        return 6;
      } else if (numActivated === 8 || numActivated === 9) {
        return 8;
      } else if (numActivated >= 10) {
        return 10;
      }
      return 2;
    case "experiment":
      if (numActivated === 5 || numActivated === 6) {
        return 5;
      } else if (numActivated >= 7) {
        return 7;
      }
      return 3;
    case "family":
      if (numActivated === 4) {
        return 4;
      } else if (numActivated === 5) {
        return 5;
      }
      return 3;
    case "firelight":
      if (numActivated === 3) {
        return 3;
      } else if (numActivated >= 4) {
        return 4;
      }
      return 2;
    case "high roller":
      return 1;
    case "junker king":
      return 1;
    case "machine herald":
      return 1;
    case "rebel":
      if (numActivated === 5 || numActivated === 6) {
        return 5;
      } else if (numActivated === 7 || numActivated === 8 || numActivated === 9) {
        return 7;
      } else if (numActivated >= 10) {
        return 10;
      }
      return 3;
    case "scrap":
      if (numActivated === 4 || numActivated === 5) {
        return 4;
      } else if (numActivated === 6 || numActivated === 7) {
        return 6;
      } else if (numActivated >= 9) {
        return 9;
      }
      return 2;
    case "ambusher":
      if (numActivated === 3) {
        return 3;
      } else if (numActivated === 4) {
        return 4;
      } else if (numActivated >= 5) {
        return 5;
      }
      return 2;
    case "artillerist":
      if (numActivated === 4 || numActivated === 5) {
        return 4;
      } else if (numActivated >= 6) {
        return 6;
      }
      return 2;
    case "bruiser":
      if (numActivated === 4 || numActivated === 5) {
        return 4;
      } else if (numActivated >= 6) {
        return 6;
      } 
      return 2;
    case "dominator":
      if (numActivated === 4 || numActivated === 5) {
        return 4;
      } else if (numActivated >= 6) {
        return 6;
      }
      return 2;
    case "form swapper":
      if (numActivated === 4) {
        return 4;
      }
      return 2;
    case "pit fighter":
      if (numActivated === 4 || numActivated === 5) {
        return 4;
      } else if (numActivated === 6 || numActivated === 7) {
        return 6;
      }  else if (numActivated >= 8) {
        return 8;
      }
      return 2;
    case "quickstriker":
      if (numActivated === 3) {
        return 3;
      } else if (numActivated >= 4) {
        return 4;
      }
      return 2;
    case "sentinel":
      if (numActivated === 4 || numActivated === 5) {
        return 4;
      } else if (numActivated >= 6) {
        return 6;
      }
      return 2;
    case "sniper":
      if (numActivated === 4 || numActivated === 5) {
        return 4;
      } else if (numActivated >= 6) {
        return 6;
      }
      return 2;
    case "sorcerer":
      if (numActivated === 4 || numActivated === 5) {
        return 4;
      } else if (numActivated >= 6) {
        return 6;
      } 
      return 2;
    case "visionary":
      if (numActivated === 4 || numActivated == 5) {
        return 4;
      } else if (numActivated >= 6) {
        return 6;
      }
      return 2;
    case "watcher":
      if (numActivated === 4 || numActivated === 5) {
        return 4;
      } else if (numActivated >= 6) {
        return 6;
      }
      return 2;
  }

  return 0;
}

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
