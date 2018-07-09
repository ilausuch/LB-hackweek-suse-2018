FROM ubuntu:latest

RUN \
    apt-get update && \
    apt-get -y install vim git nginx

COPY nginx.conf /etc/nginx/sites-available/default
COPY start.sh /opt/start.sh

RUN chmod a+x /opt/start.sh
CMD /opt/start.sh && bash
