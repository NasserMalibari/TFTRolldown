import { Unit } from "../pages/MainPage";
import "../css/Shop.css"
import "../css/MainPage.css"
import { useEffect, useMemo } from "react";
import seedrandom from 'seedrandom';
import { levelToXpNeeded, unitToTraits } from "../utils/utils";
import { ShopSlot } from "../types";


interface ShopProps {
  buyUnit: (unit: Unit, index: number) => void; // Function type
  level: number;
  addGold: (amount: number) => void;
  seed: string | undefined;
  stage: string;
  xp: number;
  addXp: (amount: number) => void;
  shopSlots: ShopSlot[];
  reroll: () => void;
}

function Shop( {buyUnit, level,  seed, xp, addXp, shopSlots, reroll}: ShopProps ) {

  useMemo(() => {
    if (seed !== undefined) {
      return seedrandom(seed, { global: true });
    }
  }, [seed]);

  useEffect(() => {
    const onKeyDown = (e: { key: string; }) => {
      if (e.key === 'd') {
        reroll();
      } else if (e.key === 'f' && level < 10) {
        addXp(4);
      }
    }

   
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [level, xp]);





  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-end" id="aboveShop">
          <div className="flex flex-col w-[150px]  rightTrapeze defaultBG" id="xpSection">
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
          <div className="flex pl-10 justify-start relative left-[-22px] h-[30px] opacity-90
                          gap-10 items-end bg-gray-800 w-[500px] z-[-1]" id="oddsHolder">
            <div className="text-gray-500 items-end flex">
              <div className="bg-gray-500 circle w-[10px] h-[10px] mb-2 mr-1">
            </div>20%</div>
            <div className="text-green-400 items-end flex">
              <div className="bg-green-400 circle w-[10px] h-[10px] mb-2 mr-1">
            </div>20%</div>
            <div className="text-blue-600 items-end flex">
              <div className="bg-blue-600 triangle w-[10px] h-[10px] mb-2 mr-1">
            </div>20%</div>
            <div className="text-purple-600 items-end flex">
              <div className="bg-purple-600 w-[10px] h-[10px] mb-2 mr-1">
            </div>20%</div>
            <div className="text-yellow-700 items-end flex">
              <div className="bg-yellow-700 pentagon w-[10px] h-[10px] mb-2 mr-1">
            </div>20%</div>
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
                  }, index);
                  // setShopSlots((prev) => {
                  //   const newShopSlots = [...prev];
                  //   newShopSlots[index].purchased = true;
                  //   return newShopSlots;              
                  // });
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

export default Shop;