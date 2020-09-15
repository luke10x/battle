up:
	docker-compose up -d --force-recreate battle

into:
	docker-compose exec battle bash

logs:
	docker-compose logs -f

down:
	docker-compose down

install:
	docker-compose run --rm battle "npm install"

bash:
	docker-compose run battle bash

unrootify:
	sudo chown -R $$(id -u):$$(id -g) .
