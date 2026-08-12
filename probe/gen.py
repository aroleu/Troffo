import re, os, json, sys

DEFS = '/Users/admin/Projects/Troffo/node_modules/@phosphor-icons/react/dist/defs'

def paths(name, weight='regular'):
    s = open(os.path.join(DEFS, name + '.es.js')).read()
    i = s.find('"%s"' % weight)
    if i < 0:
        return []
    j = s.find('"%s"' % 'END', i)
    # take until next weight key
    keys = ['thin','light','regular','bold','fill','duotone']
    nxt = len(s)
    for k in keys:
        p = s.find('"%s"' % k, i + 3)
        if p > 0:
            nxt = min(nxt, p)
    chunk = s[i:nxt]
    ds = re.findall(r'd:\s*"([^"]+)"', chunk)
    ops = re.findall(r'opacity:\s*"([^"]+)"', chunk)
    return ds

CANDIDATES = sys.argv[1].split(',')
WEIGHT = sys.argv[2] if len(sys.argv) > 2 else 'regular'

cells = []
for n in CANDIDATES:
    try:
        ds = paths(n, WEIGHT)
    except FileNotFoundError:
        cells.append('<div class="c"><div class="miss">?</div><span>%s</span></div>' % n)
        continue
    inner = ''.join('<path d="%s"/>' % d for d in ds)
    svg = ('<svg viewBox="0 0 256 256" width="72" height="72" fill="currentColor">%s</svg>' % inner)
    cells.append('<div class="c">%s<span>%s</span></div>' % (svg, n))

html = """<!doctype html><meta charset="utf-8"><style>
body{font:12px Inter,system-ui;margin:0;padding:16px;background:#fff;color:#5a5b61}
.g{display:flex;flex-wrap:wrap;gap:14px}
.c{width:104px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center}
.c span{font-size:10px;color:#8a8a8a;word-break:break-all}
.miss{width:72px;height:72px;display:grid;place-items:center;border:1px dashed #ddd}
</style><div class="g">%s</div>""" % ''.join(cells)

out = sys.argv[3] if len(sys.argv) > 3 else 'icons'
open('/Users/admin/Projects/Troffo/probe/%s.html' % out, 'w').write(html)
print('wrote', len(CANDIDATES))
