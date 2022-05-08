# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [4.1.3](https://github.com/ngneat/svg-icon/compare/v4.1.2...v4.1.3) (2022-05-08)


### Bug Fixes

* 🐛 ignore undefined size values on init ([#91](https://github.com/ngneat/svg-icon/issues/91)) ([b88025d](https://github.com/ngneat/svg-icon/commit/b88025d1c8a08356dea0a60fa09de95e2c18db4d))

### [4.1.2](https://github.com/ngneat/svg-icon/compare/v4.1.1...v4.1.2) (2022-04-24)


### Bug Fixes

* 🐛 svg config size type ([#90](https://github.com/ngneat/svg-icon/issues/90)) ([d35ea34](https://github.com/ngneat/svg-icon/commit/d35ea348b8d9b4385d1ec3395b92ba63b22e36a6)), closes [#85](https://github.com/ngneat/svg-icon/issues/85)

### [4.1.1](https://github.com/ngneat/svg-icon/compare/v4.1.0...v4.1.1) (2022-04-21)


### Bug Fixes

* 🐛 noShrink when only passing a key ([26cc88d](https://github.com/ngneat/svg-icon/commit/26cc88ddc676e543a8d7b53c64f7ef3004a2231d))
* 🐛 schematics should install the latest generator version ([4643c4d](https://github.com/ngneat/svg-icon/commit/4643c4d14f901c8a023f8662cbca2e165ab1a14a)), closes [#81](https://github.com/ngneat/svg-icon/issues/81)

## [4.1.0](https://github.com/ngneat/svg-icon/compare/v4.0.2...v4.1.0) (2022-03-01)


### Features

* 🎸 svg-generator update ts and svgo ([6cb2473](https://github.com/ngneat/svg-icon/commit/6cb24732e63584eaaa7f2616f5c311214ef2bed8))


### Bug Fixes

* 🐛 race between no shrink and other size inputs ([#76](https://github.com/ngneat/svg-icon/issues/76)) ([7a6edd5](https://github.com/ngneat/svg-icon/commit/7a6edd5af4bafa427849fe188bbb2ddb7fb82122))

### [4.0.2](https://github.com/ngneat/svg-icon/compare/v4.0.1...v4.0.2) (2021-11-29)


### Bug Fixes

* 🐛 Fix schema ID for Angular 13 ([b45578d](https://github.com/ngneat/svg-icon/commit/b45578da3ecccbd66b74f95dd11e6143347c54f6))

### [4.0.1](https://github.com/ngneat/svg-icon/compare/v4.0.0...v4.0.1) (2021-11-20)


### Bug Fixes

* 🐛 remove schematics-utilities ([711864a](https://github.com/ngneat/svg-icon/commit/711864a0b3801553ea0dbb00b21f4a6f616bb64e)), closes [#57](https://github.com/ngneat/svg-icon/issues/57) [#56](https://github.com/ngneat/svg-icon/issues/56) [#55](https://github.com/ngneat/svg-icon/issues/55) [#38](https://github.com/ngneat/svg-icon/issues/38)

## [4.0.0](https://github.com/ngneat/svg-icon/compare/v3.3.1...v4.0.0) (2021-11-20)


### ⚠ BREAKING CHANGES

* 🧨 The library requires angular v13

### Features

* 🎸 upgrade to v13 ([83bbc34](https://github.com/ngneat/svg-icon/commit/83bbc34a2a36ed18183ec6dd5ebffdd652ff2ef8)), closes [#59](https://github.com/ngneat/svg-icon/issues/59)

### [3.3.1](https://github.com/ngneat/svg-icon/compare/v3.3.0...v3.3.1) (2021-11-20)

## [3.3.0](https://github.com/ngneat/svg-icon/compare/v3.2.0...v3.3.0) (2021-11-10)


### Features

* 🎸 add no shrink ([#58](https://github.com/ngneat/svg-icon/issues/58)) ([13b5452](https://github.com/ngneat/svg-icon/commit/13b5452eef6960dc43c562aa6e164f50d5a2f465))
* pass file path to SVG Optimizer ([953da9b](https://github.com/ngneat/svg-icon/commit/953da9bd98199fe2149f689bebb86eecbec58bc2))


### Bug Fixes

* 🐛 icons multi provider ([1f8e55c](https://github.com/ngneat/svg-icon/commit/1f8e55cbe12f69b4f517c32d92da31a624abd483))
* 🐛 reregister icons in nested forChild module ([863e1a5](https://github.com/ngneat/svg-icon/commit/863e1a575203fecc16e0f4fec9e2c0a20d8a822a))
* **docs:** svgo plugin json ([e89abc1](https://github.com/ngneat/svg-icon/commit/e89abc10481af233a3a50fcef44964dbf8ebcde4)), closes [#47](https://github.com/ngneat/svg-icon/issues/47)

## [3.2.0](https://github.com/ngneat/svg-icon/compare/v3.1.1...v3.2.0) (2021-05-18)


### Features

* 🎸 add missing icon support if icon not found in registry ([57d861f](https://github.com/ngneat/svg-icon/commit/57d861f3364ee5e8213fd5e91da3417321ccb24f))


### Bug Fixes

* replace the `inject` function with `injector.get` ([0cb3882](https://github.com/ngneat/svg-icon/commit/0cb3882a4ee37719bdf94c38a5a50a5cb3de66fb))

### [3.1.1](https://github.com/ngneat/svg-icon/compare/v3.1.0...v3.1.1) (2021-03-21)


### Bug Fixes

* 🐛 align schematics dep ([f5ec6ca](https://github.com/ngneat/svg-icon/commit/f5ec6ca0b3f8a7c3d67a246ef84f6c5fc0bdeb7e)), closes [#37](https://github.com/ngneat/svg-icon/issues/37)

## [3.1.0](https://github.com/ngneat/svg-icon/compare/v3.0.0...v3.1.0) (2021-02-28)


### Features

* 🎸 add aria hidden attr ([5c1174c](https://github.com/ngneat/svg-icon/commit/5c1174ca41c33606fbf4723e7e1b96af823db56e))
* 🎸 bump version ([df308e7](https://github.com/ngneat/svg-icon/commit/df308e7d9ec6cdec9e2133bfc3062210b7b9054b))

### [2.3.1](https://github.com/ngneat/svg-icon/compare/v2.3.0...v2.3.1) (2021-02-08)


### Bug Fixes

* 🐛 preserve icon size on key change ([d3cc619](https://github.com/ngneat/svg-icon/commit/d3cc619b81dbc0b5148ec6bad2c9b91da539d2cd))

## [2.3.0](https://github.com/ngneat/svg-icon/compare/v2.2.2...v2.3.0) (2021-01-21)


### Features

* use svg-generator instead of svg-to-ts ([195d9d8](https://github.com/ngneat/svg-icon/commit/195d9d86533b824d51a56b0816b4c7c0ca13d623))


### Bug Fixes

* **ng-add:** remove svgIcons import ([4e50c32](https://github.com/ngneat/svg-icon/commit/4e50c32aa64f2a67213ddc31e9be82536a91cd7b))
* rename invalid path 'svg-generator\ /' -> svg-generator ([d721f9d](https://github.com/ngneat/svg-icon/commit/d721f9d0e5f61055305c5fce0eedd7252bceee55))
* svg-generator path ([209c6fc](https://github.com/ngneat/svg-icon/commit/209c6fcc06d294025a25c86862b1300d5f1b2053))

### [2.2.2](https://github.com/ngneat/svg-icon/compare/v2.2.1...v2.2.2) (2021-01-19)


### Bug Fixes

* **ng-add:** missing return ([44c1aac](https://github.com/ngneat/svg-icon/commit/44c1aac3d3f8118b1be3cd23effa0fee343e504b))

### [2.2.1](https://github.com/ngneat/svg-icon/compare/v2.2.0...v2.2.1) (2021-01-19)


### Bug Fixes

* **ng-add:** handling src/assets/svg empty folder ([5da88f3](https://github.com/ngneat/svg-icon/commit/5da88f3d1913b1466d4afedaf14aa4284e8c29b7))

## [2.2.0](https://github.com/ngneat/svg-icon/compare/v2.1.2...v2.2.0) (2021-01-01)


### Features

* 🎸 add xl and xxl sizes ([ed909c5](https://github.com/ngneat/svg-icon/commit/ed909c549e7bc742ec79bfda695e1a69bf5860d4)), closes [#18](https://github.com/ngneat/svg-icon/issues/18)

### [2.1.2](https://github.com/ngneat/svg-icon/compare/v2.1.1...v2.1.2) (2020-12-31)


### Bug Fixes

* 🐛 size input fix ([e7617b2](https://github.com/ngneat/svg-icon/commit/e7617b2e0e1bfc57e9d645fc3ca9c938823a56a6))

### [2.1.1](https://github.com/ngneat/svg-icon/compare/v2.1.0...v2.1.1) (2020-12-31)


### Bug Fixes

* 🐛 fix size ([a16f512](https://github.com/ngneat/svg-icon/commit/a16f51235163808a695a9e95ff1c77a47bcad90d))

## [2.1.0](https://github.com/ngneat/svg-icon/compare/v2.0.0...v2.1.0) (2020-11-16)


### Features

* support server-side rendering ([dc60850](https://github.com/ngneat/svg-icon/commit/dc6085070d38c34dc95d22b6c735552664f445fd))

## [2.0.0](https://github.com/ngneat/svg-icon/compare/v1.0.3...v2.0.0) (2020-11-12)


### ⚠ BREAKING CHANGES

* An icon is now an object with a name and data keys

### Features

* 🎸 lazy load focus ([718819f](https://github.com/ngneat/svg-icon/commit/718819f7ff56f546e2480b0ed1fe28fdfd70580c))

### [1.0.3](https://github.com/ngneat/svg-icon/compare/v1.0.2...v1.0.3) (2020-11-12)


### Bug Fixes

* 🐛 fontsize input allow string ([7639ee2](https://github.com/ngneat/svg-icon/commit/7639ee2fe2c80687f05d363696d290258985b7ca)), closes [#8](https://github.com/ngneat/svg-icon/issues/8)

### [1.0.2](https://github.com/ngneat/svg-icon/compare/v1.0.1...v1.0.2) (2020-11-09)

### [1.0.1](https://github.com/ngneat/svg-icon/compare/v1.0.0...v1.0.1) (2020-11-05)

## 1.0.0 (2020-06-23)


### Features

* 🎸 add schematics ([a31c212](https://github.com/ngneat/svg-icon/commit/a31c2123e8816a7f7214c4d58c1fdac52cd89b08))
