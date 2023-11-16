# -*- coding: utf-8 -*-
"""
Created on Thu Nov 16 12:19:21 2023

@author: marin
"""

import pandas as pd

# Realizamos la lectura de los datos

file_in = "Input_Data/opendatabcn_educacio_ensenyament_reglat_rep.xlsx"

# Intenta leer el archivo utilizando diferentes códecs
centros_reglados = pd.read_excel(file_in)

# añadimos el tipo de centro
centros_reglados_filtrados = centros_reglados.copy()
centros_reglados_filtrados["tipo_centro"] = "reglat"

# seleccionamos variables de interes

variables_seleccionadas = ['name', 'addresses_road_name',
       'addresses_start_street_number','addresses_neighborhood_id', 'addresses_neighborhood_name',
       'addresses_district_id', 'addresses_district_name',
       'addresses_zip_code', 'values_value', 'secondary_filters_name',
       'geo_epgs_4326_x', 'geo_epgs_4326_y', 'tipo_centro']

centros_reglados_filtrados = centros_reglados_filtrados[variables_seleccionadas]
centros_reglados_filtrados = centros_reglados_filtrados.rename(columns={"values_value": "phone_number", "geo_epgs_4326_y": "latitude", "geo_epgs_4326_x": "longitude"})

centros_reglados_filtrados.to_csv('Input_Data\centros_reglados_filtrados.csv', index=False)  

