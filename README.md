# expenses_app

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.7. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

Modification to the database

```bash
bunx drizzle-kit generate
```

and then do the migration command

```bash
bun migrate.ts
```

Run drizzle-studio locally

```bash
 bunx drizzle-kit studio
```
