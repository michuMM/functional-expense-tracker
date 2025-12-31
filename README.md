# Funkcyjny rejestr wydatków

Aplikacja webowa do analizy wydatków napisana w TypeScript
z wykorzystaniem paradygmatu programowania funkcyjnego.

## Technologie
- React + Vite
- TypeScript
- Chart.js
- Docker

## Funkcjonalności
- dodawanie, edycja i usuwanie wydatków
- filtrowanie i sortowanie danych
- wykres kołowy z procentami
- zapisywanie danych w localStorage

## Uruchomienie lokalne
```bash
npm install
npm run dev
```

## Uruchomienie w Dockerze
```bash
docker build -t expense-tracker .
docker run -p 4173:4173 expense-tracker
```
