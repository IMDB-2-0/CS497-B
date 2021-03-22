# Pipenv

[**Pipenv**](https://pypi.org/project/pipenv/) is a package managing tool in Python, similar to using npm with Node.js.

Instead of manually managing a virtual environment and adding or removing packages for projects, pipenv can automatically do the entire process for us. 

- Instead of using `pip` or `virtualenv` seperately, we can use `pipenv` which combines both.

- Instead of managing a `requirements.txt` file, pipenv uses a `Pipfile` and `Pipfile.lock`.

Here is what an example Pipfile looks like:

```
[[source]]
url = "https://pypi.org/simple"
verify_ssl = true
name = "pypi"

[packages]
flask = "*"
pandas = "*"

[dev-packages]

[requires]
python_version = "3.7.3"
```

We can easily see that this particular project uses Python version 3.7.3 and the flask and pandas libraries. 

The overall development process will be easier us when using Python related tasks with pipenv.

## Pipenv Installation

Assuming you have `pip` installed, you can download the tool through a simple pip install: 

> `pip install pipenv`

## Activating a Virtualenv

We can create a virtualenv automatically (or use the same one if it already exists) by using:

> `pipenv shell`

**If an environment exists already and all the dependencies are not installed, we can use:**

> `pipenv install`

This will install the required dependencies. We can also install all packages specified in a `Pipfile.lock`:

> `pipenv sync`

## Installating/Uninstalling Packages

We can install packages like so:

> `pipenv install NAME_OF_PACKAGE`

We can install dev dependenciees in a similar way:

> `pipenv install NAME_OF_PACKAGE --dev`

We can remove a package like so:

> `pipenv uninstall NAME_OF_PACKAGE`

## Security

We can easily check if our installed dependencies have security vulnerabilities:

> `pipenv check`

## Removing Virtualenv

If we need to remove the project virtualenv for any reasons we can use:

> `pipenv --rm`

