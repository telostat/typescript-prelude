with import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/24.05.tar.gz") { };

stdenv.mkDerivation {
  name = "decaf-client-javascript";

  buildInputs = with pkgs; [
    nodejs_20

    figlet
    lolcat
  ];

  shellHook = ''
    ## Greet:
    figlet -w 999 -f standard "typescript prelude dev shell" | lolcat -S 179
    echo "Welcome to the TypeScript prelude development shell!"
    echo "Commands:"
    echo "- npm install"
    echo "- npm run build"
    echo "- npm run test"
  '';
}
