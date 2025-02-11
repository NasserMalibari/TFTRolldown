import { Unit } from "../pages/MainPage";
import { indexToTransformString, unitToHref } from "../utils/utils";



interface BoardProps {
  boardState: (Unit | null)[];
  hovered: boolean[];
  setHovered: React.Dispatch<React.SetStateAction<boolean[]>>;
  isDraggingRef: React.MutableRefObject<boolean>;
  handleMouseDown: (e: React.MouseEvent) => void;
}

function Board({boardState, hovered, setHovered, isDraggingRef, handleMouseDown}: BoardProps) {
    
    return (
    <div className="border defaultBG" id="board">

        <svg className="w-full md:w-[684px] xl:w-[760px]" viewBox="0 0 760 420">
        <g transform="translate(22, 14)">
        {boardState.map((unit, index) =>
        index < 28 && (
            <g className="hex" key={index} id={`hex${index}`} transform={indexToTransformString(index)} onMouseDown={unit ? handleMouseDown : undefined}>
            <path d="M48.49742261192856 0L96.99484522385713 28L96.99484522385713 84L48.49742261192856 112L0 84L0 28Z" fill="transparent" transform="translate(-5.5, -6)"></path>
            <path d="M43.30127018922193 0L86.60254037844386 25L86.60254037844386 75L43.30127018922193 100L0 75L0 25Z" 
                fill={unit ? "rgba(0, 0, 0, 0.6)" : hovered[index] ? "rgba(0, 0, 0, 0.3)" : "rgba(0, 0, 0, 0.6)"} 
                stroke={unit ? "rgba(187, 187, 187, 0.75)" : undefined} strokeWidth={unit ? "3.5" : undefined}
                onMouseOver={() => isDraggingRef.current && setHovered(prev => { const newHovered = [...prev]; newHovered[index] = true; return newHovered; })}
                onMouseLeave={() => setHovered(prev => { const newHovered = [...prev]; newHovered[index] = false; return newHovered; })}>
            </path>
            {unit && (
                <g>
                <image height="98" width="98" href={unitToHref(unit.name)} clipPath="polygon(50% 0%, 93.301270189% 25%, 93.301270189% 75%, 50% 100%, 6.698729811% 75%, 6.698729811% 25%)" x="-5" y="2"></image>
                {[2, 3].includes(unit.starLevel) && (
                    <g transform="translate(42, 0)">
                    {[...Array(unit.starLevel)].map((_, i) => (
                        <g key={i} width="22.056631892697467" transform={`translate(${(i - (unit.starLevel - 1) / 2) * 22.056631892697467}, 0)`}>
                        <polygon fill={unit.starLevel === 2 ? "#add1e4" : "#dcba11"} stroke="#111" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="star" points="11.028315946348734,0,14.629583430174119,6.071596490830758,21.516867690885448,7.620378899590744,16.85528913775802,12.921614305658727,17.51059741723443,19.95041096628109,11.028315946348734,17.155158138764698,4.54603447546304,19.95041096628109,5.201342754939447,12.921614305658728,0.5397642018120159,7.620378899590746,7.427048462523347,6.071596490830759"></polygon>
                        </g>
                    ))}
                    </g>
                )}
                </g>
            )}
            </g>
        )
        )}

        </g>
      </svg>
  </div>
  );
}

export default Board;