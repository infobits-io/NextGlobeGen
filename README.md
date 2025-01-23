<h1>
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="docs/static/img/logo.dark.svg">
    <source media="(prefers-color-scheme: dark)" srcset="docs/static/img/logo.svg">
    <img alt="next-intl" src="docs/static/img/logo.svg" width="32">
  </picture>
  NextGlobeGen
</h1>

<a href="https://www.npmjs.com/package/next-globe-gen"><img alt="NPM version" src="https://img.shields.io/npm/v/next-globe-gen?style=for-the-badge&color=%23CC3534&logo=npm&logoColor=%23CC3534&labelColor=%23eee"/></a>
<img alt="Next.js App Router Support" src="https://img.shields.io/badge/App%20Router-%23000000?style=for-the-badge&logo=nextdotjs&logoColor=%23000000&label=Next.js&labelColor=%23eee"/>
<img alt="TypeScript Support" src="https://img.shields.io/badge/%20Type--safe-%233178C6?style=for-the-badge&logo=typescript&label=TypeScript&labelColor=%23eee"/>

NextGlobeGen is a TypeScript package designed to streamline the process of adding internationalization (i18n) to your Next.js application. It is specifically tailored for projects using the Next.js App Router. By leveraging generative programming techniques, NextGlobeGen automates the creation of locale-based routes, enabling a seamless developer experience for the developers.

Whether you're building a blog, an e-commerce platform, or an enterprise application, NextGlobeGen is your go-to tool for making your Next.js app globally available.

[Check out the Docs](https://jon1vk.github.io/NextGlobeGen/)

## Key Features

- **Generative Locale Routes**: Includes plugin that generates routes on the fly for each supported language.
- **Middleware Integration**: Provides pre-configured middleware for locale detection and redirection.
- **Translation Logic**: Supports [ICU](https://unicode-org.github.io/icu/userguide/format_parse/messages/) formatted interpolation patterns in the translations.
- **Developer-Friendly**: Includes a locale-aware API that works interchangeably in server and client components.

## How It Works

NextGlobeGen uses the power of generative programming to create the localized routes. It:

- Analyzes your app routing structure.
- Generates localized routes based on the analysis.
- Supports TypeScript by generating the required types.
- Provides API that is automagically aware of the current locale.
