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
    yarn build
    ```

- Build as you develop:

    ```sh
    yarn dev
    ```

- Build the documentation:

    ```sh
    yarn make:docs
    ```

- Deploy documentation:

    ```sh
    yarn deploy:docs
    ```

[telosnix]: https://github.com/telostat/telos.nix
