import { defineConfig } from "code-genius";
import { gitInitSimpleHooksInstaller } from "@codegenius/hooks-plugin";
import { gitCommitVerifyInstaller } from "@codegenius/verify-plugin";

export default defineConfig({
  commands: {},
  plugins: [
    gitInitSimpleHooksInstaller(),
    gitCommitVerifyInstaller(),
  ],
});
