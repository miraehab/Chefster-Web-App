<h1>Chefster Web App <img src="https://github.com/miraehab/Chefster-Web-App/blob/main/logo.png" height="80"/></h1>
Cook, share, and discover with Chefster

<h2>Schema:</h2>
<h3>Entities:</h3>

**User:**
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
| Cuisine | STRING |
| UserID |  STRING/UUID |
| PostedAt | Timestamp | 

**Ingredient:**
| Column | Type |
|--------|-----|
| ID | STRING/UUID |
| Ingredient | STRING |

**RecipeIngredient:**
| Column | Type |
|--------|-----|
| RecipeID | STRING/UUID | 
| IngredientID | STRING/UUID | 

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

**Group:**
| Column | Type |
|--------|-----|
| ID | STRING/UUID |
| GroupName | STRING |
| GroupCreatorID | STRING/UUID |
| IsPrivate | Bool |

**JoinGroup:**
| Column | Type |
|--------|-----|
| UserID | STRING/UUID |
| GroupID | STRING/UUID |

<h2>API Documentation:</h2>

You can Check the API Documentation --> <a href="https://github.com/miraehab/Chefster-Web-App/tree/main/server">Here</a>
