# Publishing Guide for @klarui/react

## Prerequisites

1. **Create npm account** (if you don't have one):
   - Go to https://www.npmjs.com/signup
   - Create account with your email
   - Verify your email address

2. **Login to npm on your server**:
   ```bash
   npm login
   ```
   Enter your npm username, password, and email.

## Check Before Publishing

### 1. Verify package name is available
```bash
npm view @klarui/react
```
If you get "npm ERR! 404 Not Found", the name is available! ✅

### 2. Check what will be published
```bash
cd /home/klarui/app/packages/klarui-react
npm pack --dry-run
```
This shows exactly which files will be included.

### 3. Verify the build
```bash
pnpm build
ls -la dist/
```
Should see:
- `index.js` (ES module)
- `index.cjs` (CommonJS)
- `styles.css` (CSS bundle)

## Publishing Steps

### First Time Setup (if using scoped package @klarui)

Since `@klarui/react` is a scoped package, you need to either:

**Option 1: Publish as public (FREE)**
```bash
cd /home/klarui/app/packages/klarui-react
npm publish --access public
```

**Option 2: Change to unscoped name**
Edit `package.json`:
```json
{
  "name": "klarui-react",  // Instead of @klarui/react
  ...
}
```

### Regular Publishing Process

1. **Update version** (if needed):
   ```bash
   # Patch version (0.1.0 -> 0.1.1)
   npm version patch
   
   # Minor version (0.1.0 -> 0.2.0)
   npm version minor
   
   # Major version (0.1.0 -> 1.0.0)
   npm version major
   ```

2. **Build the package**:
   ```bash
   pnpm build
   ```

3. **Publish to npm**:
   ```bash
   npm publish --access public
   ```

4. **Verify it's published**:
   ```bash
   npm view @klarui/react
   ```

## After Publishing

1. **Test installation**:
   ```bash
   # In a test project
   npm install @klarui/react
   ```

2. **Add npm badge to README** (already included)

3. **Create Git tag**:
   ```bash
   git tag v0.1.0
   git push origin v0.1.0
   ```

## Version Management

### Semantic Versioning (SemVer)
- **MAJOR** (1.0.0): Breaking changes
- **MINOR** (0.1.0): New features, backward compatible
- **PATCH** (0.0.1): Bug fixes, backward compatible

### When to bump versions:
- Bug fix: `npm version patch` (0.1.0 → 0.1.1)
- New component: `npm version minor` (0.1.0 → 0.2.0)
- Breaking change: `npm version major` (0.1.0 → 1.0.0)

## Unpublish (if needed)

You can unpublish within 72 hours:
```bash
npm unpublish @klarui/react@0.1.0
```

## Automated Publishing with GitHub Actions

Create `.github/workflows/publish.yml` (optional, for later):
```yaml
name: Publish Package

on:
  release:
    types: [created]

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          registry-url: 'https://registry.npmjs.org'
      - run: pnpm install
      - run: pnpm build
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```

## Important Notes

- The `prepublishOnly` script in package.json will automatically run `pnpm build` before publishing
- Only files in the `dist/` folder will be published (specified in `"files": ["dist"]`)
- README.md and LICENSE are automatically included
- Once published, you cannot change that version - you must publish a new version
