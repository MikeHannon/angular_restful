I am experimenting with RESTful routing and factories to minimize callbacks and maximize the ability to develop dynamic content modules.  Comments, pull requests, etc. welcome.

Arif 11-1-2015 Update
======================
- Modularized the app.js file into indvidual components for readibilty and add-ons
-- app-controllers
-- app-factories
-- app-directives

- Dried out the factory code a bit
--Created Callbacks for response processing and errorhandling

- Client side
-- Brought anjular app definition up to the html tag
-- Moved js files to "/lib" directory
-- Created empty "MasterClass" for add-ons

Mike 11-1-2015 Update
=====================
- Integrated mongoose
-- restful methods
-- dynamic generation of restful controller and routes
<!--  -->
