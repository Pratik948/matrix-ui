# Skill: Publishing a New Version to npm

## Step-by-step

1. **Bump version in both packages:**
   ```
   packages/tokens/package.json  → "version": "x.y.z"
   packages/react/package.json   → "version": "x.y.z"
   ```

2. **Run full verification:**
   ```bash
   pnpm typecheck && pnpm build && pnpm test
   ```

3. **Commit:**
   ```bash
   git add packages/tokens/package.json packages/react/package.json
   git commit -m "chore: release vx.y.z"
   ```

4. **Create and push git tag:**
   ```bash
   git tag vx.y.z
   git push origin main
   git push origin vx.y.z
   ```

5. **GitHub Actions `publish.yml` triggers automatically** on tag push.
   It runs: `pnpm -r publish --access public --no-git-checks`

## Prerequisites

- `NPM_TOKEN` must be set in GitHub repo Settings → Secrets → Actions
- Packages are published as `@matrixui/tokens` and `@matrixui/react`
- Both packages have `"license": "MIT"` and `"files": ["dist", "src"]`

## Verify after publish

- `https://www.npmjs.com/package/@matrixui/tokens`
- `https://www.npmjs.com/package/@matrixui/react`

## Rollback

If a bad version is published, use:
```bash
npm deprecate @matrixui/tokens@x.y.z "Do not use — contains critical bug"
```
Then publish a patch version immediately.
