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
        - mime_type1
        - mime_type2
        - etc

meaning by blacklisting mime types.

## FAQ
*why in python?*
because it is a dynamic language which make it easy to write short service as this. this can easily be done in Go-lang or any other robust language.


*How can I change the configuration file?*
it is not implemented yet, but the configuration should be extrernalzied with docker volume,
and in the future the configuration.yaml will be replaced with a configmap.
