/**
 * Explicit icon registry.
 *
 * The data files name their icons as strings, which is convenient — but the
 * obvious way to resolve them, `import * as Icons from 'lucide-react'`, defeats
 * tree-shaking and drags all ~1,500 icons into the bundle. That alone was
 * roughly 700 kB of the first production build.
 *
 * Naming each icon here keeps the string-based data files and ships only the
 * eleven icons actually used. If you add an icon name to services.js or
 * faqs.js, add its import here too — `iconFor` falls back to a visible default
 * rather than crashing, so a missed one degrades quietly.
 */
import {
  AlignHorizontalJustifyStart,
  BedDouble,
  Hammer,
  Home,
  IndianRupee,
  PanelTop,
  Phone,
  Recycle,
  Ruler,
  Sofa,
  Sparkles,
  Blinds,
} from 'lucide-react'

const REGISTRY = {
  AlignHorizontalJustifyStart,
  BedDouble,
  Blinds,
  Hammer,
  Home,
  IndianRupee,
  PanelTop,
  Phone,
  Recycle,
  Ruler,
  Sofa,
  Sparkles,
}

export const iconFor = (name) => REGISTRY[name] ?? Sparkles
