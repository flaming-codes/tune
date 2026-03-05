# Seed System

The seed system populates the database with sample content for development and testing. It lives in `apps/web/src/seed/`.

## Running the Seed

```bash
# Via onInit (auto-seeds on dev server start)
PAYLOAD_SEED=true pnpm dev:web

# Force overwrite existing data
PAYLOAD_SEED=true PAYLOAD_SEED_OVERWRITE=true pnpm dev:web

# Standalone CLI
pnpm seed:web
```

Environment variables:

| Variable | Description |
|----------|-------------|
| `PAYLOAD_SEED` | Set to `"true"` to enable seeding on `onInit` |
| `PAYLOAD_SEED_OVERWRITE` | Set to `"true"` to overwrite existing data |

## Architecture

The unified orchestrator (`src/seed/index.ts`) runs seeds in order:

1. **media.ts** — Uploads `fixtures/images/dog.jpg` as a shared media item. Returns the media document ID used by all subsequent seeds.
2. **startPage.ts** — Seeds the StartPage global (navigation, layout blocks, footer, SEO, JSON-LD). Injects the media ID as `heroImage`.
3. **legal-pages.ts** — Seeds ImprintPage and PrivacyPolicyPage globals with rich text content.
4. **team-members.ts** — Creates 2 sample team members with photos, memberHero, and memberCv blocks.
5. **gallery-images.ts** — Creates 3 sample gallery images (one featured).
6. **testimonials.ts** — Creates 3 sample testimonials with avatars.

Each seed checks for existing data and skips unless `overwrite` is `true`.

## Design Decisions

- **No content defaults in schemas.** Block and collection definitions contain only structural/UX defaults (e.g., `sortOrder: 0`, `isActive: true`, `variant: 'editorial'`). All business content lives exclusively in seed files.
- **Single media fixture.** All image fields reference the same uploaded `dog.jpg` to keep the seed simple. Add more fixture images to `fixtures/images/` as needed.
- **Idempotent.** Without `overwrite`, seeds are no-ops if data already exists.
