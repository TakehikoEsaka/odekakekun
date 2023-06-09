# Odekakekun とは

Odekakekun とは今いる場所から、指定した交通機関・時間以内でいけるお勧めの場所を Chat-GPT に教えてもらえるサービス

# 基本機能

## ユーザー作成・ログイン機能

- ユーザー作成は誰でも可能
- ユーザー作成は後述するように過去 ChatGPT から提案を受けた場所を取得できるというメリットがある

## ChatGPT を使った予測

- ユーザーが指定した場所・時間・交通手段から ChatGPT におすすめの場所を聞く事が可能

## 過去に提案を受けた場所を取得

- ログインしている場合は過去に提案を受けた場所を取得する事が出来る

# 使用技術

使用技術を Infra/BackEnd/FrontEnd に分けて以下記載

## Infra

ベース技術 ：Github-Action・AWS・Docker

- GitHub-Action：ビルド/テスト/ECR への ImagePUSH を実施
- Cloudformation : ECR/VPC/ECS/RDS などアプリ立ち上げに全て必要なものは IaaS 化して管理
- ECS：Frontend と BackEnd で別タスク・別サービスに分けて起動

（参考）ネットワーク構成図は以下の通り

- ALB は PublicSubnet・ECS の各サービスは PrivateSubnet に配置
- FrontEnd-BackEnd コンテナ間通信は ECS の ServiceDiscovery の機能を使って実現

## FrontEnd

ベース技術：React/Typescript

- React-Router：ページ遷移の為に導入
- React-Testing-Library：テスト実施の為に導入
- Recoil：Global な State 管理のために導入
- Chakura-UI：UI コンポーネント利用の為に導入

## BackEnd

ベース技術：FastAPI

- SQLAlchemy：local では SQLite・AWS 上では Postgres として接続して利用
- Pytest：テスト実施のために導入

# TODO

- OpenAPI の key を SSM に登録してもってくるようにする
- CI：Github Actions から ECR への Image PUSH まわり
- PostgresDB とのデータやりとり確認
- サービスディスカバリを使ったコンテナ間通信

- Python の DRY 原則への対応
- テストデータとしてメールと pass を記載して出しておく
- Readme への技術まとめ
  - アプリケーションの概要
    - vpc 構成の記述
    - 料金がかかるので endpoint を使わないプランの構成を用意している事を記述
  - アプリケーションの機能一覧
  - アプリケーションないで使用している技術一覧
- TOPVIEW のリクエストを正しいものにする（ボタンを既存の文言にするとかもあり）
- CD：CodePipeline をできたら入れる（https://qiita.com/YutaSaito1991/items/1a001f0e19e9de033612）
