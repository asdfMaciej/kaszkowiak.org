---
title: "Strona dynamiczna a strona statyczna - zalety, wady, definicja"
date: 2021-06-12T13:33:06+02:00
lastmod: 2021-06-12T13:33:06+02:00
summary: "Poznaj różnicę pomiędzy dwoma typami stron."
thumbnail: "computer.jpeg"
tags: ["webdev", "newbie"]
---

## Co to jest strona dynamiczna?
**Strona dynamiczna oparta jest o system zarządzania treścią (CMS).** Przy wyświetlaniu strony dynamicznej serwer wykonuje kod i nawiązuje połączenie z bazą danych, w której przechowywana jest treść i konfiguracja witryny. Całość jest dostępna do modyfikacji w prostym w obsłudze panelu. Popularne systemy zarządzania treścią, takie jak Wordpress i Joomla, cechują się dużą ilością poradników oraz przyjaznością w obsłudze.  

{{< img src="wordpress.png" alt="Edytowanie treści w Wordpressie można porównać do obsługi Worda" >}}
**CMS ułatwia samodzielną edycję treści oraz dodawanie nowych podstron.** Do obsługi nie jest wymagana umiejętność programowania ani modyfikacji kodu. Strona dynamiczna umożliwia wzbogacenie jej o interaktywne elementy, jak np. formularz kontaktowy czy też system logowania. Do popularnych CMSów istnieje duża ilość bezpłatnych pluginów pozwalających na rozszerzenie funkcjonalności na podstawie samego tutoriala.

### Wady strony dynamicznej
Strona dynamiczna jest bardziej złożona pod względem wdrożenia i konfiguracji od strony statycznej. CMS wymaga bazy danych oraz hostingu umożliwiającego wykonywanie kodu, przez co strona jest droższa w utrzymaniu. Szacunkowy roczny koszt utrzymania prostej strony dynamicznej wynosi około 200zł, przy czym szczegółowa kwota różni się w zależności od oferty hostingowej. Silnie zalecane jest regularne aktualizowanie CMSa, ponieważ korzystanie z przestarzałej wersji naraża naszą stronę na włamania.

## Co to jest strona statyczna?
**Strona statyczna nie posiada systemu zarządzania treścią.** Stworzona jest zazwyczaj w oparciu o czysty kod HTML, dzięki czemu zadaniem serwera jest jedynie wyświetlić gotowy rezultat. Treść oraz konfiguracja strony przechowywana jest w plikach, eliminując potrzebę dostępu do bazy danych.

{{< img src="html.png" alt="Edytowanie kodu HTML">}}
Wybór strony statycznej przekłada się na niższe koszty utrzymania - dzięki ofertom Netlify czy Github Pages **hosting może być w pełni darmowy**! Strona statyczna jest również prosta pod względem wdrożenia. Dodatkowo nie musimy się martwić o aktualizacje CMSa - strona zawsze pozostanie bezpieczna, ponieważ nie ma potencjalnego wektoru ataku, jakim jest kod wykonywany po stronie serwera (pod warunkiem hostingu u sprawdzonego dostawcy usług).

### Wady strony statycznej
Jako wadę można uznać utrudnioną modyfikację treści - wymagana jest do tego chociaż podstawowa znajomość HTML. Strony statycznej nie wyposażymy w większość interaktywnych elementów. Nie można jej również szybko przerobić na stronę dynamiczną - to stosunkowo czasochłonny proces. 

Ze względu na powyższe różnice istotne jest ustalenie celów, jakie ma realizować nasza strona i dokonanie na ich podstawie trafnego wyboru - jeszcze przed rozpoczęciem prac. 

## Jaki rodzaj strony wybrać?

**Strona statyczna świetnie się sprawdzi, gdy:**
- chcemy aktualizować treść maksymalnie raz na kilka miesięcy, raz na rok
- nie planujemy założyć bloga ani dodawać nowych podstron
- chcemy ograniczyć koszty do minimum
- chcemy jedynie zaznaczyć naszą obecność w Internecie


Jeśli chcemy regularnie aktualizować ofertę, wzbogacać stronę samodzielnie o nowe zdjęcia, czy też rozważamy założenie bloga - **w takich sytuacjach powinniśmy sięgnąć po stronę dynamiczną**. W tym przypadku korzyści przewyższą dodatkowy koszt realizacji i utrzymania strony.   