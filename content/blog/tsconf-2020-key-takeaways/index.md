---
title: TSConf 2020 notes
date: "2020-10-12"
description: ""
---

## Keynote

### Typescript + Babel

Latest version of Babel v7.11 has TS v4.0 support and there's work on going to add TS v4.1 support already.

### Typescript + ESLint

TSLint was retired and an effort was done to converge on a single linter, ESLint that the ECMA script community already uses.

### Typescript + Deno

Deno the evolution of Node supports Typescript.

### Typescript + (Angular, React, Vue, Ember, Svelte)

Many frameworks supports Typescript.

### Typescript Playground

[Typescript Playground](https://www.typescriptlang.org/play).

### DefinitelyTyped

[DefinitelyTyped Github](https://github.com/DefinitelyTyped/DefinitelyTyped).

### What's new

#### Private fields

[Private fields](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-8.html#ecmascript-private-fields) are a pretty heavy duty transformation when the target code is `es2015`. Choosing `esnext` ends up being less code after TS &#8594; JS transformation.

#### Logical assignment operators

[Short-Circuiting Assignment Operators](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#short-circuiting-assignment-operators).

```typescript {numberLines:true}
function f1(a: boolean, b: boolean) {
  const x1 = a || b // const x1 = a ? a : b;
  const x2 = a && b // const x2 = a ? b :a;
  const x3 = a ?? b // const x3 = a !== undefined && a !== null ? a : b;
}

function f2(a: boolean, b: boolean) {
  a ||= b // a || (a = b) -- Assign if a is falsy
  a &&= b // a && (a = b) -- Assign if a is truthy
  a ??= b // a ?? (a = b) -- Assign if a is nullish
}
```

#### Variadic tuple types

[Variadic tuple types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types) closes [TS Github issue #5453](https://github.com/microsoft/TypeScript/issues/5453).

- [Folding regions](https://code.visualstudio.com/updates/v1_17#_folding-regions).

```typescript {numberLines:true}
//#region
// { code... }
//#endregion
```

- ###### [`const` assertions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions)

- [Conditional Types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#conditional-types)
- [Type inference in conditional types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types)
- [Unknown Type](https://www.typescriptlang.org/docs/handbook/basic-types.html#unknown)
  - [New unknown top type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-0.html#new-unknown-top-type)
  - [`unknown` on catch Clause Bindings](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#unknown-on-catch-clause-bindings)
- [Labeled Tuple Elements](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#labeled-tuple-elements)

### New tooling features

- [Speed Improvements](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-9.html#speed-improvements)
  - [Speed Improvements in build mode with `--noEmitOnError`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#speed-improvements-in-build-mode-with---noemitonerror)
- [Call hierarchy viewer preview](https://code.visualstudio.com/updates/v1_33#_call-hierarchy) && [VSCode v3.8 Call hierarchy support for JavaScript and TypeScript](https://github.com/microsoft/vscode-docs/blob/vnext/release-notes/v1_43.md#call-hierarchy-support-for-javascript-and-typescript)
- [Partial Semantic Mode at Startup](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#partial-semantic-mode-at-startup)
- [`/** @deprecated */` Support](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#-deprecated--support)

### Typescript v4.1 (November)

[Announcement](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/)

- Recursive conditional types
  - Awaiting promises
  - Flattening arrays
  - Repeating tuples
  - Reversing tuples
- Template literal types. [TS Github issue #12754](https://github.com/microsoft/TypeScript/issues/12754)
- Intrinsic string types [TS Github issue #40580](https://github.com/microsoft/TypeScript/pull/40580)
- With `--noUncheckedIndexedAccess` you are required to prove that an Array index isn't `undefined`. [Context](https://devblogs.microsoft.com/typescript/announcing-typescript-4-1-beta/#no-unchecked-indexed-access)

### Final recommendations

- Enable `--strict` mode. [tsc CLI Options](https://www.typescriptlang.org/docs/handbook/compiler-options.html)

---

## Type System Game Engines

[@JoshuaKGoldberg](https://twitter.com/JoshuaKGoldberg)<br>
[joshuakgoldberg.com](https://www.joshuakgoldberg.com/)

### Final recommendations

> Everything is complex until you get it.

- Visit [Type challenges](https://github.com/type-challenges/type-challenges). A great way to warm up to types.
- Visit [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped). A solid investment of your time.

---

## Pushing the Compiler to the limit

[Prisma](https://www.prisma.io/) &#8594; Modern Database Access for TypeScript & Node.js

### Summary

- Conditional & mapped types togethers are very powerful.

---

## Adding Augmented Reality to Your Typescript App

- Visit [Babylon.js](https://www.babylonjs.com/).

---

## Typescript + Github Codespaces

- Visit [Codespaces](https://github.com/features/codespaces).

---

## Using Typescript to Define Service APIs

- RPR (Remote Procedure Call) and IDL (Interface Description Language)?
- Visit [protobuf.js](https://github.com/protobufjs/protobuf.js)

### Final recommendations

- Learning discriminating TS unions is great!

---

## Strongly Typed Multiplayer Game Programming

[Presentation code](https://github.com/elcuy/cavemen.bas.ts)

### Final recommendations

- Wrap stuff. Don't use third-party JS libraries directly in your code since that could hurt maintainability (imagine that you would have to replace the library for some good reason). Wrap the usage of your libraries if they don't have TS types.
- Use generics in function types.
- Use `extends` to model your hierarchy.
- Use type guards.
- Share types between backend / frontend.

---

## TalkScript Episode: Marcin Lewandowski

- Visit [RavenDB]

---

## LearnShop: Deploying Web Apps to the Cloud with TypeScript

- Visit [tsconf-learn](https://aka.ms/tsconf-learn)

## Workshop: Typescript + React = 🚀

- Visit [benmvp.com](https://www.benmvp.com/)
- [Slides](https://slides.benmvp.com/2020/tsconf/react.html#/)

## Workshop: Tightening the Full-Stack Development Loop with Nexus and Prisma

- Visit [graphql-nexus](https://github.com/graphql-nexus/schema)
- Visit [prisma](https://github.com/prisma/prisma)
- Visit [chenkie/prisma-nexus-products](https://github.com/chenkie/prisma-nexus-products)

## Workshop: Getting into the Cloud with TypeScript

#### Resources

- 🤓[kolomied/awesome-cdk](https://github.com/kolomied/awesome-cdk)

#### Get started

- [cdkworkshop.com](https://cdkworkshop.com)
- [aws.amazon.com/cdk](https://aws.amazon.com/cdk)
- [aws.amazon.com/vscode](https://aws.amazon.com/vscode)

#### Engage

- [gitter.im/awslabs/aws-cdk](https://gitter.im/awslabs/aws-cdk)
- [github.com/aws/aws-cdk](github.com/aws/aws-cdk)

## Workshop: Building Apps with Angular and Firebase

- [mgechev/kanban-fire/tree/improving-optimistic-updates](https://github.com/mgechev/kanban-fire/tree/improving-optimistic-updates)
- [codelabs.developers.google.com](https://codelabs.developers.google.com/)

## LearnShop: Converting Node Express to Serverless with Azure Functions with TypeScript

- [aka.ms/ls-express-serverless](https://aka.ms/ls-express-serverless)

<!-- ```typescript {numberLines:true}

``` -->
