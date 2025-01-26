import { Unit } from "../pages/MainPage";
import "../css/Shop.css"
import { useEffect, useState } from "react";

interface ShopProps {
  buyUnit: (unit: Unit) => void; // Function type
  level: number;
}

interface ShopSlot {
  purchased: boolean;
  unit: string;
  cost: number;
}

function Shop( {buyUnit, level}: ShopProps ) {

  useEffect(() => {
    const onKeyDown = (e: { key: string; }) => {
      console.log(`${level}`);
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
    
    console.log(`rolling with level ${level}`)
    const returnLst: ShopSlot[] = [];
    for (let i = 0; i < 5; i++) {
      const unitCost = generateUnitCost();
      const randomIdx = Math.floor(Math.random() * allUnits[unitCost]?.length);
      returnLst.push({
        purchased: false,
        cost: 1,
        unit: allUnits[unitCost][randomIdx],
      });
    }

    return returnLst;
  }

  const reroll = (): void => {
    setShopSlots(rollShop());
  }

  const [shopSlots, setShopSlots] = useState<ShopSlot[]>([]);
  // console.log(buyUnit)
  

  return (
    <>
      <div className="border flex h-32">
          {/* SHOP */}
          <div className="flex flex-col h-full">
            <button className="border h-full flex items-center justify-center"
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
                <div key={index} className="shopSlot cursor-pointer flex justify-center items-center"
                  onClick={() => {buyUnit({
                    name: slot.unit,
                    cost: 1,
                    starLevel: 1,
                    position: null,
                  })}}
                >
                  {slot.unit}
                </div>
              )}
          </div>
          </div>
    </>
    )
}

export default Shop;