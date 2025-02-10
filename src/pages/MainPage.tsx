import {  useEffect, useMemo, useRef, useState } from "react";
import Shop from "../components/Shop";
import '../css/MainPage.css'
import React from "react";
import Info from "../components/Info";
import { indexToTransformString, levelToXpNeeded, traitLevelToHref, traitToHref, traitToLevel, traitToNumNeeded, unitToHref, unitToTraits } from "../utils/utils";
import { level, ShopSlot } from "../types";
import seedrandom from 'seedrandom';

export type Unit = {
  name: string;
  cost: number;
  starLevel: number;
  traits: string[];
}

const levelPriority: Record<level, number> = {
  unique: 6,
  prismatic: 5,
  gold: 4,
  silver: 3,
  bronze: 2,
  grey: 1,
};

export type Stage = ["1-2", "1-3", "1-4", "2-1", "2-2", "2-3", "2-5", "2-6", "2-7",
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

  const [boardState, setBoardState] = useState<(Unit | null)[]>(new Array(37).fill(null));
  const [hovered, setHovered] = useState<boolean[]>(new Array(37).fill(false));
  const [gold, setGold] = useState(0);
  const [level, setLevel] = useState(1);
  const isDraggingRef = React.useRef(false);
  const [clonedGroup, setClonedGroup] = useState<SVGElement  | null>(null);
  const [stage, setStage] = useState<Stage[number]>("1-2");
  const [xp, setXp] = useState(0);
  const [shouldReroll, setShouldReroll] = useState(false);

  const totals = useRef<{ [key: string]: number }>({});

  const [seed, setSeed] = useState<string | undefined>(undefined);
  const [traits, setTraits] = useState<TraitLevel[]>([]);
  const [shopSlots, setShopSlots] = useState<ShopSlot[]>([]);
  const oneCostChamps = ["Singed", "Powder", "Violet", "Lux", "Zyra", "Darius", "Draven", "Amumu", "Irelia", "Maddie", "Trundle", "Steb", "Morgana", "Vex"];
  const twoCostChamps = ["Akali", "Camille", "Leona", "Nocturne", "Rell", "Renata Glasc", "Sett", "Tristana", "Urgot", "Vander", "Vladimir", "Zeri", "Ziggs"];
  const threeCostChamps = ["Blitzcrank", "Cassiopeia", "Ezreal", "Gangplank", "Kog'maw", "Loris", "Nami", "Nunu", "Renni", "Scar", "Smeech", "Swain", "Twisted Fate"];
  const fourCostChamps = ["Ambessa", "Corki", "Dr. Mundo", "Ekko", "Elise", "Garen", "Heimerdinger", "Illaoi", "Silco", "Twitch", "Vi", "Zoe"];
  const fiveCostChamps = ["Caitlyn", "Jayce", "Jinx", "Leblanc", "Malzahar", "Mordekaiser", "Rumble", "Sevika"];
  const sixCostChamps = ["Mel", "Viktor", "Warwick"];

  const allUnits = [[], oneCostChamps, twoCostChamps, threeCostChamps, fourCostChamps, fiveCostChamps, sixCostChamps];

  useMemo(() => {
    if (seed !== undefined) {
      return seedrandom(seed, { global: true });
    }
  }, [seed]);

  useEffect(() => {
    const onKeyDown = (e: { key: string; }) => {
      if (e.key === 'd') {
        addGold(-2);
        reroll();
      } else if (e.key === 'f' && level < 10) {
        addXp(4);
      }
    }

   
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [level, xp]);

  const generateUnitCost = () => {

    const ran_number = Math.random();

    switch (level) {
      case 2:
        return 1;
      case 3:
        if (ran_number <= 0.75) {
          return 1;
        } else {
          return 2;
        }
      case 4:
        if (ran_number <= 0.55) {
          return 1;
        } else if (ran_number <= 0.85) {
          return 2;
        } else {
          return 3;
        }
      case 5:
        if (ran_number <= 0.45) {
          return 1;
        } else if (ran_number <= 0.78) {
          return 2;
        } else if (ran_number <= 0.98) {
          return 3;
        }
        return 4;
      case 6:
        if (ran_number <= 0.30) {
          return 1;
        } else if (ran_number <= 0.70) {
          return 2;
        } else if (ran_number <= 0.95) {
          return 3;
        } else if (ran_number <= 1) {
          return 4;
        } else {
          return 5;
        }
      case 7:
        if (ran_number <= 0.19) {
          return 1;
        } else if (ran_number <= 0.49) {
          return 2;
        } else if (ran_number <= 0.89) {
          return 3;
        } else if (ran_number <= 0.99) {
          return 4;
        } else {
          return 5;
        }
      case 8:
        if (ran_number <= 0.18) {
          return 1;
        } else if (ran_number <= 0.43) {
          return 2;
        } else if (ran_number <= 0.75) {
          return 3;
        } else if (ran_number <= 0.97) {
          return 4;
        } else {
          return 5;
        }
      case 9: 
        if (ran_number <= 0.15) {
          return 1;
        } else if (ran_number <= 0.35) {
          return 2;
        } else if (ran_number <= 0.60) {
          return 3;
        } else if (ran_number <= 0.9) {
          return 4;
        } else {
          return 5;
        }
      case 10:
        if (ran_number <= 0.05) {
          return 1;
        } else if (ran_number <= 0.15) {
          return 2;
        } else if (ran_number <= 0.35) {
          return 3;
        } else if (ran_number <= 0.75) {
          return 4;
        } else {
          return 5;
        }
      default:
        return 1;
    }

  }
  
  const rollShop = (): ShopSlot[] => {
    
    const returnLst: ShopSlot[] = [];
    for (let i = 0; i < 5; i++) {
      const unitCost = generateUnitCost();

      // const ran_number = rng();
      const ran_number = Math.random();

      const randomIdx = Math.floor(ran_number * allUnits[unitCost]?.length);
      returnLst.push({
        purchased: false,
        cost: unitCost,
        unit: allUnits[unitCost][randomIdx],
      });
    }

    if (stageToSixCost(stage, level)) {
      const ran_number = Math.random();
      const randomIdx = Math.floor(ran_number * allUnits[6]?.length);
      returnLst[4] = ({
        purchased: false,
        cost: 6,
        unit: allUnits[6][randomIdx],
      });
    }

    return returnLst;
  }

  const reroll = (): void => {
    setShouldReroll(false);
    // addGold(-2);
    setShopSlots(rollShop());
  }

  
  useEffect(() => {
    if (shouldReroll) {
      reroll();
    }
  }, [level, shouldReroll]);

  const addXp = (amount: number) => {
    let currLevel = level;
    let currXp = xp + amount;

    if (amount > 0) {
      while (currXp >= levelToXpNeeded(currLevel)) {
        currXp -= levelToXpNeeded(currLevel);
        currLevel += 1;
        if (currLevel >= 10) {
          break;
        }
      }
    } else {
      while (currXp < 0) {
        currXp = levelToXpNeeded(currLevel - 1) + currXp;
        currLevel -= 1;
        if (currLevel <= 1) {
          break;
        }
      }
    }
    setLevel(Math.min(Math.max(0, currLevel), 10));
    setXp(currXp);
  }


  const addGold = (amount: number) => {
    setGold(prev => Math.max(0, prev + amount));
  }

  const updateSeed = (newSeed: string) => {
    setSeed(newSeed);
  }

  const increaseStage = (): void => {
    const stages: Stage = ["1-2", "1-3", "1-4", "2-1", "2-2", "2-3", "2-5", "2-6", "2-7",
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
    addXp(2);
    setGold((prev) => {
      let baseGold = 0;
      switch (stage) {
        case "1-2":
          baseGold = 2;
          break;
        case "1-3":
          baseGold = 2;
          break;
        case "1-4":
          baseGold = 3;
          break;
        case "2-1":
          baseGold = 4;
          break;
        default:
          baseGold = 5;
      }

      if (prev >= 50) {
        return prev + baseGold + 5;
      } else if (prev >= 40) {
        return prev + baseGold + 4;
      } else if (prev >= 30) {
        return prev + baseGold + 3;
      } else if (prev >= 20) {
        return prev + baseGold + 2;
      } else if (prev >= 10) {
        return prev + baseGold + 1;
      } else {
        return prev + baseGold;
      }
    });

    setShouldReroll(true);
    // reroll();
  }

  const decreaseStage = (): void => {
    const stages: Stage = ["1-2", "1-3", "1-4", "2-1", "2-2", "2-3", "2-5", "2-6", "2-7",
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
    addXp(-2);
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
    
    // const numLeft = totals.current[soldUnit.name];
    
    // if (numLeft <= 0) {
    //   // remove from trait list
    //   const newTraits = traits;
    //   for (const trait of soldUnit.traits) {
    //     const i = newTraits.findIndex((t) => t.name === trait);
    //     if (i !== -1 && i < 28) {
    //       newTraits[i].numActivated--;
    //       newTraits[i].numNeeded = traitToNumNeeded(trait, newTraits[i].numActivated);
    //       newTraits[i].level = traitToLevel(trait, newTraits[i].numActivated);
    //       if (newTraits[i].numActivated === 0) {
    //         newTraits.splice(i, 1);
    //       }
    //     }
    //   }
    //   setTraits(newTraits);
    // }

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
    setXp(0);
  }

  const decreaseLevel = () => {
    setLevel((level) => Math.max(level - 1, 1));
    setXp(0);
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

  useEffect(() => {
    calculateTraits();
  }, [boardState])

  const calculateTraits = () => {
    const uniqueUnits = new Set<string>();
    const newTraits: TraitLevel[] = [];

    for (const hex of boardState.slice(0, 28)) {
      if (hex === null) {
        continue;
      }
      uniqueUnits.add(hex.name);
    }

    for (const unit of uniqueUnits) {
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

  function buyUnit(unit: Unit, index: number): void {
    
    setShopSlots((prev) => {
      const newShopSlots = [...prev];
      newShopSlots[index].purchased = true;
      return newShopSlots;              
    });

    if (unit.name in totals.current) {
      totals.current[unit.name]++;
    } else {
      totals.current[unit.name] = 1;
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
      setBoardState((prevBoardState) => {
        // try to fill a spot on the bench (indexes 28 onward)
        const updatedBoard = [...prevBoardState];
        const firstNullIndex = updatedBoard.slice(28).findIndex((element) => element === null); // Find first null element
        if (firstNullIndex !== -1) {
          updatedBoard[firstNullIndex + 28] = unit; // Update the first null position
        } else {
          // if bench full, place on board
          const firstBoardNullIndex = updatedBoard.findIndex((element) => element === null);
          if (firstBoardNullIndex !== -1) {
            updatedBoard[firstBoardNullIndex] = unit;
          }
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
    setBoardState(new Array(37).fill(null));
    setHovered(new Array(37).fill(false));
    setTraits([]);
    totals.current = {};
  }

  const resetState = () => {
    setGold(0);
    setLevel(1);
    setXp(0);
    setBoardState(new Array(37).fill(null));
    setHovered(new Array(37).fill(false));
    setStage("1-2");
    setSeed(undefined);
    setShopSlots([]);
  }

  return (
    <>
      {/* <h1 className="text-4xl text-blue-500">Vite Project</h1> */}
      <div className="flex flex-col" style={{
        cursor: isDraggingRef.current ? 'pointer' : 'default'
      }}>
        <div className="border pt-2">
          <Info level={level} increaseLevel={increaseLevel} decreaseLevel={decreaseLevel} clearBoard={clearBoard}
          gold={gold} addGold={addGold} updateSeed={updateSeed} stage={stage} increaseStage={increaseStage}
          decreaseStage={decreaseStage} resetState={resetState}
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
                      <path transform="translate(2, 2.5)" stroke="#555" strokeWidth="1.5" fill="transparent" d="M11.90784930203603 0L23.81569860407206 6.875L23.81569860407206 20.625L11.90784930203603 27.5L0 20.625L0 6.875Z"></path>
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
          <div className="border defaultBG" id="board">
                {clonedGroup && (
                  <></>
                )}
            <svg className="w-full md:w-[684px] xl:w-[760px]" viewBox="0 0 760 420">
              <g transform="translate(22, 14)">
                {boardState.map((unit, index) =>
                  index < 28 && (
                  unit ? (
                      <g className="hex" key={index} id={`hex${index}`} transform={indexToTransformString(index)}
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
                    </g>)
                  )
                )}
              </g>
            </svg>
          </div>
        </div>
        <div id="bench">
        <svg className="w-full md:w-[800px] md:ml-32 xl:ml-0 xl:w-[1000px]" viewBox="0 0 1000 130">
          <g transform="translate(22, 14)">
            {boardState.map((unit, index) =>
              index >= 28 && (
              unit ? (
                  <g className="hex" key={index} id={`hex${index}`} transform={indexToTransformString(index)}
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
                </g>)
              )
            )}
          </g>
          </svg>
        </div>
        <Shop buyUnit={buyUnit} level={level} addGold={addGold} seed={seed} stage={stage} xp={xp} addXp={addXp} shopSlots={shopSlots}
              reroll={reroll}
        />
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

const stageToSixCost = (stage: string, level: number): boolean => {
  
  const isLevelTen = (level === 10);
  const ran_number = Math.random();

  switch (stage) {
    case "1-1":
      return false;
    case "1-2":
      return false;
    case "1-3":
      return false;
    case "1-4":
      return false;
    case "2-1":
      return false;
    case "2-2":
      return false;
    case "2-3":
      return false;
    case "2-5":
      return false;
    case "2-6":
      return false;
    case "2-7":
      return false;
    case "3-1":
      return false;
    case "3-2":
      return false;
    case "3-3":
      return false;
    case "3-5":
      return false;
    case "3-6":
      return false;
    case "3-7":
      return false;
    case "4-1":
      return false;
    case "4-2":
      return false;
    case "4-3":
      return false;
    case "4-5":
      return false;
    case "4-6":
      if (ran_number <= 0.0016) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0126) {
        return true;
      }
      return false;
    case "4-7":
      if (ran_number <= 0.0016) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0126) {
        return true;
      }
      return false;
    case "5-1":
      if (ran_number <= 0.0019) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0129) {
        return true;
      }
      return false;
    case "5-2":
      if (ran_number <= 0.0022) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0132) {
        return true;
      }
      return false;
    case "5-3":
      if (ran_number <= 0.0025) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0135) {
        return true;
      }
      return false;
    case "5-5":
      if (ran_number <= 0.0028) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0138) {
        return true;
      }
      return false;
    case "5-6":
      if (ran_number <= 0.0031) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0141) {
        return true;
      }
      return false;
    case "5-7":
      if (ran_number <= 0.0034) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0144) {
        return true;
      }
      return false;
    case "6-1":
      if (ran_number <= 0.0038) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0148) {
        return true;
      }
      return false;
    case "6-2":
      if (ran_number <= 0.0042) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0152) {
        return true;
      }
      return false;
    case "6-3":
      if (ran_number <= 0.0046) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0156) {
        return true;
      }
      return false;
    case "6-5":
      if (ran_number <= 0.0050) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0160) {
        return true;
      }
      return false;
    case "6-6":
      if (ran_number <= 0.0054) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0164) {
        return true;
      }
      return false;
    case "6-7":
      if (ran_number <= 0.0054) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0168) {
        return true;
      }
      return false;
    case "7-1":
      if (ran_number <= 0.0078) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0188) {
        return true;
      }
      return false;
    case "7-2":
      if (ran_number <= 0.0098) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0208) {
        return true;
      }
      return false;
    case "7-3":
      if (ran_number <= 0.0098) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0208) {
        return true;
      }
      return false;
    case "7-5":
      if (ran_number <= 0.0098) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0208) {
        return true;
      }
      return false;
    case "7-6":
      if (ran_number <= 0.00098) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0208) {
        return true;
      }
      return false;
    case "7-7":
      if (ran_number <= 0.00098) {
        return true;
      } else if (isLevelTen && ran_number <= 0.0208) {
        return true;
      }
      return false;
    default:
      return false; // Default case for any unexpected stage
  }
}
