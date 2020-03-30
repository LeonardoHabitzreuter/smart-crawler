# Use bash sintaxe
SHELL := /bin/bash

run-prod:
	docker container run -p 3000:3000 --name smart-crawler-api smart-crawler