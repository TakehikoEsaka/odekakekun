<p align="center">
  こんな感じで画像をいれたい
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://huggingface.co/datasets/huggingface/documentation-images/raw/main/transformers-logo-dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="https://huggingface.co/datasets/huggingface/documentation-images/raw/main/transformers-logo-light.svg">
    <img alt="Hugging Face Transformers Library" src="https://huggingface.co/datasets/huggingface/documentation-images/raw/main/transformers-logo-light.svg" width="352" height="59" style="max-width: 100%;">
  </picture>
  <br/>
  <br/>
</p>

# Odekakekunとは
🚶‍♂️Odekakekun はChat-GPT におでかけの最適な場所を教えてもらえるサービス <br />
🚶‍♂️今いる場所・指定した交通機関・指定した時間以内に行けるおすすめの場所をChatGPTに質問可能<br />
🚶‍♂️ユーザー作成・ログイン機能有り。ログインすれば過去に提案を受けた履歴を保存する事が可能<br />

# Demo
- TODO ここにでも動画を載せる
- TODO ここにアクセス用のURL・ユーザー名・パスワードを記載しておく

# 使用技術
## ① Infra

ベース技術 ：**Github-Action・AWS・Docker**

TODO ：ここにネットワーク構成図

[補足]</br>
🚶‍♂️GitHub-Action：ビルド/テスト/ECR への ImagePUSH を実施 </br>
🚶‍♂️Cloudformation : ECR/VPC/ECS/RDS などアプリ立ち上げに全て必要なものは IaaS 化して管理 </br>
🚶‍♂️ECS：Frontend と BackEnd で別タスク・別サービスに分けてPrivateSubnet内で起動 </br>
🚶‍♂️RDS：ユーザー情報と過去ChatGPTの提案内容を記録する為にPostgresエンジンを使用 </br>

## ② FrontEnd
ベース技術：**React・Typescript**

[補足]</br>
🚶‍♂️React-Router：ページ遷移の為に導入</br>
🚶‍♂️React-Testing-Library：テスト実施の為に導入</br>
🚶‍♂️Recoil：Global な State 管理のために導入</br>
🚶‍♂️Chakura-UI：UI コンポーネント利用の為に導入</br>

## ③ BackEnd

ベース技術：**FastAPI・SQLAlchemy**

[補足]</br>
🚶‍♂️Pytest：テスト実施の為に導入</br>

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
