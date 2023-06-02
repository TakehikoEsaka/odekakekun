# 指定タスクの情報を見る
aws ecs describe-tasks --cluster odekakekun-cluster --tasks f6e24ebee4804ee9b1b173d1b6962081

# 指定サービスのecs-execの設定についてみる
aws ecs describe-services --cluster odekakekun-cluster --services odekakekun-frontend-service-3 --query 'services[0].enableExecuteCommand'

# 指定タスクのecs-execの設定についてみる
aws ecs describe-tasks --cluster odekakekun-cluster --tasks 192720e1d8b84bb7b893e00af396c3f7 --query 'tasks[0].enableExecuteCommand'

# ecs-execできるように設定品をしてforce update
aws ecs update-service --cluster odekakekun-cluster --service odekakekun-frontend-service-3 --task-definition odekakekun-frontend-task-3:1 --desired-count 1 --force-new-deployment --enable-execute-command


# 指定タスクの中に入る
aws ecs execute-command --cluster odekakekun-cluster --task 192720e1d8b84bb7b893e00af396c3f7 --container odekakekun-frontend-container --interactive --command "/bin/sh"


