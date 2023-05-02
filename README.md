<h1>Chefster Web App</h1>

<h2>Schema:</h2>
<h3>Entities:</h3>

**Users:**
| Column | Type |
|--------|-----|
| ID | STRING/UUID |
| First/Last Name | STRING |
| Username | STRING |
| Password | STRING |
| Email | STRING |

**Recipe:**
| Column | Type |
|--------|-----|
| ID | STRING/UUID |
| Title | STRING |
| Instructions | STRING |
| Ingredients | STRING [] |
| Cuisine | STRING |
| UserID |  STRING/UUID |
| PostedAt | Timestamp | 

**Like:**
| Column | Type |
|--------|-----|
| UserID | STRING/UUID |
| RecipeID | STRING/UUID | 

**Comment:**
| Column | Type |
|--------|-----|
| ID | STRING |
| UserID | STRING/UUID |
| RecipeID | STRING/UUID |
| Comment | STRING |
| PostedAt | Timestamp | 