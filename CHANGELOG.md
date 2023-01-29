# Changelog

## [1.0.0](https://github.com/telostat/typescript-prelude/compare/v0.1.2...v1.0.0) (2023-01-29)


### ⚠ BREAKING CHANGES

* We have refactored the names AND the semantics of our finite, arbitrary precision number constructors.
* drop newtype module
* Adjective usage is more proper than noun usage. Also, this module will eventually introduce more definitions which are not coming from purify.ts.
* Adjective usage is more proper than noun usage, like that we are using numeric for the module that deals with numbers and textual for the module that deals with texts.
* Adjective usage is more proper than noun usage, like that we are using numeric for the module that deals with numbers.
* decimal module did not have exlusively `Decimal` related definitions. Therefore, the module is renamed to numeric.

### Features

* improve temporal module ([3b344ae](https://github.com/telostat/typescript-prelude/commit/3b344ae6828c32567f6975a653908a28aa436c69))


### Code Refactoring

* drop newtype module ([b1b5d7b](https://github.com/telostat/typescript-prelude/commit/b1b5d7bc1b3644375cf37f62b186f289e06e2267))
* refactor finite, arbitrary precision number constructors ([59cfdd7](https://github.com/telostat/typescript-prelude/commit/59cfdd7339c2fe639dc2294b7bf81aa346c24a0f))
* rename decimal module to numeric ([1cbe070](https://github.com/telostat/typescript-prelude/commit/1cbe07028be86cdab24a0d0b0df2f7ccac07caf9))
* rename purify module to functional ([f6509f7](https://github.com/telostat/typescript-prelude/commit/f6509f77e50470a0d4f157eeab43c05b2614139a))
* rename text module to textual ([118fa9f](https://github.com/telostat/typescript-prelude/commit/118fa9f785db90a2923a7b28db20fdce056c143a))
* rename zeitgeist module to temporal ([9fb015d](https://github.com/telostat/typescript-prelude/commit/9fb015dfeb088021e26f6fe3e5555eabb302fbba))

## [0.1.2](https://github.com/telostat/typescript-prelude/compare/v0.1.1...v0.1.2) (2022-12-28)


### Bug Fixes

* fix safeDiv implementation ([a6d3ccd](https://github.com/telostat/typescript-prelude/commit/a6d3ccd0dc06b1580b4efe917bbd815ebd140c66))

## [0.1.1](https://github.com/telostat/typescript-prelude/compare/v0.1.0...v0.1.1) (2022-08-03)


### Bug Fixes

* types are broken for SDate and SDateTime ([0447159](https://github.com/telostat/typescript-prelude/commit/044715944c55b772c07e81381b35c9418bf6bf22))

## [0.1.0](https://github.com/telostat/typescript-prelude/compare/v0.0.2...v0.1.0) (2022-08-01)


### Features

* add SDate and SDateTime type aliases ([b413e49](https://github.com/telostat/typescript-prelude/commit/b413e49006ba076e8db5e5785e6c077d6b2ca236))
* add sumDecimals function, revisit decimal module ([be9d5d1](https://github.com/telostat/typescript-prelude/commit/be9d5d14e02761da62ee6db1dc0f247f04d30768))
* improve decimal module ([608b4f0](https://github.com/telostat/typescript-prelude/commit/608b4f0458fb5a5f3cf85fbac85b22ebfdc5762b))
* re-export day.js ([e5f2351](https://github.com/telostat/typescript-prelude/commit/e5f2351d71cf7d5448ef34516b5d03b3524a3a70))
* re-export decimal.js ([00747a5](https://github.com/telostat/typescript-prelude/commit/00747a5b70bdf033055c0ab89e43e4771a740899))
* re-export purify-ts ([ea8eab6](https://github.com/telostat/typescript-prelude/commit/ea8eab60444036153efb6b7b721483cd45d26ade))
* start error module ([5c4370d](https://github.com/telostat/typescript-prelude/commit/5c4370dea468e7a33fd95dea2be82e5579931004))
* start text module ([023b52c](https://github.com/telostat/typescript-prelude/commit/023b52cbf746cec3386eb4865c981bfdb7ba9bf9))

## [0.0.2](https://github.com/telostat/typescript-prelude/compare/v0.0.1...v0.0.2) (2022-07-28)


### Bug Fixes

* npm packaging is broken ([bc27c20](https://github.com/telostat/typescript-prelude/commit/bc27c20ef7c67ad765011183155930093c1238b9)), closes [#21](https://github.com/telostat/typescript-prelude/issues/21)

## 0.0.1 (2022-07-27)


### Features

* init codebase, add newtype module ([579bb30](https://github.com/telostat/typescript-prelude/commit/579bb30c687f902fc3bbf64a35baeb703747e0e8))


### Miscellaneous Chores

* release 0.0.1 ([7868c61](https://github.com/telostat/typescript-prelude/commit/7868c610c203d0f9e0d0bf3c53db932ce2d24256))
