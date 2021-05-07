#!/bin/bash
fileid="1ZuEv1fJrsnuk64iauUSPqtChaViwhS8l"
filename="binary_ratings.csv"
curl -c ./cookie -s -L "https://drive.google.com/uc?export=download&id=${fileid}" > /dev/null
curl -Lb ./cookie "https://drive.google.com/uc?export=download&confirm=`awk '/download/ {print $NF}' ./cookie`&id=${fileid}" -o ${filename}
rm cookie
mv binary_ratings.csv services/recommender/data