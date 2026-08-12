import re, os, sys

DEFS = '/Users/admin/Projects/Troffo/node_modules/@phosphor-icons/react/dist/defs'
KEYS = ['thin', 'light', 'regular', 'bold', 'fill', 'duotone']


def paths(name, weight='regular'):
    s = open(os.path.join(DEFS, name + '.es.js')).read()
    i = s.find('"%s"' % weight)
    if i < 0:
        return []
    nxt = len(s)
    for k in KEYS:
        p = s.find('"%s"' % k, i + 3)
        if p > 0:
            nxt = min(nxt, p)
    return re.findall(r'd:\s*"([^"]+)"', s[i:nxt])


# argv: crop.png  Name:weight,Name:weight,...  out
crop = sys.argv[1]
specs = sys.argv[2].split(',')
out = sys.argv[3]

cells = ['<div class="c"><img src="%s" width="120" height="120"><span>DESIGN</span></div>' % crop]
for spec in specs:
    name, _, w = spec.partition(':')
    w = w or 'regular'
    ds = paths(name, w)
    inner = ''.join('<path d="%s"/>' % d for d in ds)
    cells.append(
        '<div class="c"><svg viewBox="0 0 256 256" width="120" height="120" fill="currentColor">%s</svg>'
        '<span>%s %s</span></div>' % (inner, name, w)
    )

html = """<!doctype html><meta charset="utf-8"><style>
body{font:12px Inter,system-ui;margin:0;padding:20px;background:#fff;color:#78787e}
.g{display:flex;flex-wrap:wrap;gap:20px;align-items:flex-start}
.c{display:flex;flex-direction:column;align-items:center;gap:6px}
.c span{font-size:11px;color:#8a8a8a}
img{image-rendering:auto}
</style><div class="g">%s</div>""" % ''.join(cells)

open('/Users/admin/Projects/Troffo/probe/%s.html' % out, 'w').write(html)
print('wrote', out)
