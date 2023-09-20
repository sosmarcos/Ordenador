import mysql.connector

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
