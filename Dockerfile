FROM nginx

# Copia los archivos necesarios al directorio de trabajo del contenedor
COPY css /usr/share/nginx/html/css
COPY index.html /usr/share/nginx/html

# Expone el puerto 80 para acceder a la aplicación web
EXPOSE 80