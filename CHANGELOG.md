**V07.03**
  - Added some starter app files in ***app/***. (All empty regarding the commit)
  - Added a ***.gitignore*** file.
  - Organized ***design/*** by file type.
  - Added a ***changelog***.

**V07.06**
  - Created user model file within server-side and wrote user get and add functions.
  - Added sql dir to root with schema.sql file.
  - Initiallized npm in server-side.
  - Added client and server specific todo md files in root directory.
  - Updated gitignore to also include ***ignore/***.

**V07.07**
  - Rounded out and tested initial *user.model.js* class. 
  - Edited ***user.model.js*** so some classes take JSON as input.
  - Created initial ***item.model.js*** class with what should be all functions.
  - Fixed ***.gitignore*** to allow nested ***ignore/*** and ***tests/***, as well as added ***test/***.
  - Added ***node_modules/*** to ***.gitignore*** and removed tracked instances.

**V07.08**
  - Created and tested initial ***transaction.model.js*** class.
  - Updated sql schema.
  - Adjusted ***user.model.js*** and ***item.model.js*** to return error JSON objects rather than print.
  - Created and tested initial ***cart.model.js*** ***rating.model.js*** classes to keep track of and update user carts and ratings.

**V07.11**
  - Minor bug fixes and improvements to ***transaction.model.js***.
  - Created and tested ***itemController.js, userController.js, and transactionController.js***.
  - Created ***item.routes.js, user.routes.js, and transactions.js*** for route handling.
  - Updated ***index.js*** to function for API testing.
  - Updated ***schema.sql*** and created ***seed.sql***

**V07.20**
  - Initial cart class.
  - Created initial header.
  - Updated model classes to allow for transactions to be made.

**V07.21**
  - Added auth screen with user and signup modals
  - Added an empty cart screen
