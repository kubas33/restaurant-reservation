# API do Zarządzania Restauracjami

## Opis

To API zostało zbudowane z użyciem Express.js, TypeORM i SQL i obsługuje pełny CRUD (Create, Read, Update, Delete) dla restauracji, stolików oraz rezerwacji stolików. API jest częścią aplikacji do zarządzania restauracjami, pozwalając na tworzenie, edytowanie, usuwanie i przeglądanie danych.

## Działające funkcjonalności

- **Restauracje:**
    - Dodawanie nowej restauracji.
    - Pobieranie listy restauracji.
    - Aktualizacja istniejącej restauracji.
    - Usuwanie restauracji.

- **Stoliki:**
    - Dodawanie nowego stolika.
    - Pobieranie listy stolików w danej restauracji.
    - Aktualizacja istniejącego stolika.
    - Usuwanie stolika.

- **Rezerwacje:**
    - Tworzenie nowej rezerwacji dla stolika.
    - Pobieranie listy rezerwacji dla danej restauracji i stolika.
    - Aktualizacja rezerwacji.
    - Anulowanie (usuwanie) rezerwacji.

## Instalacja

1. Sklonuj repozytorium:

   ```bash
   git clone https://github.com/kubas33/restaurant-reservation.git
   
2. Przejdź do katalogu projektu:
    ```bash
   cd restaurant-reservation
3. Zainstaluj zależności: 
   ```bash
    yarn install
4. Uruchom migracje TypeORM, aby utworzyć niezbędne tabele:
   ```bash
    yarn typeorm migration:run
5. Uruchom seed:
    ```bash
   yarn typeorm seed:run
6. Uruchom aplikację:
   ```bash
    yarn dev
