docker network create tubes2-net
docker network connect tubes2-net tubes2-rest-db
docker network connect tubes2-net tubes2-rest-ws
docker network connect tubes2-net tubes2-soap-db
docker network connect tubes2-net tubes2-soap-ws