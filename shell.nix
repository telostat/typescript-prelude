with import (fetchTarball https://github.com/NixOS/nixpkgs/archive/22.05.tar.gz) {};

stdenv.mkDerivation {
  name = "typescript-prelude";

  buildInputs = with pkgs; [
    git
    nodejs-16_x
    yarn

    figlet
    lolcat
  ];

  shellHook = ''
    ## Greet:
    figlet -w 999 -f standard "TYPESCRIPT PRELUDE DEV SHELL" | lolcat -S 179
  '';
}
