# Gameplay screenshots

Drop real captures here using the exact filenames referenced in
`src/data/screenshots.ts`:

```
gameplay-1.webp
gameplay-2.webp
gameplay-3.webp
gameplay-4.webp
gameplay-5.webp
gameplay-6.webp
```

Guidelines:

- Portrait phone captures, ideally 1080 x 1920 (9:16). The gallery crops to
  `aspect-[9/16]`.
- `.webp` at quality ~80 keeps each file well under 200 KB.
- Update the `alt` and `caption` text in `src/data/screenshots.ts` to match what
  each capture actually shows.

Any file that is missing renders a styled placeholder instead of breaking the
layout, so partial sets are fine.
