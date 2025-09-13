import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "../backend/openapi.json", // OpenAPI のスキーマファイルのパス
    },
    output: {
      target: "./api", // 生成するファイル群のパス
      schemas: "./api/schemas", // スキーマファイルのパス
      client: "react-query", // 生成するクライアントの種類
      httpClient: "fetch", // 生成する HTTP クライアントの種類
      mode: "tags-split", // 生成するファイルを分割するか
      clean: true, // 生成するファイルをクリーンアップするか,
      // orval で生成する mock の設定
      mock: {
        type: "msw",
        useExamples: true, // openapi.json の example を mock データとして使用するか(無い場合は faker.js で mock データが生成される)
      },
      override: {
        mutator: {
          path: "./src/lib/customFetch.ts", // カスタムfetchのパス
          name: "customFetch",
        },
        fetch: {
          includeHttpResponseReturnType: false, // false: fetch の返却値をResponseのデータの型にする
        },
        mock: {
          required: true, // 自動生成で返却される mock データを必須にする
        },
      },
    },
    hooks: {
      // ここは、プロジェクトで使用しているフォーマッターに合わせて設定してください
      afterAllFilesWrite: 'prettier --write', // 例: prettier 生成したファイルを整形
    },
  },
});