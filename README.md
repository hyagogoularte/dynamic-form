# Dynamic Form jQuery Plugin

## Usage
To use the plugin, you need the Bootstrap and Jquery codes.

1. http://jquery.com/download/
2. https://v4-alpha.getbootstrap.com/getting-started/download/

Or you can use CDN link to the files, as the example below.

### Setup

For the plugin works correctly, you need to add in the HTML page JQuery and Bootstrap, as the example below:

```
<html>
<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css">
</head>
<body>
    // CONTENT
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/js/bootstrap.min.js" ></script>
</body>
</html>

```

### DynamicForm

Use the plugin as follows:
After adding the dependencies, you need to add the plugin in the HTML along with your activation div, as in the example below:

```
<html>
<head>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/css/bootstrap.min.css">
</head>
<body>

	<!-- Reference tag -->
	<div id="dynamicForm"></div>
	<!-- End Reference tag --> 
    
    <script src="https://code.jquery.com/jquery-3.1.1.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.5/js/bootstrap.min.js" ></script>

    <!-- Code that activates the plugin -->
    <script type="text/javascript">
	    $(document).ready(function() {
	        var vpo = new ValidParamterObject();

	        var data = {
	            "token": "62bb61431348e22850828a5829c4373faafe29c1",
	            "secret": "51a266c2844ccd5cac83d88de88d82d05358aa51",
	            "modal": vpo.getParameter(),
	            "fields": {
	                "estado": ["PR", "SC", "SP", "RS"],
	                "nível": ["Iniciante", "Intermediário", "Avançado", "Ninja"]
	            }
	        };

	        $('#dynamicForm').dynamicForm(data);
	    });
    </script> 
</body>
</html>
```

### How to test the plugin?

To see how the plugin works, you can use the example within the project. To do this, it is necessary to install the dependencies below:

## NodeJS

```
$ sudo apt-get update
$ sudo apt-get install nodejs
```

## NPM

```
$ sudo apt-get update
$ sudo apt-get install npm
```

## GIT

```
$ sudo apt-get update
$ sudo apt-get install git
```

## Bower

```
$ npm install -g bower
```

## MongoDB
```
Reference: https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-ubuntu/

$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
$ sudo apt-get update
$ sudo apt-get install -y mongodb-org
```

After install the dependencies to run the dependencies from project, you need execute the comands below:

```
// To install front end dependencies.
$ bower install
```

```
// To install back end (nodejs) dependencies.
// Install packages and start the express.js web service (`npm install && npm start`) 
$ npm install
```

When the whole process is completed, you need to start the mongoDB and the server:
```
$ sudo service mongod start
$ nodejs app.js
```

Now, you can see the results opening the page index.html on folder demo/index.html.


I hope I helped you!