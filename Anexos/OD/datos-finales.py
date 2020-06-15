import csv

codes = []
codigos = []
preData = []
parejas = []
nuevosNombres = []

contador = 0
conteoRespuestas = 0
conteoReal = 0
tieneNum = False
tiene = False
nuevoNombre = ""
nuevoConteo = 0
noResponde = ""
noSabe  = ""
noRespondeConteo = 0
noSabeConteo = 0
anio = 2018
guardo = False

openedCSvFileToWrite = None

openedCSvFileToWrite = open('../Años/2018.csv', "w")
writer = csv.writer(openedCSvFileToWrite)


with open('../Años/Pre/Pre2018.csv', encoding="utf8") as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=';')
    for row in csv_reader:
        contador += 1
        código = str(row[0])
        pregunta = str(row[1])
        if contador % 2 == 1:
            nombres = row
            for nombre in nombres:
                if nombre != "":
                    nuevosNombres.append(nombre)
        else:
            conteos = row
            conteoRespuestas = 0
            i = 1
            for conteo in conteos:
                if conteo == "":
                    i == 1
                    break
                if conteo != código and conteo != pregunta:
                    i += 1
                    if nombres[i] != ".z" and nombres[i] != "Inaplicable":
                        nombreActual = str(nombres[i].capitalize())
                        if (nombreActual == "1") or (nombreActual =="2") or (nombreActual == "3") or (nombreActual =="4") or (nombreActual == "5") or (nombreActual == "6"):
                            tieneNum = True
                            break
            i = 1
            for conteo in conteos:
                if conteo == "":
                    i == 1
                    break
                if conteo != código and conteo != pregunta:
                    i += 1
                    if nombres[i] != ".z" and nombres[i] != "Inaplicable":
                        conteoRespuestas += int(conteo)
                        nombreActual = str(nombres[i].capitalize())
                        if nombreActual == "Mucho" and tieneNum:
                            nombreActual = "7 Mucho"
                        if nombreActual == "Nada" and tieneNum:
                            nombreActual = "1 Nada"
                        if nombreActual == "Muy de acuerdo" and tieneNum:
                            nombreActual = "7 Muy de acuerdo"
                        if nombreActual == "Muy en desacuerdo" and tieneNum:
                            nombreActual = "1 Muy en desacuerdo"
                        if nombreActual == "Aprueba firmemente" and tieneNum:
                            nombreActual = "10 Aprueba firmemente"
                        if nombreActual == "Aprueba  firmemente" and tieneNum:
                            nombreActual = "10 Aprueba firmemente"
                        if nombreActual == "Desaprueba firmemente" and tieneNum:
                            nombreActual = "1 Desaprueba firmemente"
                        if nombreActual == "Desaprueba  firmemente" and tieneNum:
                            nombreActual = "1 Desaprueba firmemente"
                        if nombreActual == "Izquierda" and tieneNum:
                            nombreActual = "1 Izquierda"
                        if nombreActual == "Derecha" and tieneNum:
                            nombreActual = "10 Derecha"
                        if nombreActual == "Por la vía militar" and tieneNum:
                            nombreActual = "1 Vía militar"
                        if nombreActual == "Por la vía del diálogo" and tieneNum:
                            nombreActual = "5 Vía del diálogo"
                        if nombreActual == "Vía militar" and tieneNum:
                            nombreActual = "1 Vía militar"
                        if nombreActual == "Vía del diálogo" and tieneNum:
                            nombreActual = "5 Vía del diálogo"
                        if nombreActual == "Aumentar" and tieneNum:
                            nombreActual = "1 Aumentar"
                        if nombreActual == "Reducir" and tieneNum:
                            nombreActual = "5 Reducir"
                        if nombreActual == "5 reducir" and tieneNum:
                            nombreActual = "5 Reducir"
                        if nombreActual == "reducir" and tieneNum:
                            nombreActual = "5 Reducir"
                        if nombreActual == "Acatar" and tieneNum:
                            nombreActual = "1 Acatar"
                        if nombreActual == "Ignorar" and tieneNum:
                            nombreActual = "5 Ignorar"
                        if nombreActual == "Muy distante" and tieneNum:
                            nombreActual = "0 Muy distante"
                        if nombreActual == "Muy cercano" and tieneNum:
                            nombreActual = "10 Muy cercano"
                        if nombreActual == "Acuerdo" and tieneNum:
                            nombreActual = "7 Muy de acuerdo"
                        if nombreActual == "Desacuerdo" and tieneNum:
                            nombreActual = "1 Muy en desacuerdo"
                        if nombreActual == "Peor vida" and tieneNum:
                            nombreActual = "0 La peor vida posible"
                        if nombreActual == "Mejor vida" and tieneNum:
                            nombreActual = "10 La mejor vida posible"
                        if nombreActual == "La peor vida posible" and tieneNum:
                            nombreActual = "0 La peor vida posible"
                        if nombreActual == "La mejor vida posible" and tieneNum:
                            nombreActual = "10 La mejor vida posible"
                        if nombreActual == "Ricos" and tieneNum:
                            nombreActual = "1 Ricos"
                        if nombreActual == "Pobres" and tieneNum:
                            nombreActual = "10 Pobres"
                        if nombreActual == "1 opositor" and tieneNum:
                            nombreActual = "1 Total opositor"
                        if nombreActual == "Aliado" and tieneNum:
                            nombreActual = "10 Total aliado"
                        preData = [nombreActual, conteo]
                        parejas.append(preData)
            i = 1
            tieneNum = False
            parejas.sort()
            nuevosNombres.sort()
            j = 0
            tiene = False
            guardo = False
            ya1 = False
            ya2 = False
            noSabeConteo = 0
            noRespondeConteo = 0
            for pareja in parejas:
                j= j+1
                nombreActual = pareja[0]
                conteoReal = pareja[1]
                prej = str(j)
                preLen = str(len(parejas))
                if nombreActual== 'No responde':
                    noResponde = nombreActual
                    noRespondeConteo = conteoReal
                    ya1 = True
                if nombreActual== 'No sabe':
                    noSabe = nombreActual
                    noSabeConteo = conteoReal
                    ya2 = True
                if nombreActual.startswith('10 A') or nombreActual.startswith('10 D') or nombreActual.startswith('10 '):
                    nuevoNombre = nombreActual
                    nuevoConteo = conteoReal
                    tiene = True
                if nombreActual != 'No responde' and nombreActual != 'No sabe' and nombreActual != nuevoNombre:
                    data= [anio,código,pregunta,conteoRespuestas,nombreActual,conteoReal]
                    writer.writerow(data)

            if tiene == True:
                data= [anio,código,pregunta,conteoRespuestas,nuevoNombre,nuevoConteo]
                writer.writerow(data)
            if ya2 == True:
                data= [anio,código,pregunta,conteoRespuestas,noSabe,noSabeConteo]
                writer.writerow(data)
            if ya1 == True:
                data= [anio,código,pregunta,conteoRespuestas,noResponde,noRespondeConteo]
                writer.writerow(data)

            ya1 = False
            ya2 = False
            tiene = False
            data = []
            parejas = []



