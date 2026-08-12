from PIL import Image
import numpy as np

im = Image.open('/Users/admin/Projects/Troffo/TROFFO.jpeg').convert('L')
A = np.asarray(im).astype(int)
S = (577 - 304) / 56.0          # px per CSS px, anchored on the 56px topbar
SBR = 1697                       # content left edge (right of sidebar divider)
TOP = 577                        # content top edge (below topbar)
CAP, ASC, DESC = 0.727, 0.750, 0.240

def ink(y0, y1, x0, x1, thr=150, pad=40):
    """Expand the window until the ink box no longer touches any border."""
    for _ in range(12):
        b = A[y0:y1, x0:x1]
        m = b < thr
        ys, xs = np.where(m)
        if not len(ys):
            return None
        t = ys.min() == 0
        bo = ys.max() == b.shape[0] - 1
        l = xs.min() == 0
        r = xs.max() == b.shape[1] - 1
        if not (t or bo or l or r):
            return (x0 + xs.min(), x0 + xs.max(), y0 + ys.min(), y0 + ys.max())
        if t: y0 = max(0, y0 - pad)
        if bo: y1 = min(A.shape[0], y1 + pad)
        if l: x0 = max(0, x0 - pad)
        if r: x1 = min(A.shape[1], x1 + pad)
    return (x0 + xs.min(), x0 + xs.max(), y0 + ys.min(), y0 + ys.max())

def report(label, win, metric):
    r = ink(*win)
    if r is None:
        print('%-20s none' % label)
        return
    ix0, ix1, iy0, iy1 = r
    w, h = (ix1 - ix0 + 1) / S, (iy1 - iy0 + 1) / S
    font = h / metric
    print('%-20s w=%6.2f h=%6.2f -> font=%5.1f   x=%6.2f y=%7.2f' % (
        label, w, h, font, (ix0 - SBR) / S, (iy0 - TOP) / S))

print('scale = %.4f px/css' % S)
# metric = ink height as a fraction of em for that specific string
report('KPI label',   (1150, 1250, 1750, 2500), CAP)              # "Lead Conversion" no desc
report('KPI value',   (1330, 1500, 1900, 2200), CAP)              # "32%" lining digits
report('Overview',    (680,  800,  1820, 2400), CAP + 0.015)      # 'O' overshoot
report('topbar title',(380,  500,  1950, 2500), ASC)              # "Dashboard" b/d ascender
report('brand text',  (380,  500,  450,  900),  CAP + DESC)       # "Vizually" V..y
report('tab label',   (1880, 2010, 1810, 2000), CAP + DESC)       # "Expenses" E..p
report('nav label',   (760,  840,  520,  800),  CAP)              # "Home" no desc
