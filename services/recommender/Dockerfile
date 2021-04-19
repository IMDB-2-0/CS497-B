# FROM python:3.7-alpine (Issue with pandas and alpine)
FROM python:3.7-stretch

WORKDIR /app
COPY . .

RUN apt-get update
RUN apt-get install default-jdk -y

RUN pip3 install pypandoc
RUN pip3 install pipenv 
RUN pipenv install --system --deploy

ENV IS_DOCKER_CONTAINER Yes

EXPOSE 5000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--reload", "--port=5000"]