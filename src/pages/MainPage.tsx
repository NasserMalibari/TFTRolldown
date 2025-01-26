import { useState } from "react";
import Shop from "../components/Shop";
import '../css/MainPage.css'
import React from "react";
import Info from "../components/Info";
// TODO: Meta


export type Unit = {
  name: string;
  cost: number;
  starLevel: number;
  position: number | null;
}

interface ClonePosition {
  x: number;
  y: number;
}

function MainPage() {

  const [boardState, setBoardState] = useState<Unit[]>(new Array(28).fill(null));
  const [hovered, setHovered] = useState<boolean[]>(new Array(28).fill(false));

  const [level, setLevel] = useState(1);
  // let level = 10;
  // const [isDragging, setIsDragging] = useState<boolean>(false);
  const isDraggingRef = React.useRef(false);
  const [clonePosition, setClonePosition] = useState<ClonePosition>({ x: 0, y: 0 });
  const [clonedGroup, setClonedGroup] = useState<SVGElement  | null>(null);


  const increaseLevel = () => {
    setLevel((level) => Math.min(level + 1, 10));
  }

  const decreaseLevel = () => {
    setLevel((level) => Math.max(level - 1, 1));
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
  
    setClonePosition({
      x: e.pageX,
      y: e.pageY,
    });
  
    const onMouseMove = (e: MouseEvent): void => {
      if (isDraggingRef.current) {
        setClonePosition({
          x: e.pageX,
          y: e.pageY,
        });
      }
    };
  
    const onMouseUp = (e2: MouseEvent): void => {
      isDraggingRef.current = false;

      let element = (e2.target as HTMLElement).parentElement as HTMLElement;
      if (!(element?.classList.contains("hex"))) {
        console.error('element has hex!');
        element = element.parentElement as HTMLElement;
      }
      
      if (!element?.classList.contains("hex")) {
        console.error("mouseUp on non-hex");
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
  
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
  
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };


  function buyUnit(unit: Unit): void {
    // add unit to lowest free space

    setBoardState((prevBoardState) => {
      const updatedBoard = [...prevBoardState];
      const firstNullIndex = updatedBoard.findIndex((element) => element === null); // Find first null element
      if (firstNullIndex !== -1) {
        updatedBoard[firstNullIndex] = unit; // Update the first null position
      }
      return updatedBoard;
    });
  }


  function moveUnit(from: number, to: number) {

    if (boardState[from] === null) {
      console.error("No unit in from square");
    }

    setBoardState((prevBoardState) => {
      const newBoardState = [...prevBoardState]; // Create a copy of the array
      [newBoardState[from], newBoardState[to]] = [newBoardState[to], newBoardState[from]]; // Swap elements
      return newBoardState; // Update the state with the new array
    });
  }
  
  const clearBoard = () => {
    setBoardState(new Array(28).fill(null));
  }

  return (
    <>
      <h1 className="text-4xl text-blue-500">Vite Project</h1>
      <div className="flex flex-col" >
        <div className="border"><Info level={level} increaseLevel={increaseLevel} decreaseLevel={decreaseLevel} clearBoard={clearBoard}/></div>
        <div className="">
          <div className="border">Traits</div>
          <div className="border" id="board">
                  {/* Render the clone group */}
                {clonedGroup && (
                  // clonedGroupElementRef.current
                  <></>
                  // <div
                  //   style={{
                  //     position: "absolute",
                  //     left: `${clonePosition.x}px`,
                  //     top: `${clonePosition.y}px`,
                  //     height: '100px',
                  //     width: '100px',
                  //     backgroundColor: 'blue',
                  //     pointerEvents: "none",
                  //   }}
                  // />
                )}
            <svg className="w-full md:w-[684px] xl:w-[760px]" viewBox="0 0 760 420">
              <g transform="translate(22, 14)">
                {boardState.map((unit, index) =>
                  unit ? (
                      <g  key={index} id={`hex${index}`} transform={indexToTransformString(index)}
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
                            strokeWidth="3.5"
                            transform="translate(0.5, 0.5)"
                          ></path>
                        </g>
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
                    </g>
                  )
                )}
              </g>
            </svg>
          </div>
        </div>
        <Shop buyUnit={buyUnit} level={level} />
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


function unitToHref(unitName: string): string {
  
  switch (unitName.toLowerCase()) {
    case "amumu":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_amumu.jpg?w=98"
    case "darius":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_darius.jpg?w=98"
    case "draven":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_draven.jpg?w=98"
    case "irelia":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_irelia.jpg?w=98"
    case "lux":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_lux.jpg?w=98"
    case "maddie":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_shooter.jpg?w=98"
    case "morgana":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_morgana.jpg?w=98"
    case "powder":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_blue.jpg?w=98"
    case "singed":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_singed.jpg?w=98"
    case "steb":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_fish.jpg?w=98"
    case "trundle":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_trundle.jpg?w=98"
    case "vex":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_vex.jpg?w=98"
    case "violet":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_red.jpg?w=98"
    case "zyra":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_zyra.jpg?w=98"
    case "akali":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_akali.jpg?w=98"
    case "camille":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_camille.jpg?w=98"
    case "leona":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_leona.jpg?w=98"
    case "nocturne":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_nocturne.jpg?w=98"
    case "rell":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_rell.jpg?w=98"
    case "renata glasc":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_renataGlasc.jpg?w=98"
    case "sett":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_sett.jpg?w=98"
    case "tristana":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_tristana.jpg?w=98"
    case "urgot":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_urgot.jpg?w=98"
    case "vander":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_prime.jpg?w=98"
    case "vladimir":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_vladimir.jpg?w=98"
    case "zeri":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_zeri.jpg?w=98"
    case "ziggs":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_ziggs.jpg?w=98"
    case "blitzcrank":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_blitzcrank.jpg?w=98"
    case "cassiopeia":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_cassiopeia.jpg?w=98"
    case "ezreal":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_ezreal.jpg?w=98"
    case "gangplank":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_gangplank.jpg?w=98"
    case "kog'maw":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_kogmaw.jpg?w=98"
    case "loris":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_beardy.jpg?w=98"
    case "nami":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_nami.jpg?w=98"
    case "nunu":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_NunuWillump.jpg?w=98"
    case "renni":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_chainsaw.jpg?w=98"
    case "scar":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_flyguy.jpg?w=98"
    case "smeech":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_gremlin.jpg?w=98"
    case "swain":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_swain.jpg?w=98"
    case "twisted fate":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_twistedFate.jpg?w=98"
    case "ambessa":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_ambessa.jpg?w=98"
    case "corki":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_corki.jpg?w=98"
    case "dr. mundo":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_drmundo.jpg?w=98"
    case "ekko":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_ekko.jpg?w=98"
    case "elise":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_elise.jpg?w=98"
    case "garen":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_garen.jpg?w=98"
    case "heimerdinger":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_heimerdinger.jpg?w=98"
    case "illaoi":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_illaoi.jpg?w=98"
    case "silco":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_silco.jpg?w=98"
    case "twitch":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_twitch.jpg?w=98"
    case "vi":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_vi.jpg?w=98"
    case "zoe":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_zoe.jpg?w=98"
    case "caitlyn":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_caitlyn.jpg?w=98"
    case "jayce":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_jayce.jpg?w=98"
    case "jinx":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_jinx.jpg?w=98"
    case "leblanc":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_leblanc.jpg?w=98"
    case "malzahar":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_malzahar.jpg?w=98"
    case "mordekaiser":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_mordekaiser.jpg?w=98"
    case "rumble":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_rumble.jpg?w=98"
    case "sevika":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_lieutenant.jpg?w=98"
    case "mel":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_missmage.jpg?w=98"
    case "viktor":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_viktor.jpg?w=98"
    case "warwick":
      return "https://ap.tft.tools/img/ts13/face_full/TFT13_warwick.jpg?w=98"
    default:
      return ""
  }

}


function indexToTransformString(index: number): string {

  switch (index) {
    case 0:
      return "translate(48,292)";
    case 1:
      return "translate(144,292)";
    case 2:
      return "translate(240,292)";
    case 3:
      return "translate(336,292)";
    case 4:
      return "translate(432,292)";
    case 5:
      return "translate(528,292)";
    case 6:
      return "translate(624,292)";
    case 7:
      return "translate(0,196)";
    case 8:
      return "translate(96,196)";
    case 9:
      return "translate(192,196)";
    case 10:
      return "translate(288,196)";
    case 11:
      return "translate(384,196)";
    case 12:
      return "translate(480,196)";
    case 13:
      return "translate(576,196)";
    case 14:
      return "translate(48,100)";
    case 15:
      return "translate(144,100)";
    case 16:
      return "translate(240,100)";
    case 17:
      return "translate(336,100)";
    case 18:
      return "translate(432,100)";
    case 19:
      return "translate(528,100)";
    case 20:
      return "translate(624,100)";
    case 21:
      return "translate(0,4)";
    case 22:
      return "translate(96,4)";
    case 23:
      return "translate(192,4)";
    case 24:
      return "translate(288,4)";
    case 25:
      return "translate(384,4)";
    case 26:
      return "translate(480,4)";
    case 27:
      return "translate(576,4)";
    default:
      return "";
  }   
}
