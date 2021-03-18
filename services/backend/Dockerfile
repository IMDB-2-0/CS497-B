FROM python:3.7

WORKDIR /app
COPY . .

RUN pip3 install pipenv 
RUN pipenv install

EXPOSE 80
CMD ["gunicorn", "--timeout=90", "-b", "0.0.0.0:80", "main"]