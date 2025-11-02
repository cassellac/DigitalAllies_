# Repository Cleanup Report
**Date:** November 2, 2025  
**Status:** Analysis Complete

---

## 📊 Current Issues Identified

### 1. **Duplicate/Unused CSS Files**
- ❌ `assets/tokens.css` - NOT referenced in any HTML file
- ✅ `assets/global.css` - Used everywhere (KEEP)

**Action:** `tokens.css` can be merged into `global.css` or deleted if redundant.

---

### 2. **Dead/Test Files**
- ❌ `test-js.html` - Test file with no purpose
- ❌ `untitled.txt` - Python script unrelated to project (CMS page generator)
- ❌ `version-scaffold.md` - Likely outdated documentation
- ❌ `# Code Citations.md` - Unusual filename with space and #

---

### 3. **Unused Asset Files in `/assets/`**
These SVG files exist but are NOT referenced in any HTML:
- ❌ `2D Shape Patterns Worksheet.svg`
- ❌ `accessible website.svg`
- ❌ `digitalaccessibility.svg`
- ❌ `digitalexperience.svg`
- ❌ `downloads.svg`
- ❌ `home.png`

**Used Assets (KEEP):**
- ✅ `developement.svg` - Used in index.html
- ✅ `design.svg` - Used in index.html
- ✅ `consulting2.svg` - Used in index.html

---

### 4. **Empty/Placeholder Directories**
- `/files/documents/` - Contains nested empty folder
- `/images/` - Has `.gitkeep` (placeholder) + some post images

---

### 5. **File Organization Issues**

**Assets folder is cluttered:**
```
/assets/
  ├── global.css ✅
  ├── tokens.css ⚠️ (unused)
  ├── CSS-CHEATSHEET.md ⚠️ (documentation in assets?)
  ├── global-header-footer.ignore ⚠️ (template file)
  ├── SVG files (mix of used/unused)
  ├── /js/ ✅
  ├── /brand/ ✅
  ├── /favicon/ ✅
  └── /shapes/ ✅
```

**Recommendation:** Move documentation and template files to `/docs/`

---

### 6. **Dreamweaver Sync Files**
Multiple `_notes/dwsync.xml` files throughout the project:
- `/assets/_notes/`
- `/assets/js/_notes/`
- `/assets/shapes/_notes/`
- `/assets/favicon/_notes/`

**Action:** These are IDE-specific and should be in `.gitignore`

---

## 🎯 Recommended Actions

### Priority 1: Remove Dead Files
1. Delete `test-js.html`
2. Delete `untitled.txt`
3. Delete `version-scaffold.md`
4. Rename/delete `# Code Citations.md`

### Priority 2: Clean Up Assets
1. Move unused SVGs to `/assets/archive/` or delete:
   - `2D Shape Patterns Worksheet.svg`
   - `accessible website.svg`
   - `digitalaccessibility.svg`
   - `digitalexperience.svg`
   - `downloads.svg`
   - `home.png`

2. Decide on `tokens.css`:
   - Option A: Delete (variables are duplicated in global.css)
   - Option B: Consolidate into global.css
   - Option C: Link it in HTML if you want to use it

### Priority 3: Reorganize Documentation
1. Move `CSS-CHEATSHEET.md` from `/assets/` to `/docs/`
2. Move `global-header-footer.ignore` to `/docs/templates/`
3. Update path references

### Priority 4: Update .gitignore
Add Dreamweaver-specific files:
```
_notes/
dwsync.xml
.DS_Store
```

---

## 📋 Files Summary

### ✅ Keep (In Use)
- `assets/global.css`
- `assets/js/*.js` (all 3 files)
- `assets/developement.svg`
- `assets/design.svg`
- `assets/consulting2.svg`
- `assets/brand/*`
- `assets/favicon/*`
- `assets/shapes/*`

### ⚠️ Decision Needed
- `assets/tokens.css` - Not linked, but has valid content
- `assets/CSS-CHEATSHEET.md` - Good file, wrong location
- `assets/global-header-footer.ignore` - Template, should be in docs

### ❌ Can Delete
- `test-js.html`
- `untitled.txt`
- `version-scaffold.md`
- `# Code Citations.md`
- Unused SVG files (7 files)
- `_notes/` folders (if added to .gitignore)

---

## 💡 Proposed New Structure

```
/assets/
  ├── /css/
  │   └── global.css
  ├── /js/
  │   ├── global.js
  │   ├── floating-shapes.js
  │   ├── blog-dynamic-load.js
  │   └── knowledge-base.js
  ├── /images/
  │   ├── icons/
  │   │   ├── developement.svg
  │   │   ├── design.svg
  │   │   └── consulting2.svg
  │   └── posts/
  │       └── (blog post images)
  ├── /brand/
  ├── /favicon/
  └── /shapes/

/docs/
  ├── CSS-CHEATSHEET.md
  ├── global-update-brief.md
  └── /templates/
      └── global-header-footer.html

/scripts/
  (build tools - already organized)
```

---

## 🚀 Next Steps

Would you like me to:
1. ✅ Execute the cleanup (delete dead files)?
2. ✅ Reorganize the structure?
3. ✅ Update all file paths in HTML?
4. ✅ Update .gitignore?
5. ⚠️ Consolidate or remove tokens.css?

**Waiting for your approval before making changes.**
