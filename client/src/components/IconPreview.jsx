export default function IconPreview({ backgroundColor, foregroundColor }) {
  return (
    <div className="icon-preview" style={{ backgroundColor }}>
      <svg
        className="icon-preview-svg"
        viewBox="0 0 24 24"
        role="img"
        aria-label="Preview icon"
        style={{ color: foregroundColor }}
      >
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <rect x="11" y="10" width="2" height="7" fill={backgroundColor} />
        <circle cx="12" cy="7" r="1.25" fill={backgroundColor} />
      </svg>
    </div>
  )
}
