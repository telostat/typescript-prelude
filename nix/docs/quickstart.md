# Typescript Prelude Development Shell

This project provides a development shell powered by Nix, in particular
[telos.nix][telosnix]. In this shell, you can develop, test and access
developer's guide in a reproduicable environment:

```sh
nix-shell
```

Quick commands:

- Build the library and documentation:

    ```sh
    npm run build
    ```

- Build as you develop:

    ```sh
    npm run dev
    ```

- Run tests:

    ```sh
    npm run test
    ```

- Build the documentation:

    ```sh
    npm run make:docs
    ```

- Deploy documentation:

    ```sh
    npm run deploy:docs
    ```

[telosnix]: https://github.com/telostat/telos.nix
