import { useState } from "react";

export default function Alert({ message }) {
  const [isShowing, setIsShowing] = useState(true)

  return (!!isShowing &&
    <div className="alert" role="alert">
      <h3>{message}</h3>
      <button type="button"
        aria-label="dismiss"
        onClick={() => setIsShowing(false)}>
        ✕
      </button>
    </div>
  )
}
