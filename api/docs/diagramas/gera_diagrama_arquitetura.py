from diagrams import Diagram, Cluster, Edge
from diagrams.onprem.database import PostgreSQL
from diagrams.onprem.container import Docker
from diagrams.onprem.network import Nginx
from diagrams.generic.os import Android
from diagrams.programming.language import TypeScript, Cpp, Kotlin


with Diagram('Infraestrutura do ambiente de produção', curvestyle='curved', show=False):
    with Cluster('Oracle Cloud E2'):
        with Cluster('Docker'):
            db = PostgreSQL('Banco de dados')

            Docker() - Edge(color='blue', style='dashed') - db

    with Cluster('Oracle Cloud Ampere'):
        nginx = Nginx('Nginx')

        with Cluster('Docker'):
            api = TypeScript('API Express')

            Docker() - Edge(color='blue', style='dashed') - api

            db >> Edge(style='bold', forward=True, reverse=True) >> api

        nginx >> Edge(color='darkgreen', style='bold', forward=True, reverse=True) >> api

    with Cluster('Arduino'):
        Cpp('Node MCU') >> Edge(style='bold', forward=True, reverse=True) >> nginx


    with Cluster('Smartphone'):
        app = Kotlin('Aplicativo')

        Android() - Edge(color='green', style='dashed') - app

        app >> Edge(style='bold', forward=True, reverse=True) >> nginx
