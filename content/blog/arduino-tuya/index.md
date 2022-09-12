---
title: "Sterowanie żarówkami Tuya za pomocą Arduino i ESP8266"
date: 2022-03-15T18:33:06+02:00
lastmod: 2022-03-15T18:33:06+02:00
summary: "Stworzyłem fizyczny panel sterujący najtańszym oświetleniem RGB. Przedstawiam Wam opis wykonania, kod oraz schematy elektryczne."
thumbnail: "arduino.jpg"
tags: ["arduino", "esp8266", "iot"]
hidethumbnail: 1
---

{{< youtube k93ksGNNwZQ >}}

## Wstęp
Posiadam 3 żarówki RGB zarządzane za pomocą aplikacji Tuya Smart. Sterowanie odbywa się poza siecią lokalną, za pośrednictwem serwerów producenta. Ogólnodostępne API umożliwia zmianę kolorów, jasności oraz stanu żarówki za pomocą zwykłych zapytań. Schemat działania budzi we mnie pewien niepokój. Urządzenia IoT stanowią w tym przypadku zbyteczny wektor ataku na sieć. Czy potrzebuję kontrolować oświetlenie poza zasięgiem Wi-Fi? Zdecydowanie nie - niemniej, postanowiłem wykorzystać sytuację i oskryptować żarówki ;) 

Głównym bodźcem do stworzenia projektu była powolna aplikacja Tuya Smart, która nie wspiera predefiniowanych scen ani gaszenia wszystkich świateł jednocześnie. Postawiłem sobie za cel przyspieszenie zmiany kolorów z kilkunastu do zaledwie jednego kliknięcia. Stworzyłem w dwie godziny prowizoryczną aplikację desktopową opartą o Pythona oraz biblioteki tinytuya i eel.

Kontrolowanie oświetlenia z poziomu desktopowego niestety nie jest poręczne. Aplikacja pełniła swoją rolę wyłącznie gdy korzystałem z laptopa, więc w głównej mierze byłem zdany na toporne Tuya Smart. Wpadłem zatem na pomysł, aby stworzyć fizyczny panel do sterowania światłem :)

## Zastosowana architektura

Założeniem projektowym było przesłanie kilku komend do API po naciśnięciu przycisku. Sceny różnią się w zależności od wyboru oraz powinny być łatwo modyfikowalne. Projekt został oparty o wcześniej posiadane komponenty, stąd napotkałem miejscami na ograniczenia.

Do połączenia z siecią wykorzystałem moduł ESP-01 (oparty o SoC ESP8266EX), który umożliwia transfer danych za pośrednictwem Wi-Fi. Na tym kończy się jego rola. Niewielka liczba pinów GPIO uniemożliwia chociażby podłączenie wejścia, czyli klawiatury 4x4. Z tego powodu musiałem wykorzystać również Arduino UNO.

Komunikacja pomiędzy Arduino oraz ESP-01 jest możliwa dzięki wykorzystaniu portów seryjnych. Skrzyżowanie pinów TX/RX sprawia, że urządzenia nawiązują ze sobą transmisję. Po naciśnięciu przycisku Arduino przesyła wybrane przez użytkownika znaki do ESP-01 za pośrednictwem portu seryjnego, a także wyświetla informację zwrotną przez kontrolowanie trzech LEDów.

W celu uproszczenia konfiguracji wykorzystałem wcześniej stworzony skrypt. Przystosowałem jego strukturę oraz napisałem wrapper w PHP umożliwiający zmianę sceny zwykłym GET requestem. Zaimplementowałem proste zabezpieczenie w postaci zhardcodowania hasła zarówno po stronie ESP-01 jak i skryptu PHP. Dla skryptu wydzieliłem domenę {{<link href="https://genesis13.kaszkowiak.org" text="genesis13.kaszkowiak.org" rel="nofollow" target="_blank">}} - niech stanie się światłość ;)

Modyfikacja scen polega na zmianie kodu po stronie serwera, przez co kod sieciowy na ESP-01 nie wymaga zmian. Wymusza to dodatkową zależność w postaci uptime kaszkowiak.org - jest to minimalny koszt w stosunku do zalet.

## Programowanie ESP8266 przez Arduino

Pierwszym krokiem do stworzenia projektu jest zaprogramowanie ESP-01. Wykorzystałem do tego połączenie z PC przez Arduino. Po połączeniu pinów TX oraz RX bezpośrednio ze sobą możemy programować moduł za pomocą aplikacji Arduino.

Układ wymaga kilku istotnych komentarzy. Wprowadzenie ESP-01 w tryb programowania wymaga uziemienia pinu GPIO-0. Dodatkowo przed każdym wgraniem programu musimy wprowadzić stan niski na pin RST. W tym celu wykorzystałem rezystor pull-up o impedancji 10k. Naciśnięcie przycisku spowoduje zresetowanie modułu.  

Uziemiłem również stałym połączeniem pin RESET w Arduino. Umożliwia to bezpośrednią komunikację pomiędzy komputerem oraz ESP8266. 

{{< img src="circuit-esp.png" alt="Układ do zaprogramowania ESP8266">}}

Po skonstruowaniu układu możemy zaprogramować moduł ESP-01 za pomocą aplikacji Arduino. W tym celu musimy wejść w ustawienia oraz wkleić [następujący URL](http://arduino.esp8266.com/stable/package_esp8266com_index.json) w pole "Dodatkowe adresy URL do menadżera płytek". Po zrestartowaniu aplikacji wchodzimy w menu Narzędzia > Płytka > Menadżer płytek oraz instalujemy "esp8266" w wersji 2.5.0. Nowsze wersje posiadają mniej czytelne komunikaty błędów oraz powodują problemy z wgrywaniem kodu wg. [dyskusji na GitHubie](https://github.com/espressif/esptool/issues/432). Na końcu należy wybrać "Generic ESP8266 Module" w menu Narzędzia > Płytka oraz ustawić wartość Builtin Led na "1".

Możemy sprawdzić, czy poprawnie skonfigurowaliśmy układ poprzez wgranie aplikacji Blink z menu Plik > Przykłady. Po naciśnięciu przycisku Reset wgranie programu powinno zakończyć się sukcesem, a wbudowana dioda w ESP-01 zacznie mrugać. 

## Kod źródłowy dla ESP-01
{{< unsafe >}}
<div class="github-code">
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FasdfMaciej%2Farduino-tuya%2Fblob%2Fmain%2FCode%2520-%2520ESP8266%2Fesp8266.cpp&style=github&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</div>
{{< /unsafe >}}

Powyższy program wykorzystuje port szeregowy do komunikacji, więc możemy się z nim komunikować za pośrednictwem Narzędzia > Monitor portu szeregowego. Warto zwrócić uwagę na wybór poprawnej szybkości transmisji, czyli 115200 baud. W skrócie: program czeka za otrzymaniem dużej litery bądź cyfry. Otrzymany znak następnie jest dopisywany do zdefiniowanego adresu URL jako parametr. ESP-01 wykonuje zapytanie GET, a następnie zwraca status połączenia w postaci pierwszej litery koloru (Red/Yellow/Green).

Po zaprogramowaniu ESP-01 możemy zająć się programowaniem Arduino - w tym wypadku wystarczy zwykłe połączenie Arduino <-> PC bez komunikacji z ESP-01. Transmisja odbywa się po porcie szeregowym, więc możemy ręcznie symulować input pochodzący z modułu.

## Kod źródłowy dla Arduino
{{< unsafe >}}
<div class="github-code">
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FasdfMaciej%2Farduino-tuya%2Fblob%2Fmain%2FCode%2520-%2520Arduino%2Farduino.cpp&style=github&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</div>
{{< /unsafe >}}

W tym przypadku Arduino przetwarza input z podłączonego keypada 4x4, przesyła go przez port seryjny oraz zapala LEDy w oparciu o przychodzące sygnały R/G/Y. Sterowanie LEDami odbywa się asynchronicznie, aby nie pominąć przychodzących danych. 

Po zaprogramowaniu Arduino możemy przejść do połączenia wszystkich komponentów.

## Schemat kompletnego projektu
{{< img src="circuit-full.png" alt="Schemat kompletnego projektu">}}

Warto zwrócić uwage na drobne różnice w stosunku do układu programującego ESP-01. Przede wszystkim - usunąłem przycisk RESET, aby przypadkowo nie wyczyścić wgranego programu. Odłączyłem również uziemienie pinu RESET w Arduino oraz pinu GPIO0 w ESP-01. Piny TX/RX są skrzyżowane, przez co output (TX) Arduino trafia na input (RX) ESP-01.   

Po zasileniu układu momentalnie powinien zapalić się czerwony LED, a po kilku sekundach wszystkie kolory.  

## Przetwarzanie zapytania na serwerze
### Kod źródłowy - PHP
Rola skryptu PHP przetwarzającego zapytanie to wyłącznie autoryzacja na podstawie wbudowanego hasła oraz przekazanie wybranej sceny do skryptu tuyalights. Scena może przyjąć jedynie wartość numeryczną, aby w prosty sposób zapobiec RCE.

Kod działa poprawnie, jednak należy zauważyć, że typ żądania GET jest niewłaściwie użyty - POST z reguły zadziałałby lepiej. W tym konkretnym przypadku nie powinno to wyrządzić żadnej szkody, ale jako przykład - przeglądarki mogą samoistnie duplikować lub preloadować żądania GET (Safari z tego słynie). Nie chcielibyśmy, aby nasze światła zmieniały się losowo, prawda? ;)   

{{< unsafe >}}
<div class="github-code">
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FasdfMaciej%2Farduino-tuya%2Fblob%2Fmain%2FCode%2520-%2520Server%2Findex.php&style=github&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</div>
{{< /unsafe >}}

### Kod źródłowy - Python 3
Sceny są zdefiniowane oraz przypisane do identyfikatorów w skrypcie tuyalights. Na ich podstawie powstaje przesyłane zapytanie do API. Drobny disclaimer - skrypt został zlepiony na podstawie istniejącego kodu, można go ulepszyć poprzez czytanie scen oraz sekretów API z zewnętrznego źródła danych.  

W moim deploymencie umieściłem plik w katalogu /usr/bin znajdującym się w zmiennej PATH, aby wywołanie skryptu nie wymagało podania bezpośredniej ścieżki. Pominięcie tego kroku może wywołać błąd w skrypcie PHP. Nie zalecam umieszczać pliku w tym samym katalogu co index.php, ponieważ bez uprzedniej konfiguracji serwera skrypt stanie się możliwy do pobrania - a co za tym idzie wyciekną klucze API oraz ID urządzeń.

{{< unsafe >}}
<div class="github-code">
<script src="https://emgithub.com/embed.js?target=https%3A%2F%2Fgithub.com%2FasdfMaciej%2Farduino-tuya%2Fblob%2Fmain%2FCode%2520-%2520Server%2Ftuyalights&style=github&showBorder=on&showLineNumbers=on&showFileMeta=on&showCopy=on"></script>
</div>
{{< /unsafe >}}

Skrypt wymaga zainstalowanej biblioteki tinytuya (python3 -m pip install tinytuya). Na koniec dodam, że [w jej dokumentacji](https://pypi.org/project/tinytuya/) został opisany sposób otrzymania kluczy oraz ID urządzeń. 

Zapraszam również na mojego Githuba, na którym umieściłem pełen [kod projektu włącznie z schematami](https://github.com/asdfMaciej/arduino-tuya) w formacie PDF.