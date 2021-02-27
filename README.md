# Aplus Client

Hi there, seems like you stumbled upon our Github repository! This is the repository that stores the client for Alpus.

## Rationale

The build process for Aplus client is intentionally minimalist, allowing for extreme predictability and robustness:

- [Windicss](https://windicss.netlify.app/) for preprocessing
- [Rollup](https://rollupjs.org/guide/en/) for JavaScript bundling

It also uses [Lucia](https://lucia.js.org) for logic and [Tailwind](https://tailwindcss.com/) for styling. These technologies allow a very consistent design process during development. It is separate from the Rust server, which handles persistent storage and authentication.

## Usage

```bash
# Build CSS & JavaScript for production
yarn build
```

## License

[MIT](LICENSE)
