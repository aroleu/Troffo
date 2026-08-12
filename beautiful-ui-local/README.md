# Beautiful UI — local study library

This project is a private, local-only study reconstruction of the public component demos at [beautiful-ui-five.vercel.app](https://beautiful-ui-five.vercel.app/).

It contains the 19 TSX component sources exposed through the original site's **View code** controls, the site's compiled visual stylesheet, locally cached font/image assets, and a local Next.js showcase.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For a production verification build:

```bash
npm run typecheck
npm run build
```

## Component imports

```tsx
import {
  ApprovalCard,
  LoadingState,
  PromptBar,
  ThinkingState,
} from "@/components";
```

All public components are exported from `components/index.ts`.

## Notes

- The source components intentionally retain their original demo data, animation timing, design tokens, and interaction behavior for visual study.
- `PromptBar` uses `glimm`, `InsightCards` uses `liveline`, and `SelectionActions` uses `iconoir-react`.
- `Shimmer` and `StreamText` were reconstructed from the behavior present in the deployed JavaScript because the public component snippet referenced them as internal atoms.
- The original project does not publish an explicit license or public repository. Keep this copy private and do not redistribute it without permission from the original author.
