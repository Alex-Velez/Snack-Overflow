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
  - Added auth screen with user and signup modals.
  - Added an empty cart screen.

**V07.22**
  - Added some try/catch and more error messages handling unknown errors.
  - Added "Already have an account" and "Don't have an account" to sign up and log in screens respectively.
  - Added discount functionality, order types, and total tracking to transaction creation.

**V07.23**
  - Added home screen.
  - Added grocery pages (Ability to search for is still being implemented).
  - Minor aesthetic changes to some parts of app.

**V07.24**
  - Added pattern checking for signup screen.
  - Updated full transaction backend to include a status.
  - Began profile screen.
  - Updated grocery screen.
  - Updated full user backend and implemented frontend to include addresses.
  - Added intermediate modal to cart screen to verify address.

**V07.27**
  - Added taxing to checkout.
  - Profile page added.
  - Fully implemented shop page with search and categories.
  - Implemented category cards on homepage.
  - Major bug fixes.
  - Added order page.
