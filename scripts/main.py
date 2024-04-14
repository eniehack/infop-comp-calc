import csv
import json
import sys

j = []
with open(sys.argv[1], encoding="utf8") as f:
  reader = csv.reader(f)
  for row in reader:
      if row[0] == "科目分類":
          continue
      j.append({
        "classification": row[0],
        "id": row[1],
        "title": row[2],
        "credit": float(row[3]),
        "compitence": [
            float(row[5]),
            float(row[6]),
            float(row[7]),
            float(row[8]),
            float(row[9]),
            float(row[10]),
            float(row[11]),
            float(row[12]),
            float(row[13]),
            float(row[14])
        ]
    })

print(json.dumps(j, ensure_ascii=False))
