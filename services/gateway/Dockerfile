FROM python:3.7-alpine

WORKDIR /app
COPY . .

RUN pip3 install pipenv 
RUN pipenv install --system --deploy

EXPOSE 5000

CMD ["flask", "run", "--host", "0.0.0.0"]