- If there are any test files you wish to use, you may wrap them in a **/tests or /ignore** folder. This will be
ignored by git via **.gitignore**
- Ensure you are using a .env file in the root of **/server**
- Querying **SELECT** in *mysql2* using *node.js* returns a 2D array. 
[[{...}, {...}, {...}], [(some metadata)]]
To access your query, use results[0] for an **array** of
your query results.
- **Model class functions** use JSON objects as input for the sake of loose ordering in parameters