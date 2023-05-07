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

**Group:**
| Column | Type |
|--------|-----|
| GroupName | STRING |
| GroupID | STRING/UUID |
| GroupCreatorID | STRING/UUID |

**JoinGroup:**
| Column | Type |
|--------|-----|
| UserID | STRING/UUID |
| GroupID | STRING/UUID |