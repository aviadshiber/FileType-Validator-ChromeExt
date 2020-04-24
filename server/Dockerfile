FROM python:3.8.2-alpine3.11
RUN apk --update add bash nano
ENV STATIC_URL /static
ENV STATIC_PATH /var/www/app/static
COPY ./requirements.txt /var/www/requirements.txt
RUN pip install -r /var/www/requirements.txt
COPY ./configuration.yaml ./configuration.yaml
COPY ./app.py ./app.py
EXPOSE 80
CMD ["python","app.py"]