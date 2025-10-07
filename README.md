# Torte

## ディレクトリ構成
- frontend/ : Next.jsによるフロントエンド
- backend/ : NestJSによるバックエンド

## ブランチ運用
- main: 本番
- develop: ステージング
- feature/XXX: 機能開発用

## 開発・テスト・CI/CD
### 開発フロー
1. 最新developからfeatureブランチ作成
2. コーディング＆コミット（huskyで静的解析）
3. リモートにpush

### CI/CDパイプライン
- feature/XXX → develop へのPRで
  - ESLint, 型チェック, ユニット/結合テスト, E2Eテスト
  - Vercelでステージング環境への自動デプロイ

- develop → main へのPRで
  - 全自動テスト＋本番環境デプロイ

### テスト
- フロント: React Testing Library + Vitest
- E2E: Playwright
- バックエンド: Jest (NestJS)

## 技術調査項目
- TypeScript型定義
- 環境変数管理（.env, VercelのEnvironment Variables）
- ESLint設定
- APIモック（MSWなど）
