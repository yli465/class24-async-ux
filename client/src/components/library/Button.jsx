export default function Button({ color = 'default', children, ...buttonProps }) {

  const base = 'px-6 py-3 font-semibold rounded-2xl cursor-pointer'
  const styles = {
    default: 'bg-slate-100 text-black hover:bg-slate-500 hover:text-white',
    primary: 'bg-blue-400 text-white hover:bg-blue-700',
  }

  return <button {...buttonProps} className={`${base} ${styles[color]}`}>
    {children}
  </button>
}
