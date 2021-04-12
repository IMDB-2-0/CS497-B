import os

def get_host(service: str):
    '''
    Retrieves the host. (Helps with debugging locally)

    - Arguments:
        - service: a Docker service

    - Returns:
        a string of either localhost or a Docker service 
    '''
    inside_docker = os.environ.get('IS_DOCKER_CONTAINER', False)
    return service if inside_docker else 'localhost'