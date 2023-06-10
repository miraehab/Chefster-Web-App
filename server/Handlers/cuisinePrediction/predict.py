import sys
import json
import pickle
import pandas as pd
import numpy as np

# get the arguments from the command line
#model_file = sys.argv[1]
req = sys.argv[1]

ingredients = []
word = ""
cnt = 0
for i in req:
    if i == '"' and cnt == 1:
        ingredients.append(word.lower())
        word = ""
        cnt = 0
    elif i == '"':
        cnt += 1
    elif i != ',' and i != ']' and i != '[':
        word += i

# load the model from the file
model = pickle.load(open("D:\mira\GitHub\Chefster-Web-App\server\handlers\cuisinePrediction\cuisineClassification.sav", 'rb'))
columns = pd.read_csv('D:\mira\GitHub\Chefster-Web-App\server\handlers\cuisinePrediction\ingredients_col.csv')
data = pd.DataFrame(np.zeros((1, columns.shape[1])), columns = columns.columns)

for i in ingredients:
    data[i] += 1

# make the prediction using the data
prediction = model.predict(data)
certainty = model.predict_proba(data)

# print the prediction as a json object
print(prediction[0])
print(np.max(certainty)*100)