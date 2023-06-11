<p align="center">
  <picture>
   <img alt="Hugging Face Transformers Library" src="https://github.com/TakehikoEsaka/odekakekun/assets/28090246/db7a5fac-76e9-45b6-ab70-ee1c4b977b4d" width="570" height="200" style="max-width: 100%;">
  </picture>
  <br/>
  <br/>
</p>

# Odekakekun とは

🚶‍♂️Odekakekun は Chat-GPT におでかけの最適な場所を教えてもらえるサービス <br />
🚶‍♂️ 今いる場所・指定した交通機関・指定した時間以内に行けるおすすめの場所を ChatGPT に質問可能<br />
🚶‍♂️ ユーザー作成・ログイン機能有り。ログインすれば過去に提案を受けた履歴を保存する事が可能<br />

# Demo

- TODO ここにでも動画を載せる

テストユーザーを作成しています

- Email：testuser@gmail.com
- パスワード：testpass

# 使用技術

## ① Infra

ベース技術 ：**Github-Action・AWS・Docker**

TODO ：ここにネットワーク構成図

[補足]</br>
🚶‍♂️GitHub-Action：ビルド/テスト/ECR への ImagePUSH を実施 </br>
🚶‍♂️Cloudformation : ECR/VPC/ECS/RDS などアプリ立ち上げに全て必要なものは IaaS 化して管理 </br>
🚶‍♂️ECS：Frontend と BackEnd で別タスク・別サービスに分けて PrivateSubnet 内で起動 </br>
🚶‍♂️RDS：ユーザー情報と過去 ChatGPT の提案内容を記録する為に Postgres エンジンを使用 </br>

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
- PostgresDB とのデータやりとり確認
- サービスディスカバリを使ったコンテナ間通信
- Pytest が通るようにする
- SSL 対応
- CI：Github Actions から ECR への Image PUSH まわり

- Python の DRY 原則への対応
- CD：CodePipeline をできたら入れる（https://qiita.com/YutaSaito1991/items/1a001f0e19e9de033612）
- TS 系を整える
