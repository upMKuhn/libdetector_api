# What is it
Simple webservice that detects javascript libraries within a script.

# How to Run it locally  

Please install curl, docker-compose and docker!  

| CMD                 | detail                                          |
| ------------------- | ----------------------------------------------- |
| `make up`           | set up docker-compose env                       |
| `make tail`         | follow docker logs                              |
| `make down`         | stop env                                        |
| `make send-tick`    | send example message from sample_br_metric.json |
| `make send-request` | Send example request                            |
| `make k8s-init`     | Init K8s config maps ect                        |
| `make deploy`       | Deploy to K8s                                   |

# API

- Post the script and know what libraries it contains ;) `http://localhost:8001/`


# Deploy 

Replace content of `.env.dist`, rename to `.env` and source it....  
Simply execute `make k8s-init deploy` if this is the first time.
