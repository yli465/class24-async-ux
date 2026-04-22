import Caption from "./Caption"
import Citation from "./Citation"

export default function Card({ imgUri, altText, caption, citation, bgColor = "#fff", isFlipped, onFlip }) {
  return (
    <div className="card" style={{ backgroundColor: bgColor }}>
      <button aria-label="flip card"
        onClick={() => onFlip(!isFlipped)}>
        <img src="/icons/flip.svg" />
      </button>

      {!isFlipped && <img src={imgUri} alt={altText} />}
      {!!isFlipped && <>
        {!!caption && <Caption text={caption} />}
        {!!citation && <Citation citation={citation} />}
      </>}
    </div>
  )
}
