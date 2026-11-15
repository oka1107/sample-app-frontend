補助金管理システム
補助金の申請状況を一元管理し、申請漏れを防ぐWebアプリケーション
アプリケーション概要
企業ごとの補助金申請情報を管理するWebアプリケーションです。

申請中の補助金名、補助金額、申請期限を一覧で確認でき、管理業務の効率化を目的としています。

開発した背景・理由
中小企業では複数の補助金申請を同時に進めることがあり、Excelや紙で管理すると申請期限の見落としが発生する可能性があります。

そこで、補助金情報を一元管理し、申請状況を簡単に確認できるシステムを開発しました。

また、ReactとSpring Bootを用いたフロントエンド・バックエンド分離構成の学習も目的としています。

アプリケーションURL
本番環境
未公開

ローカル環境
Frontend

http://localhost:5173

Backend

http://localhost:8080

デモ画像
一覧画面
※画面完成後にスクリーンショットを追加予定

詳細画面
※画面完成後にスクリーンショットを追加予定

主な使用技術
フロントエンド
React
JavaScript
Vite
バックエンド
Java
Spring Boot
データベース
H2 Database
その他
Git
GitHub
ER図
+-------------------+
|      client       |
+-------------------+
| id                |
| client_name       |
| grant_name        |
| price             |
| deadline          |
+-------------------+
インフラ構成図
利用者
  ↓
React (Vite)
  ↓ API通信
Spring Boot
  ↓
H2 Database
API一覧
メソッド	URL	説明
GET	/clients	補助金一覧取得
ローカル環境での起動方法
cd sample-app
mvn spring-boot:run
フロントエンド起動
cd subsidy-client
npm install
npm run dev
起動確認
http://localhost:5173
今後の改善予定
補助金登録機能
補助金更新機能
補助金削除機能
検索機能
ページネーション機能
入力バリデーション機能
AWS環境へのデプロイ


