---
title: "Serwis społecznościowy dla ćwiczących siłowo"
subtitle: "open-source"
thumbnail: "0.png"
link: "https://hermes.kaszkowiak.org"
weight: 2
---

Stworzyłem wygodny dziennik treningowy i platformę do dzielenia się wynikami. Hobbystyczny projekt open-source.
<!--more-->
Kod źródłowy jest dostępny na [moim Githubie](https://github.com/asdfMaciej/hermes).

## O stronie
Hermes to sieć społecznościowa do prowadzenia dziennika treningów. Umożliwia dzielenie się swoimi wynikami z wybraną grupą osób. Staram się dodawać przydatne funkcje - np. rekordy ćwiczeń, wizualizowanie postępów, przedstawienie dni treningowych.

Stronę tworzę jako projekt hobbystyczny. Śmiało mogę powiedzieć, że Hermes stał się obecnie moim głównym dziennikiem treningowym oraz spodobał się testerom. Zajmuję się projektem od A do Z - projektowanie, testy UX, programowanie, dodawanie danych, zapewnianie stabilności.

{{< gallerystart >}}
{{< img src="1.png" alt="Feed aktywności" >}}
{{< img src="2.png" alt="Podgląd ćwiczenia" >}}
{{< img src="3.png" alt="Profil" >}}
{{< img src="4.png" alt="Dodawanie treningu" >}}
{{< img src="5.png" alt="Statystyki na żywo" >}}
{{< galleryend >}}

## Stack technologiczny
PHP 7, MySQL - backend
JS (ES6), Vue - frontend

- Niskie koszty utrzymania projektu. Obecny VPS, który administruję (mikr.us), posiada zaledwie 256 MB ramu, 1 rdzeń i wolne I/O - pomimo tego Hermes chodzi szybko. Przykłądowo - zastanawiałem się nad node.js, ale nie byłem pewien, czy serwer podoła (w przeszłości musiałem używać sztuczek, aby zaledwie włączyć npm). Projekt nie ma wystarczająco użytkowników, abym uznał dodatkowy serwer jako wartościowy wydatek.
- Praktyczna nauka wzorców projektowych. Świadomie nie wybrałem istniejącego frameworka i tworzę na bieżąco własny. Gdybym pracował na istniejącym, miałbym mniej miejsc do popełnienia błędów. Pisałbym głównie logikę aplikacji i nie martwiłbym się o sprawy, które załatwia za mnie framework. Tutaj, jeśli błędnie zaprojektuję jakiś element (architekturę, strukturę projektu, deployment, itp.), jestem zmuszony zauważyć błąd i naprawić.
- Stworzenie dopracowanego projektu. Wykorzystanie znanych języków i technologii pozwala mi szybciej rozwijać stronę. Również pogłębia to moją wiedzę oraz obeznanie z wykorzystanymi technologiami.

- Korzystanie z Hermesa zarówno na telefonach (Android, iOS) i na komputerach stacjonarnych. Zdecydowałem się stworzyć stronę bez natywnej appki. Wymagany nakład pracy jest nieproporcjonalny do efektów w projekcie hobbystycznym. W obecnym modelu nowa funkcjonalność jest dostępna od razu na wszystkich platformach. Część natywnej funkcjonalności odzyskałem zamieniając stronę w appkę poprzez GoNative. Dodało to m.in. płynne przejścia pomiędzy podstronami, niewylogowywanie się, okienka systemowe.