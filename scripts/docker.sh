export ENV=${1:dev}

if [ "$@" = "prd" ]
  then
    ENV=prd
fi

docker build . --build-arg ENV=${ENV} -t koa-react-boilerplate
docker run -it -e ENV=${ENV} -p 8080:8080 koa-react-boilerplate
