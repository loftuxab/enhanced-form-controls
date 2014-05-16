Enhanced Form Controls for Share
======================

> Alfresco Share enhanced forms controls addon (enhanced-form-controls)

Introduction
-----------

This project contains alternative and improved custom forms controls for forms displayed within Alfresco Share.

Once you have this module installed, you will need to modify your share forms configurations to use these controls.

###Available Controls
- Enhanced People Picker - An improved people picker for Alfresco Share.

###Development

1. Clone the project and import the project into your editor.

    eg. If you're using Eclipse/STS, use Import > Import Existing Maven Projects...

###Setting Up and Running the Project
1. Clone the project.
    ```
    git clone https://github.com/loftuxab/enhanced-form-controls
    ```

2. Start the repository server.

    ```
    MAVEN_OPTS="-Xms256m -Xmx2G -XX:PermSize=300m" mvn integration-test -Pamp-to-war
    ```

    You can also run `./run.sh` in the `enhanced-form-controls-repo` directory.
3. Start the share server.

    ```
    MAVEN_OPTS="-Xms256m -Xmx2G -XX:PermSize=300m" mvn integration-test -Pamp-to-war -Dmaven.tomcat.port=8081
    ```

    You can also run `./run.sh` in the `enhanced-form-controls-share` directory.

####In Summary,
```
git clone https://github.com/loftuxab/enhanced-form-controls
MAVEN_OPTS="-Xms256m -Xmx2G -XX:PermSize=300m" mvn integration-test -Pamp-to-war -f enhanced-form-controls-repo/pom.xml
MAVEN_OPTS="-Xms256m -Xmx2G -XX:PermSize=300m" mvn integration-test -Pamp-to-war -Dmaven.tomcat.port=8081 -f enhanced-form-controls-share/pom.xml
```

Once the server is up, access your Share server by visiting http://localhost:8080/share.

Deploying in an existing Alfresco/Share Server
------
1. Run the above steps.
2. Access the target directory in each project and retrieve the `enhanced-form-controls-repo.amp` and `enhanced-form-controls-share.amp`.
3. Copy each amp file to their respective install drop sites.

    `enhanced-form-controls-repo.amp` to `/ALF_HOME/amps` and `enhanced-form-controls-share.amp` to `ALF_HOME/amps_share`)

4. Make sure your Alfresco Server is not running.
5. Run `ALF_HOME/bin/apply_amps.sh`
6. Start the server.

Contributing
---------

Have you got ideas for improved controls that can enhance user experience on Alfresco Share? You can contribute in the following ways.
- Clone/fork the project and contribute your form controls by making a pull request.
- Create an issue on the github issue tracker.

Warranty and License
-------

This project comes with no warranty. Use it at your own risk. However, you may be able to purchase consulting/support for the controls from authors/contributors and/or external parties if you intend to use these controls in a commercial project.

Under Apache License. Please see LICENSE file.

Authors
-------
- Peter Löfgren
- Bhagya Silva
