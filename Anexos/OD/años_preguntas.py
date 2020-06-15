import csv

codes = []
codigos = []

contador = 0

openedCSvFileToWrite = None

openedCSvFileToWrite = open('../SíoNoAnios/SíoNo2018.csv', "w")
writer = csv.writer(openedCSvFileToWrite)

with open('../SíoNoAnios/Pre/Pre2018.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=';')
    for row in csv_reader:
        contador += 1
        código = str(row[0])
        sinRespuesta = str(row[1])
        siguiente = str(row[2])
        noData= [código, "0"]
        data = [código, "1"]
        if sinRespuesta == ".z" and siguiente == "":
            writer.writerow(noData)
        else:
            writer.writerow(data)
        #if contador == 8:
            #break



