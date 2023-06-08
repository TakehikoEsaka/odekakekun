# 指定タスクの情報を見る
aws ecs describe-tasks --cluster odekakekun-cluster --tasks fbfef898bcb44a74bf229930aff5e226

# 指定サービスのecs-execの設定についてみる
aws ecs describe-services --cluster odekakekun-cluster --services odekakekun-backend-service --query 'services[0].enableExecuteCommand'

# 指定タスクのecs-execの設定についてみる
aws ecs describe-tasks --cluster odekakekun-cluster --tasks fbfef898bcb44a74bf229930aff5e226 --query 'tasks[0].enableExecuteCommand'

# ecs-execできるように設定品をしてforce update
aws ecs update-service --cluster odekakekun-cluster --service odekakekun-frontend-service-3 --task-definition odekakekun-backend-task:1 --desired-count 1 --force-new-deployment --enable-execute-command

# 指定タスクの中に入る
aws ecs execute-command --cluster odekakekun-cluster --task fbfef898bcb44a74bf229930aff5e226 --container odekakekun-frontend-container --interactive --command "/bin/sh"
aws ecs execute-command --cluster odekakekun-cluster --task fbfef898bcb44a74bf229930aff5e226 --container odekakekun-backend-container --interactive --command "/bin/sh"

