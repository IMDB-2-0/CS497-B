sudo kubectl apply -f auth-service.yaml -f dashboard-service.yaml -f postgresdb-service.yaml -f recommender-service.yaml -f database-api-service.yaml -f auth-claim0-persistentvolumeclaim.yaml -f postgresdb-claim0-persistentvolumeclaim.yaml -f postgresdb-claim1-persistentvolumeclaim.yaml -f recommender-claim0-persistentvolumeclaim.yaml -f database-api-claim0-persistentvolumeclaim.yaml