// Injects the design crop as a semi-transparent overlay pinned to the viewport
// origin so layout drift is directly visible. Scale is tuned via window.__S.
(function () {
  const old = document.getElementById('__ov')
  if (old) old.remove()
  const s = window.__S || 4.875
  const img = document.createElement('img')
  img.id = '__ov'
  img.src = '/probe/design.png'
  img.style.cssText = [
    'position:fixed',
    'left:0',
    'top:0',
    'transform-origin:0 0',
    `transform:scale(${1 / s})`,
    'opacity:' + (window.__O || 0.5),
    'pointer-events:none',
    'z-index:99999',
    'mix-blend-mode:difference',
  ].join(';')
  document.body.appendChild(img)
  return 'overlay at scale ' + s
})()
