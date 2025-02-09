import { levelToXpNeeded, Unit, unitToTraits } from "../pages/MainPage";
import "../css/Shop.css"
import "../css/MainPage.css"
import { useEffect, useMemo, useState } from "react";
import seedrandom from 'seedrandom';


interface ShopProps {
  buyUnit: (unit: Unit) => void; // Function type
  level: number;
  addGold: (amount: number) => void;
  seed: string | undefined;
  stage: string;
  xp: number;
  addXp: (amount: number) => void;
}

interface ShopSlot {
  purchased: boolean;
  unit: string;
  cost: number;
}

function Shop( {buyUnit, level, addGold, seed, stage, xp, addXp}: ShopProps ) {

  useMemo(() => {
    if (seed !== undefined) {
      return seedrandom(seed, { global: true });
    }
  }, [seed]); // Empty dependency array ensures this runs only once.

  useEffect(() => {
    const onKeyDown = (e: { key: string; }) => {
      if (e.key === 'd') {
        reroll();
      }
    }
   
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [level]);

  const oneCostChamps = ["Singed", "Powder", "Violet", "Lux", "Zyra", "Darius", "Draven", "Amumu", "Irelia", "Maddie", "Trundle", "Steb", "Morgana", "Vex"];
  const twoCostChamps = ["Akali", "Camille", "Leona", "Nocturne", "Rell", "Renata Glasc", "Sett", "Tristana", "Urgot", "Vander", "Vladimir", "Zeri", "Ziggs"];
  const threeCostChamps = ["Blitzcrank", "Cassiopeia", "Ezreal", "Gangplank", "Kog'maw", "Loris", "Nami", "Nunu", "Renni", "Scar", "Smeech", "Swain", "Twisted Fate"];
  const fourCostChamps = ["Ambessa", "Corki", "Dr. Mundo", "Ekko", "Elise", "Garen", "Heimerdinger", "Illaoi", "Silco", "Twitch", "Vi", "Zoe"];
  const fiveCostChamps = ["Caitlyn", "Jayce", "Jinx", "Leblanc", "Malzahar", "Mordekaiser", "Rumble", "Sevika"];
  const sixCostChamps = ["Mel", "Viktor", "Warwick"];

  const allUnits = [[], oneCostChamps, twoCostChamps, threeCostChamps, fourCostChamps, fiveCostChamps, sixCostChamps];

  const generateUnitCost = () => {

    // const ran_number = Math.random();
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
      console.log('changing to 6 cost');
      returnLst[4] = ({
        purchased: false,
        cost: 6,
        unit: allUnits[6][randomIdx],
      });
    }

    return returnLst;
  }

  const reroll = (): void => {
    addGold(-2);
    setShopSlots(rollShop());
  }

  const [shopSlots, setShopSlots] = useState<ShopSlot[]>([]);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex" id="aboveShop">
          <div className="flex flex-col w-[150px] border-2 border-solid rightTrapeze defaultBG" id="xpSection">
            <div className="flex justify-between">
              <div className="">Lvl. {level}</div>
              {level < 10 && 
              <div className="mr-6">
                {xp} / {levelToXpNeeded(level)}
              </div>
              }

            </div>
            <div className="flex justify-start"  id="progressBar">
              <progress value={xp / levelToXpNeeded(level)} className="w-[80%] ml-1"/>
            </div>

          </div>
        </div>
        <div className="border flex h-32 unselectable">
          {/* SHOP */}
          <div className="flex flex-col h-full">
            <button className="border h-full flex items-center justify-center"
              disabled={level >= 10}
              onClick={() => {addXp(4)}}
            >
              Buy XP
            </button>
            <button
              className="border h-full flex items-center justify-center"
              onClick={(reroll)}>
              Reroll
            </button>
          </div>
          <div className="flex">
          {/* <div className="shopSlot cursor-pointer flex justify-center items-center" id="shop1"> */}
            {shopSlots.map((slot, index) =>
              !slot.purchased ?
                <div key={index} className="shopSlot cursor-pointer flex justify-center items-center"
                  onClick={() => {buyUnit({
                    name: slot.unit,
                    cost: slot.cost,
                    starLevel: 1,
                    traits: unitToTraits(slot.unit),
                  });
                  setShopSlots((prev) => {
                    const newShopSlots = [...prev];
                    newShopSlots[index].purchased = true;
                    return newShopSlots;              
                  });
                  }}
                >
                  <img className="h-full w-full bg-cover" 
                    src={`/${slot.unit}.png`}
                    alt={slot.unit}
                  >
                  </img>
                </div> : 
                <div key={index} className="purchased cursor-pointer flex justify-center items-center">
                  
                </div>
              )}
          </div>
          </div>
      </div>
    </>
    )
}

// returns true if a six cost should appear
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
      console.log(ran_number);
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

export default Shop;