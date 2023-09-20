import mysql.connector
import webbrowser

try:
    conexao = mysql.connector.connect(host='localhost', database='garden', user='root', password='')

    cursor = conexao.cursor(dictionary=True)
    cursor.execute(input('query: '))
    retorno = cursor.fetchall()

    for linha in retorno:
        for key, value in linha.items():
            print(f'{key}: {value}')

        print('')
        
except mysql.connector.Error as erro:
    print(f"Erro de leitura {erro}")
finally:
    if conexao.is_connected():
        conexao.close()
        cursor.close()
        print("MySQL connection is closed")

nome_do_arquivo = 'teste.html'
conteudo = f'''<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="style.css">
    <title>Ordenador</title>
</head>
<body>{retorno}</body>'''

def principal(conteudo, nome_do_arquivo):
    saida = open(nome_do_arquivo,"w")
    saida.write(conteudo)
    saida.close()

principal(conteudo, nome_do_arquivo)    
webbrowser.open(nome_do_arquivo)  
