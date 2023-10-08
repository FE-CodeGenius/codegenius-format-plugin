# @codegenius/format-plugin

运行 `prettier` 格式化代码风格, 仅支持命令模式;

使用场景: 用于替代 `prettier --write`, 功能雷同, 可以使用 **API** 模式来运行命令.

### 命令模式

```bash
# 格式化 src 文件夹下的文件
codeg format
```

```bash
# 格式化 src 和 components 文件夹下的文件
codeg format -p ./src -p ./components
```

| 选项                      | 描述         |
| ------------------------- | ------------ |
| -p, --pattern \<pattern\> | 设置匹配规则 |

PS: 依赖 `prettier` CLI 模式, 同时对项目配置的 `.prettierignore` 和 `.prettierrc.json` 生效.

### 配置文件

```typescript
# 覆盖默认的 `format` 配置
import { defineConfig } from "code-genius";

export default defineConfig({
  commands: {
    format: {
      paths: ["./src", "./scripts"],
    },
  },
});
```
