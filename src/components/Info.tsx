
interface InfoProps {
  level: number;
  decreaseLevel: () => void;
  increaseLevel: () => void;
  clearBoard: () => void;
  gold: number;
  addGold: (amount: number) => void;
  updateSeed: (newSeed: string) => void;
  stage: string;
  increaseStage: () => void;
  decreaseStage: () => void;
  resetState: () => void;
}


function Info({level, decreaseLevel, increaseLevel, clearBoard, gold, addGold, updateSeed, stage, increaseStage, 
               decreaseStage, resetState}: InfoProps) {

  return (
    <>
      <div className="flex items-center" >
        <div className="flex flex-col">
          <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={clearBoard}>
            Clear Board
          </button>
          <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          onClick={resetState}>
            Reset State
          </button>
        </div>

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
        <div className="flex flex-col">
          <div>Stage: {stage}</div>
          <div>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={decreaseStage}>
              ←</button>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={increaseStage}>→</button>
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
        <div className="flex flex-col">
          <div>
            <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set seed:</label>
          </div>
          <div className="flex gap-2 items-start">
            <input type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" />
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                const e = (document.getElementById("number-input") as HTMLInputElement).value;
                if (e !== "") {
                  updateSeed(e);
                }
              }}>Set</button>
          </div>
        </div>
        {/* <div className="flex flex-col items-center gap-2">
          <div className="flex">    
            <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set seed:</label>
            <div>
            <input type="number" id="number-input" aria-describedby="helper-text-explanation" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="90210" />
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => {
              const e = (document.getElementById("number-input") as HTMLInputElement).value;
              if (e !== "") {
                updateSeed(e);
              }
            }}>Set</button>
          </div>
          </div>
        </div> */}
      </div>
    </>
  )
}

export default Info;