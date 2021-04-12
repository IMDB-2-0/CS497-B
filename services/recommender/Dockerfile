FROM python:3.7-alpine

WORKDIR /app
COPY . .

RUN pip3 install pipenv 
RUN pipenv install --system --deploy

ENV IS_DOCKER_CONTAINER Yes

EXPOSE 5000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--reload", "--port=5000"]