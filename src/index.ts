import type { CAC } from "cac";
import { ACTIVATION, execCommand, loggerInfo } from "code-genius";

const FORMAT_GLOB = ["./src"];

interface FormatOptions {
  files: Array<string>;
}

const prettierFormat = async (paths: string[]) => {
  if (ACTIVATION) {
    loggerInfo(`prettierFormat 参数信息: \n${JSON.stringify(paths)}`);
  }

  await execCommand("npx", ["prettier", "--write", ...paths], {
    stdio: "inherit",
  });
};

const prettierFormatInstaller = (config: FormatOptions) => {
  const { files } = config;
  return {
    name: "prettierFormatInstaller",
    setup: (cli: CAC) => {
      cli
        .command("format", "运行 prettier 格式化代码风格")
        .option("-p, --pattern <pattern>", "设置匹配规则")
        .action(async (options) => {
          let paths = files || FORMAT_GLOB;
          const { pattern } = options;
          if (pattern) {
            paths = typeof pattern === "string" ? [pattern] : pattern;
          }
          await prettierFormat(paths);
        });
    },
  };
};

export { FORMAT_GLOB, FormatOptions, prettierFormat, prettierFormatInstaller };
