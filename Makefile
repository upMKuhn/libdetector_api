WEB_PORT=8002
up:
	docker-compose down
	docker-compose up --build -d
	@echo -e "\n\n\n\n\n\n\n\n\n\n"
	@echo -e "Metrics Relay should be up by now ;) \n"
	@echo -e "Push metrics via websocket chrome plugin to ws://localhost:${WEB_PORT}/metrics or curl :P"
	@echo -e "test data is ./resources/sample_br_metric.json"
	@echo "http://localhost:${WEB_PORT}/BR_Metrics/show-metrics"

down:
	docker-compose down

tail:
	docker-compose logs -f

send-request:
	cat ./ressources/jquery.min.js | curl -H "Content-Type: text/plain" -X POST -d @- http://localhost:${WEB_PORT}

k8s-init:
	kubectl apply -f ./deployment/cert.yml -f ./deployment/ingress.yml -n ${NAMESPACE}
	envsubst < ./deployment/secret.yml | kubectl apply -f - -n ${NAMESPACE}

deploy: 
	envsubst < ./deployment/deployment.yml   | kubectl apply -f - -n ${NAMESPACE}

