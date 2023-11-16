# -*- coding: utf-8 -*-
"""
Created on Thu Nov 16 13:58:50 2023

@author: marin
"""

import pandas as pd

# Realizamos la lectura de los datos
file_in = "Input_Data/centros_reglados_filtrados.csv"
centros_reglados = pd.read_csv(file_in)

file_in = "Input_Data/centros_no_reglados_filtrados.csv"
centros_no_reglados = pd.read_csv(file_in)

file_in = "Input_Data/gross_income.csv"
renta_promedio = pd.read_csv(file_in)

file_in = "Input_Data/2021_pad_mdbas_sexe.csv"
poblacion_barcelona_sexo = pd.read_csv(file_in)

file_in = "Input_Data/2021_pad_mdba_sexe_edat-1.csv"
poblacion_barcelona_sexo_edat = pd.read_csv(file_in)

# Hacemos dataset unificado de centros
centros_info = pd.concat([centros_no_reglados,centros_reglados])
centros_info.to_csv('Input_Data\centros_unificados.csv', index=False)  

# procedemos a unificar el dataframe de rentas con el de centros
df_unificado = pd.merge(renta_promedio, centros_info, left_on='neighborhood_code', right_on = 'addresses_neighborhood_id')

# generamos una variable "adress" que englobe addresses_road_name y addresses_start_street_number
df_unificado['address'] = df_unificado['addresses_road_name'] + ' ' + df_unificado['addresses_start_street_number'].astype(int).astype(str)
df_unificado['avg_income'] = df_unificado.groupby('district_code')['gross_income'].transform('mean')

df_unificado = df_unificado.drop(['addresses_road_name','addresses_start_street_number',
                                  'addresses_district_name', 'addresses_district_id',
                                  'neighborhood_name', 'neighborhood_code', 'gross_income'], axis=1)

# extraemos el numero de habitantes para cada distrito
poblacion_barcelona_sexo['density_population'] = poblacion_barcelona_sexo.groupby('Codi_Districte')['Valor'].transform('sum')
poblacion_barcelona_sexo_edat['density_population'] = poblacion_barcelona_sexo_edat.groupby('Codi_Districte')['Valor'].transform('sum')

# Nos aseguramos que los centros no se repitan para cada distrito. (Para eso, actualizar variable secondary_filters_name para que contega 
# todos los valores posibles para cada distrito)
df_unificado['secondary_filters_name'] = df_unificado.groupby('name')['secondary_filters_name'].transform(lambda x: ', '.join(x))
df_unificado = df_unificado.drop_duplicates()

df_unificado['secondary_filters_name'] = df_unificado['secondary_filters_name'].str.split(', ')



'''
# educational_occupational_ranking -> porcentage por 100. integuer
# density_population : Number. -> S'ha d'extreure a nivell de districte.
# ocupation -> ARRAY . numero de gent que esta estudiant,
# work_ocupatation -> dict: gente aturada , no aturada. tenim dataset d'atur occupated / not occupated. Numbers
# age_population:  interval_0_2 , interval_3_5,  interval_6_12, interval_13_15, interval_16_18, 
# interval_19_25, interval_26_30, interval_31_40, interval_41_50, interval_51_70, interval_70_up. dictionary.

# Generamos el JSON en el formato adecuado para backend
json_unificado = (
    df_unificado.groupby(['district_name', 'avg_income', 'district_code'])
    .apply(lambda x: x[['name', 'address', 'addresses_zip_code',
                        'phone_number','tipo_centro', 'longitude',
                        'latitude', 'secondary_filters_name',
                        'addresses_neighborhood_name', 'addresses_neighborhood_id']].to_dict('records'))
    .reset_index()
    .rename(columns={0: 'centers'})
    .to_json(orient='records')
)

with open('Input_Data\df_district_information.json', 'w') as f:
    f.write(json_unificado)
'''