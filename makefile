all: download-ratings download-movielens

download-ratings:
	mkdir -p services/recommender/data
	sudo chmod +x download-ratings.sh
	@echo "Downloading ratings file. Please wait..."
	./download-ratings.sh

download-movielens:
	mkdir -p services/database/data
	@echo "Downloading movielens data. Please wait..."
	curl -k https://files.grouplens.org/datasets/movielens/ml-25m.zip -o ml-25m.zip
	unzip ml-25m.zip -d services/database/data
	rm ml-25m.zip