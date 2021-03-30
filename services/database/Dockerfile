FROM python:3.7-alpine

WORKDIR /app
COPY . .

RUN pip3 install pipenv 

# TODO: Better way? (Postgres not installed in container)
RUN apk update
RUN apk add postgresql-dev gcc python3-dev musl-dev
RUN pipenv install --system --deploy

COPY . .

EXPOSE 5005

CMD ["flask", "run", "--host", "0.0.0.0", "-p", "5005"]