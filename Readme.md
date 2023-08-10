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

[こちら](https://odekakekun.chopprin.link/)からアクセスができます

# ログインテストユーザー
以下の情報でテストユーザーを作成しています
- Email：testuser@gmail.com
- パスワード：testpass

# 個人的に頑張った点
- CloudFormationで全てのAWS環境を立ち上げ
  - CI部分以外は、コンソールは1つも触らずに環境を構築しました
  - FrontとBackendのDockerコンテナを分けてService Discoveryで通信を実現しています
- Reactの導入（業務経験がなかった為独学で進めました）　

# 作業途中の点
- FrontのTypescript化
- Github ActionsからAWSのECRへDeployするパイプラインの構築
- ChatGPTのプロンプトの調整

# 使用技術

## ① Infra

ベース技術 ：**Github-Action・AWS・Docker**
![image](https://github.com/TakehikoEsaka/odekakekun/assets/28090246/e748f6db-7bcb-4a95-a48d-a4dfb7a3c731)

[補足]</br>
🚶‍♂️GitHub-Action：ビルド/テストの実施 </br>
🚶‍♂️Cloudformation : ECR/VPC/ECS/RDS などアプリ立ち上げに全て必要なものは IaaS 化して管理 </br>
🚶‍♂️ECS：Frontend と BackEnd で別タスク・別サービスに分けて PrivateSubnet 内で起動。ECRにImageがPUSHされると自動的に新イメージでデプロイが走るCD環境も構築 </br>
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
