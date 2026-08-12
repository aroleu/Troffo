import re, os, sys, base64

DEFS = '/Users/admin/Projects/Troffo/node_modules/@phosphor-icons/react/dist/defs'
KEYS = ['thin', 'light', 'regular', 'bold', 'fill', 'duotone']
ROOT = '/Users/admin/Projects/Troffo/probe'


def paths(name, weight='regular'):
    s = open(os.path.join(DEFS, name + '.es.js')).read()
    i = s.find('"%s"' % weight)
    if i < 0:
        raise SystemExit('weight %s not in %s' % (weight, name))
    nxt = len(s)
    for k in KEYS:
        p = s.find('"%s"' % k, i + 3)
        if p > 0:
            nxt = min(nxt, p)
    return re.findall(r'd:\s*"([^"]+)"', s[i:nxt])


# argv: design_crop.png  Name:weight,Name:weight  outname
crop, specs, out = sys.argv[1], sys.argv[2].split(','), sys.argv[3]

b64 = base64.b64encode(open(os.path.join(ROOT, crop), 'rb').read()).decode()
cells = ['<div class=c><div class="box design">'
         '<img src="data:image/png;base64,%s"></div><span>DESIGN</span></div>' % b64]

for spec in specs:
    name, _, w = spec.partition(':')
    w = w or 'regular'
    inner = ''.join('<path d="%s"/>' % d for d in paths(name, w))
    cells.append('<div class=c><div class=box>'
                 '<svg viewBox="0 0 256 256" width="150" height="150" fill="currentColor">%s</svg>'
                 '</div><span>%s<br>%s</span></div>' % (inner, name, w))

html = """<!doctype html><meta charset=utf-8><style>
body{font:12px Inter,system-ui;margin:0;padding:20px;background:#fff;color:#5a5b61}
.g{display:flex;flex-wrap:wrap;gap:14px}
.c{display:flex;flex-direction:column;align-items:center;gap:6px}
.box{width:170px;height:170px;display:grid;place-items:center;border:1px solid #eee;color:#6b6c75}
.box img{width:150px;height:150px;image-rendering:pixelated}
span{font-size:11px;color:#8a8a8a;text-align:center;line-height:1.3}
</style><div class=g>%s</div>""" % ''.join(cells)

open(os.path.join(ROOT, out + '.html'), 'w').write(html)
print('wrote', out)
