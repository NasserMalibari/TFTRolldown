import Shop from "../components/Shop";

function MainPage() {
    return (
        <>
          <h1 className="text-4xl text-blue-500">Vite Project</h1>
          <div className="flex flex-col">
            <div className="border">
              INFO
            </div>
            <div className="flex">
              <div className="border">
                Traits
              </div>
              <div className="border">
                BOARD
              </div>
            </div>
            <Shop />
          </div>
        </>
        
      )

}

export default MainPage;