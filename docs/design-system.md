# Design System

The site uses a color-block editorial system rather than cards or panels.

## Tokens

- Global tokens live in `src/styles/tokens.css`.
- Components read `--paper`, `--ink`, `--ink-2`, `--ink-3`, `--rule`, and related variables instead of defining per-tone variants.
- `.tone-*` classes repoint the palette for each section subtree.

## Tone Rules

- `sage`, `pink`, and `forest` are body-copy tones.
- `lilac` and `orange` are display-only tones for mark panels and runners.
- The TypeScript unions mirror the contrast rule so invalid tone use fails at implementation time.

## Motion

- Reveal hidden state is applied by JavaScript, never static CSS, so the exported HTML remains readable if JavaScript fails.
- Reduced motion disables smooth scroll and split/marquee effects.
- Tone tracking still runs under reduced motion because it preserves nav contrast rather than adding decoration.
