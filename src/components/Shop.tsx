
function Shop() {

  const champs = ["Singed", "Powder", "Violet", "Lux", "Zyra", "Darius", "Amumu", "Irelia", "Maddie", "Trundle", "Steb", "Morgana", "Vex"];

  const rollShop = () => {
    
    const returnLst = [];
    for (let i = 0; i < 5; i++) {
      const randomIdx = Math.floor(Math.random() * 13);
      returnLst.push(champs[randomIdx]);
    }

    return returnLst;  
  }

  console.log(rollShop());
  return (
    <>
      <div className="border flex h-32">
          {/* SHOP */}
          <div className="flex flex-col h-full">
            <button className="border h-full flex items-center justify-center">Buy XP</button>
            <button className="border h-full flex items-center justify-center">Reroll</button>
          </div>
          <div>
            <div id="shop1"></div>
            <div id="shop2"></div>
            <div id="shop3"></div>
            <div id="shop4"></div>
            <div id="shop5"></div>
          </div>
      </div>
    </>
    )
}

export default Shop;