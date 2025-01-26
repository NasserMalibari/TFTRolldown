

interface InfoProps {
  level: number;
  decreaseLevel: () => void;
  increaseLevel: () => void;
  clearBoard: () => void;
}


function Info({level, decreaseLevel, increaseLevel, clearBoard}: InfoProps) {

  return (
    <>
      <div className="flex">
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
      </div>
    </>
  )
}

export default Info;