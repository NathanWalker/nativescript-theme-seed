# Develop a custom NativeScript theme now 

## Getting started

1. `git clone https://github.com/NathanWalker/nativescript-theme-seed.git nativescript-theme-`[your-custom-name-here]
3. `cd nativescript-theme-[your-custom-name-here]`
4. `npm run postclone`
5. Get to work.

## Usage

The seed is prepared to allow you to test and try out your theme via the integrated app setup which is all set with several component pages you can test your custom theme against.
Additionally it provides a proper `.gitignore` to keep GitHub tidy as well as `.npmignore` to ensure everyone is happy when you publish your theme via npm.

### Typical development workflow:

1. Make changes to theme `SASS` files 
2. Make changes in `app` that would test those changes out
3. `tns emulate ios` or `tns run android`
4. Or use livesync: `tns livesync --emulator --watch`

## Publishing

**IMPORTANT**: Always make sure you have run the app in iOS or Android to verify any changes as well as ensure the latest `css` has been built before doing the following:

* Bump version in `nativescript-theme-[your-custom-name-here].json`
* Adjust `nativescript-theme-[your-custom-name-here].md` if any changes to the published `README` are needed.

```
npm run builder
cd nativescript-theme-[your-custom-name-here]
npm publish
```

**IMPORTANT**: Never modify the contents of `nativescript-theme-[your-custom-name-here]` folder directly. The builder creates that everytime and any change you make there will be overwritten.

Setup changelog generation:

```
npm install -g conventional-changelog-cli
```

Generate changelog workflow:

1. Make changes
2. Commit those changes - using [these conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153).
3. Make sure Travis turns green
4. Bump version in `package.json` and `nativescript-theme-[your-custom-name-here].json`
5. `conventional-changelog -p angular -i CHANGELOG.md -s`
6. Commit package.json and CHANGELOG.md files
7. Tag
8. Push

## Contributing - Want to make the seed better?

```
git clone https://github.com/NathanWalker/nativescript-theme-seed
cd nativescript-theme-seed

// Improve!
```
