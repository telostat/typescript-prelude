{ ... }:

let
  ## Set the name:
  name = "typescript-prelude";

  ## Repository root:
  root = ../.;

  ## Import sources:
  sources = import ./sources.nix;

  ## Import telosnix:
  telosnix = import sources.telosnix { };

  ## Import nixpkgs:
  pkgs = import telosnix.pkgs-sources.stable { };

  ## Get the devshell:
  devshell = telosnix.tools.devshell {
    name = "${name}-devshell";
    src = ./.;
    quickstart = ./docs/quickstart.md;
    guide = [
      { name = "readme"; title = "Introduction"; path = ../README.md; }
      { name = "devshell"; title = "Developer's Guide"; path = ./docs/quickstart.md; }
    ];
    extensions = { };
  };

  ## Declare dependencies for our shell:
  deps = [
    pkgs.nodejs

    devshell
  ];

  ## Define our shell:
  shell = pkgs.mkShell {
    buildInputs = deps;

    shellHook = ''
      ## Greet:
      devsh welcome
    '';

    DEVSHELL_ROOT = "${toString root}";
  };

in
{
  name = name;
  pkgs = pkgs;
  sources = sources;
  telosnix = telosnix;
  shell = shell;
}
