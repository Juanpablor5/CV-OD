import csv
import json


def archivoProyectos():
    iniciativa = []
    with open("data/Iniciativas.json", encoding='utf-8') as json_file:
        dataInic = json.load(json_file)
        for i in dataInic:
            iniciativa.append(i["iniciativa"])

    with open("data/Proyectos.json", encoding='utf-8') as json_file:
        data = json.load(json_file)
        for i in range(len(data["proyecto"])):
            data["proyecto"][i]["iniciativa"] = iniciativa[data["proyecto"][i]["id"]-1]

    with open("results/Proyectos.json", "w", encoding='utf-8') as file:
        json_dump = json.dumps(
            data, indent=3, sort_keys=False, ensure_ascii=False).encode("utf-8")
        file.write(json_dump.decode())


def archivoIniciativas():
    iniciativa = []
    with open("data/Iniciativas.json", encoding='utf-8') as json_file:
        dataInic = json.load(json_file)
        for i in dataInic:
            iniciativa.append(i["iniciativa"])

    # Crea los Json de los votos del 1-669
    for c in range(-100, 600, 100):
        k = c
        if c+200 == 700:
            c = 469
        with open(f"data/Votos/Votos_{k+101}-{c+200}.json", encoding='utf-8') as json_file:
            data = json.load(json_file)

            for i in range(len(data["congresista"])):
                for j in range(len(data["congresista"][i]["proyecto"])):
                    data["congresista"][i]["proyecto"][j]["iniciativa"] = iniciativa[data["congresista"]
                                                                                     [i]["proyecto"][j]["id"]-1]

        with open(f"results/Votos_{k+101}-{c+200}.json", "w", encoding='utf-8') as file:
            json_dump = json.dumps(
                data, indent=3, sort_keys=False, ensure_ascii=False).encode("utf-8")
            file.write(json_dump.decode())


def archivo():
    # Crea los Json de los votos del 1-669
    for c in range(-100, 600, 100):
        k = c
        if c+200 == 700:
            c = 469
        with open(f"data/Votos/Votos_{k+101}-{c+200}.json", encoding='utf-8') as json_file:
            data = json.load(json_file)
            for i in range(len(data["congresista"])):
                for j in range(len(data["congresista"][i]["proyecto"])):
                    data["congresista"][i]["proyecto"][j].pop(
                        "etiquetas", None)

        with open(f"results/Votos_{k+101}-{c+200}.json", "w", encoding='utf-8') as file:
            json_dump = json.dumps(
                data, indent=3, sort_keys=False, ensure_ascii=False).encode("utf-8")
            file.write(json_dump.decode())


def inner():
    result = {
        "congresista": []
    }

    for c in range(-100, 600, 100):
        k = c
        if c+200 == 700:
            c = 469
        with open(f"data/Votos/Votos_{k+101}-{c+200}.json", encoding='utf-8') as json_file:
            data = json.load(json_file)
            for i in data["congresista"]:
                result["congresista"].append(i)

    with open(f"results/Votos_1-669.json", "w", encoding='utf-8') as file:
        json_dump = json.dumps(
            result, indent=3, sort_keys=False, ensure_ascii=False).encode("utf-8")
        file.write(json_dump.decode())


def innerFechas():
    result = []

    for c in range(2006, 2019):
        print(c)
        with open(f"data/Anios/{c}.json", encoding='utf-8') as json_file:
            data = json.load(json_file)
            result.append({"anio": c, "congresista": data["congresista"]})

    with open(f"results/Anios_unido.json", "w", encoding='utf-8') as file:
        json_dump = json.dumps(
            result, indent=3, sort_keys=False, ensure_ascii=False).encode("utf-8")
        file.write(json_dump.decode())


def parti_congre():
    result = {"partidos": []}
    partidos = []

    with open("data/Congresistas.json", encoding='utf-8') as json_file:
        data = json.load(json_file)
        for i in data["congresistas"]:
            partidos.append(i["partido"])

        partidos = list(dict.fromkeys(partidos))
        partidos.sort()

        for i,parti in enumerate(partidos):
            result["partidos"].append({"id": (i+1), "nombre": parti, "congresistas":[]})
            for j, cong in enumerate(data["congresistas"]):
                if parti == cong["partido"]:
                    result["partidos"][i]["congresistas"].append({"id": cong["id"], "nombre": cong["nombre"]})

    with open("results/Congresistas.json", "w", encoding='utf-8') as file:
        json_dump = json.dumps(
            result, indent=3, sort_keys=False, ensure_ascii=False).encode("utf-8")
        file.write(json_dump.decode())

def preguntas():
    result = []

    with open("data/2004-2018.json", encoding='utf-8') as json_file:
        data = json.load(json_file)
        for i in data["respuestas"]:
            if type(i["nombre"])==str:
                result.append(i["nombre"])

    mylist = list(dict.fromkeys(result))

    with open("results/2004-2018.json", "w", encoding='utf-8') as file:
        json_dump = json.dumps(
            mylist, indent=3, sort_keys=False, ensure_ascii=False).encode("utf-8")
        file.write(json_dump.decode())


preguntas()
