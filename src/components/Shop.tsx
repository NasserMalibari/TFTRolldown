import { Unit, unitToTraits } from "../pages/MainPage";
import "../css/Shop.css"
import "../css/MainPage.css"
import { useEffect, useMemo, useState } from "react";
import seedrandom from 'seedrandom';


interface ShopProps {
  buyUnit: (unit: Unit) => void; // Function type
  level: number;
  addGold: (amount: number) => void;
  seed: string | undefined;
}

interface ShopSlot {
  purchased: boolean;
  unit: string;
  cost: number;
}

function Shop( {buyUnit, level, addGold, seed}: ShopProps ) {

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

    return returnLst;
  }

  const reroll = (): void => {
    addGold(-2);
    setShopSlots(rollShop());
  }

  const [shopSlots, setShopSlots] = useState<ShopSlot[]>([]);

  return (
    <>
      <div className="border flex h-32 unselectable">
          {/* SHOP */}
          <div className="flex flex-col h-full">
            <button className="border h-full flex items-center justify-center">
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
                  {slot.unit}
                </div> : 
                <div key={index} className="purchased cursor-pointer flex justify-center items-center">
                  
                </div>
              )}
          </div>
          </div>
    </>
    )
}

export default Shop;