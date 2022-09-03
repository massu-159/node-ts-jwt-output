# node-ts-jwt-output

アウトプットとして、Node.js を使った認証機能を実装。

[JWT](https://jwt.io/)を使って、JSON形式のtoken作成。

[Postman](https://www.postman.com/)を使って、API動作テスト。


url：
https://github.com/massu-159/node-ts-jwt-output

## 目次

1. 環境構築
2. アプリケーションの仕様

## 1. 環境構築

### 1-1. ライブラリ インストール

```
npm install

または

yarn
```

### 1-2. アプリケーション実行

```
npm run dev

または

yarn dev
```

## 2. アプリケーションの仕様

### 2-1. 仕様

- 認証機能
  - ユーザー一覧表示
  - ユーザー登録機能
  - ユーザーログイン機能
- 記事
  - 未ログイン状態でpublic記事表示
  - ログイン状態でprivate記事表示

### 2-2. 構成技術

- express : 4.18.2
- nodemon : 2.0.20
- dotenv : 16.0.3
- ts-node : 10.9.1
- bcrypt : 5.1.0
- express-validator : 6.14.2
- jsonwebtoken : 8.5.1
