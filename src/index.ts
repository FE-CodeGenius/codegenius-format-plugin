import { performance } from "node:perf_hooks";

import type { CAC } from "cac";
import {
  ACTIVATION,
  CodeGeniusOptions,
  execCommand,
  formatGlob,
  loggerInfo,
} from "code-genius";

const mergeConfig = async (config: CodeGeniusOptions) => {
  const commands = config && config?.commands;
  if (commands && commands.format) {
    const { paths } = commands.format;
    return {
      paths: paths && paths.length > 0 ? paths : formatGlob,
    };
  }
  return {
    paths: formatGlob,
  };
};

const prettierFormat = async (paths: string[]) => {
  if (ACTIVATION) {
    loggerInfo(`prettierFormat 参数信息: \n${JSON.stringify(paths)}`);
  }

  await execCommand("npx", ["prettier", "--write", ...paths], {
    stdio: "inherit",
  });
};

const prettierFormatInstaller = (config: CodeGeniusOptions) => {
  return {
    name: "prettierFormatInstaller",
    setup: (cli: CAC) => {
      cli
        .command("format", "运行 prettier 格式化代码风格")
        .option("-p, --pattern <pattern>", "设置匹配规则")
        .action(async (options) => {
          const { paths } = await mergeConfig(config);
          const { pattern } = options;
          const start = performance.now();
          if (pattern) {
            await prettierFormat(
              typeof pattern === "string" ? [pattern] : pattern,
            );
          } else {
            await prettierFormat(paths);
          }
          const getTime = () => `${(performance.now() - start).toFixed(2)}ms`;
          loggerInfo(`😁 format 命令执行结束, 共用时: ${getTime()}`);
        });
    },
  };
};

export { prettierFormat, prettierFormatInstaller };
