from pathlib import Path
import re
root = Path('src')

for p in root.rglob('*.tsx'):
    text = p.read_text(encoding='utf-8')
    changed = [False]
    def repl(m):
        mod = m.group(1)
        i = mod.rfind('@')
        if i != -1 and i+1 < len(mod) and mod[i+1].isdigit():
            new_mod = mod[:i]
            if new_mod == '':
                return m.group(0)
            changed[0] = True
            return f'from "{new_mod}"'
        return m.group(0)
    res = re.sub(r'from\s+"([^"]+)"', repl, text)
    def repl2(m):
        mod = m.group(1)
        i = mod.rfind('@')
        if i != -1 and i+1 < len(mod) and mod[i+1].isdigit():
            new_mod = mod[:i]
            if new_mod == '':
                return m.group(0)
            changed[0] = True
            return f"from '{new_mod}'"
        return m.group(0)
    res = re.sub(r"from\s+'([^']+)'", repl2, res)
    if changed[0]:
        p.write_text(res, encoding='utf-8')
        print('patched', p)
