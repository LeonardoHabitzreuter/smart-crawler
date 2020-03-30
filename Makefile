# Use bash sintaxe
SHELL := /bin/bash

run-dev:
	docker container run -d -v $(PWD)/node_modules:/app/node_modules -p 3000:3000 --name smart-crawler-api smart-crawler

run-prod:
	docker container run -d -p 3000:3000 --name smart-crawler-api smart-crawler
