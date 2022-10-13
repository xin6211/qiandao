FROM ubuntu:18.04
WORKDIR /qiandao
COPY  ./go1.18.6.linux-amd64.tar.gz ./go1.18.6.linux-amd64.tar.gz
COPY ./html /var/www/html/
COPY ./server /qiandao/server
COPY ./default /etc/nginx/sites-enabled/default
RUN tar zxvf go1.18.6.linux-amd64.tar.gz
RUN apt update
RUN apt install -y nginx curl
WORKDIR /qiandao/server
CMD ["/bin/bash", "./run.sh"]
