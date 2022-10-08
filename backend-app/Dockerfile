# BUILD STAGE
FROM composer:latest as vendor

WORKDIR /app

COPY composer.json .
COPY composer.lock .

RUN composer install \
    --no-interaction \
    --no-plugins \
    --no-scripts \
    --prefer-dist

COPY . .
RUN composer dump-autoload

# APPLICATION STAGE
FROM php:8.1.8-alpine

WORKDIR /var/www

COPY . .
COPY .env.example .env

# Install libraries
RUN apk add --update --no-cache curl gcc make g++ zlib-dev

# # Install composer
# RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install dependencies
RUN apk add --update --no-cache \
    libpng-dev \
    libzip-dev \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl

# Install extensions
RUN docker-php-ext-install pdo_mysql zip exif pcntl gd

# Enable php extensions
ENV PHP_EXTENSIONS="opcache,pdo,pdo_mysql,pdo_pgsql,gd,mbstring,mysqli,xml,zip,bcmath,json,curl,iconv,intl,soap,dom,exif,xmlreader,xmlwriter,phar,tokenizer,bz2,calendar,ctype,date,date_time,filter,ftp,gettext,hash,iconv,json,libxml,mbstring,openssl,pcntl,pcre,pdo,pdo_mysql,pdo_sqlite,pdo_sqlite,posix,session,shmop,simplexml,sockets,spl,sqlite3,standard,sysvmsg,sysvsem,sysvshm,tokenizer,wddx,xml,xmlreader,xmlrpc,xmlwriter,zip,zlib"

# Setup env for production
ENV APP_ENV=production
ENV APP_DEBUG=false

# # Install php dependencies without dev dependencies
# RUN composer install

# Copy dependencies from vendor
COPY --from=vendor /app/vendor ./vendor/

# Generate app key
RUN php artisan key:generate
RUN php artisan jwt:secret

# Run Laravel
EXPOSE 8000
CMD php artisan config:cache && php artisan migrate:refresh --seed --force && php artisan serve --host=0.0.0.0 --port=8000
