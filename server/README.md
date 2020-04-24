#  File Type validator service
The service checks the magic bytes of a file, and returns if it was safe or not.

# API
The main endpoint that is available is

    /analyze
    
Just send a Blob object to that endpoint , and the service will validate if the content is safe or not based on the *configuration.yaml* **policy**.

## Configuration.yaml
the policy of the service is dictated by the configuration.yaml file with the following format:

    policy:
	    block:
		    - image/png
		    - application/x-msdownload

meaning by blacklisting mime types.

## FAQ
*why in python?*
because it is a dynamic language which make it easy to write short service as this. this can easily be done in Go-lang or any other robust language.