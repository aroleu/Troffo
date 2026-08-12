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


# argv: crop.png specs out title
crop, specs, out = sys.argv[1], sys.argv[2].split(','), sys.argv[3]

cells = [
    '<div class="c"><div class="box"><img src="%s"></div>'
    '<span>DESIGN<br>(scaled to 18px box)</span></div>' % crop
]
for spec in specs:
    name, _, w = spec.partition(':')
    w = w or 'regular'
    inner = ''.join('<path d="%s"/>' % d for d in paths(name, w))
    cells.append(
        '<div class="c"><div class="box">'
        '<svg viewBox="0 0 256 256" width="18" height="18" fill="currentColor">%s</svg>'
        '</div><span>%s<br>%s</span></div>' % (inner, name, w)
    )

html = """<!doctype html><meta charset="utf-8"><style>
body{font:12px Inter,system-ui;margin:0;padding:24px;background:#fff;color:#5a5b61}
h2{font-size:13px;color:#1c1c1c;margin:0 0 14px}
.g{display:flex;flex-wrap:wrap;gap:18px;align-items:flex-start}
.c{display:flex;flex-direction:column;align-items:center;gap:8px;width:96px;text-align:center}
.box{width:56px;height:56px;display:grid;place-items:center;border:1px dashed #e8e8e8}
.box img{width:18px;height:18px;object-fit:contain}
.c span{font-size:10px;color:#8a8a8a;line-height:1.4}
</style><h2>%s &mdash; rendered at true 18px</h2><div class="g">%s</div>""" % (out, ''.join(cells))

open('/Users/admin/Projects/Troffo/probe/%s.html' % out, 'w').write(html)
print('wrote', out)
