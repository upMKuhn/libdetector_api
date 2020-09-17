WEB_PORT=8001
up:
	docker-compose down
	docker-compose up --build -d
	@echo -e "\n\n\n\n\n\n\n\n\n\n"
	@echo -e "Lib Detector should be up by now ;) \n"
	@echo -e "execute "make send-request" to test the jquery detection "
	@echo "http://localhost:${WEB_PORT}/"

down:
	docker-compose down

tail:
	docker-compose logs -f

send-request:
	cat ./ressources/jquery.min.js | curl -H "Content-Type: text/plain" -X POST -d @- http://localhost:${WEB_PORT}

send-bad-request:
	cat ./ressources/bad-jquery.min.js | curl -H "Content-Type: text/plain" -X POST -d @- http://localhost:${WEB_PORT}


k8s-init:
	kubectl apply -f ./deployment/cert.yml -f ./deployment/ingress.yml -n ${NAMESPACE}
	envsubst < ./deployment/secret.yml | kubectl apply -f - -n ${NAMESPACE}

deploy: 
	envsubst < ./deployment/deployment.yml   | kubectl apply -f - -n ${NAMESPACE}

