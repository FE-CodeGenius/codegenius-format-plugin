import { performance } from "node:perf_hooks";

import type { CAC } from "cac";
import { ACTIVATION, execCommand, loggerInfo } from "code-genius";

import { formatGlob, FormatOptions } from "./common";

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
          let paths = files || formatGlob;
          const { pattern } = options;
          if (pattern) {
            paths = typeof pattern === "string" ? [pattern] : pattern;
          }
          const start = performance.now();
          await prettierFormat(paths);
          const getTime = () => `${(performance.now() - start).toFixed(2)}ms`;
          loggerInfo(`😁 format 命令执行结束, 共用时: ${getTime()}`);
        });
    },
  };
};

export { prettierFormat, prettierFormatInstaller };
