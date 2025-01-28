
interface InfoProps {
  level: number;
  decreaseLevel: () => void;
  increaseLevel: () => void;
  clearBoard: () => void;
  gold: number;
  addGold: (amount: number) => void;
  updateSeed: (newSeed: string) => void;
}


function Info({level, decreaseLevel, increaseLevel, clearBoard, gold, addGold, updateSeed}: InfoProps) {

  return (
    <>
      <div className="flex items-center" >
      <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      onClick={clearBoard}>
        Clear Board
      </button>

        <div className="flex flex-col">
          <div>Level: {level}</div>
          <div>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={decreaseLevel}>
              ←</button>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={increaseLevel}>→</button>
          </div>
        </div>
        <div>
          <div>Gold: {gold}</div>
          <div className="flex flex-row">
            <div><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => addGold(-5)}>- 5g</button></div>
            <div><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => addGold(-1)}>- 1g</button></div>
            <div><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => addGold(1)}>+ 1g</button></div>
            <div><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => addGold(5)}>+ 5g</button></div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          {/* <div>Set Seed</div> */}
          <div>
            <div>    
              <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set seed:</label>
              <input type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" />
            </div>
          </div>
          <div><button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              const e = (document.getElementById("number-input") as HTMLInputElement).value;
              if (e !== "") {
                updateSeed(e);
              }
            }}>Set</button></div>
        </div>
      </div>
    </>
  )
}

export default Info;