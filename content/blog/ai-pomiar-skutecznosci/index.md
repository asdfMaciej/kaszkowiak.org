---
title: "Rozwój AI: fundamenty, czyli pomiar skuteczności"
date: 2024-09-23T00:00:00+02:00
lastmod: 2024-09-23T00:00:00+02:00
summary: "Co daje mierzenie skuteczności? Jak? Na co uważać? - artykuł odpowie na te pytania i umożliwi Wam tworzenie lepszych aplikacji opartych o AI!"
thumbnail: "placeholder.jpg"
draft: true
tags: ["ulepsz swoje AI", "ai", "python", "llm", "rag"]
hidethumbnail: 1
---

Fundamenty rozwoju - aby ulepszyć swoje AI, musimy zacząć od systematycznego mierzenia skuteczności

Zacznę od przybliżenia tematu i problematyki - czyli "dlaczego i po co?"; a następnie przejdę do konkretów technicznych, czyli "jak?".

---

{{< notice-feather-icons info >}}
Artykuł jest skierowany zarówno do programistów zagłębiających się w świat AI, jak i osób podejmujących decyzje biznesowe.
{{</ notice-feather-icons >}}

## Po co w ogóle mierzyć skuteczność?

Wyobraźmy sobie następującą sytuację: 

Odpowiadasz razem z Twoim zespołem za rozwój najnowszej aplikacji AI: generator poematów o kotach.

Spokojny piątkowy poranek. Twój *<klient / użytkownik / tester>* zgłasza krytyczny błąd: aplikacja nagle napisała poemat o psie! Chcecie to naprawić, więc dostosowujecie mechanizm pod znaleziony przypadek. Ponownie testujecie załączone pytanie i... aplikacja poprawnie wygenerowała poemat o kocie! Działa, więc wdrażacie poprawkę na produkcję :)

No właśnie - czy na pewno działa? Nie macie zestawu testów, więc:
- nie wiecie, że naprawa 1 przypadku spowodowała wygenerowanie błędnej odpowiedzi w 10 innych przypadkach;
- po zmianach Wasza aplikacja czasami zaczęła generować poematy po chińsku - nie wiecie dlaczego, ale musicie przygotować kolejną łatkę;
- wcześniej zgłoszony błąd, który naprawiliście miesiąc temu, nagle zaczął znowu występować w systemie;
- nie jesteście w stanie stwierdzić, czy Wasza aplikacja się w ogóle poprawia - w końcu cały czas pojawiają się nowe błędy! Jak udowodnicie, że Wasze działania faktycznie rozwijają aplikację?

I tutaj wchodzą testy, które rozwiążą Wasze problemy!
## Testy w aplikacjach AI są konieczne

Wprowadzenie testów pomoże Wam ustalić, że zmiana X polepszyła skuteczność aplikacji z 80% do 85%, a kolejna zmiana Y pogorszyła skuteczność z 85% do 73%. Dzięki temu:
- będziecie w stanie jasno ustalić, czy skuteczność aplikacji się polepsza, lub czy np. ma słabe punkty;
- zapobiegniecie wprowadzenia regresji, czyli nieświadomego pogorszenia jakości odpowiedzi lub wprowadzenia słabych błędów;
- ponadto, tworząc testy, jasno ustalicie czego oczekujecie od Waszej aplikacji oraz co jest waszym priorytetem

**Uważam, że w aplikacjach opartych o AI testy to konieczność**. Nie możemy ich całkowicie pominąć, poprzez próbę zminimalizowania kosztów. To tylko zadziała, jeśli Wasz model nie musi być dobry, lub przewidujecie, że nie trafi nigdzie na produkcję ;) 
### Moja aplikacja jest w 100% poprawna i nie ma żadnych błędów. Dlaczego tak nie mogę zrobić z AI?

Tradycyjne aplikacje (bez AI) opierają się o logikę, którą zawsze jesteśmy w stanie dostosować pod nasze wymagania biznesowe. Jeśli nie mamy błędów w implementacji, nasza aplikacja zawsze będzie robiła dokładnie to, czego od niej oczekujemy.

Nie możemy zagwarantować takiej 100% skuteczności w aplikacjach opartych o AI. A gdy nasza aplikacja odpowiada poprawnie na 99% zapytań użytkowników, to nadal jesteśmy w stanie znaleźć brakujący odsetek 1%, w którym pojawiły się błędy. A testy manualne wykażą jedynie ten 1% błędów - bez zwrócenia uwagi na skalę problemu :)

{{< notice-feather-icons note >}}
Dlaczego nie możemy zagwarantować 100% skuteczności?
Pod spodem modelu językowego, jak np. ChatGPT, nie mamy serii instrukcji warunkowych (tzw. ifów) określających formalną logikę, tylko funkcję matematyczną (sieć neuronową), która zawiera kilkaset tysięcy miliardów parametrów! Te liczby odpowiadają za prawdopodobieństwa wygenerowanie tekstu. 
 
Parametry zostały wyznaczone empirycznie - model nauczył się na etapie trenowania doskonale odpowiadać na przypadki treningowe.  
{{</ notice-feather-icons >}}
### Jak możemy ewaluować jakość odpowiedzi? 

Niezależnie od Waszej aplikacji:
1. Stwórzcie zbiór przypadków testowych i oczekiwanych kryteriów odpowiedzi. Kryteria powinny być możliwie jasne, np. "odpowiedź X zawiera informacje o Y", albo "zdjęcie K zostało sklasyfikowane jako kot";
2. Zmierzcie, jak Wasza aplikacja radzi sobie z każdym przypadkiem i obliczcie ile % przypadków było poprawnych;
3. Powtarzajcie krok drugi po każdych zmianach :)

Chciałbym jednak przekazać Wam praktyczną wiedzę - skupię się więc na aplikacjach wykorzystujących mechanizm RAG. To między innymi chatboty, które odpowiadają na pytania z danej bazy wiedzy, np. produktach na sklepie czy informacji na stronie. **Przechodzę tutaj do bardziej technicznej części posta :)**
### Ewaluacja chatbota za pomocą LLMów

Najprostszym przypadkiem jest ręczne sprawdzanie każdego przypadku testowego. To potencjalnie najbardziej dokładne rozwiązanie, jednak **niepraktyczne**. Możemy zaoszczędzić czas i zastosować LLMy :)

Przyjmijmy, że mamy 1 przypadek testowy w chatbocie dla producenta lodówek:
- Pytanie: "Jak się z Wami skontaktować?"
- Kryteria oceny:
	- Odpowiedź musi zawierać adres "Szczebrzeszyn, ul. Górna 123"
	- Odpowiedź musi zawierać nr telefonu "+48 123 456 789"
	- Odpowiedź powinna być napisana profesjonalnym tonem

Gdy chatbot wygeneruje odpowiedź - np. "No elo mordeczko, możesz skontaktować się z nami pod nr +48 123 456 789, albo wpaść do nas w Szczebrzeszynie na ul. Górnej 123. Pozdro!" - to możecie poinstruktować LLMa specjalnymi promptami: 

> - ✅ Odpowiedz TAK, jeśli odpowiedź "No elo mordeczko..." zawiera adres "Szczebrzeszyn ..."
> - ✅ Odpowiedz TAK, jeśli odpowiedź "..." zawiera nr telefonu "..."
> - ❌ Odpowiedz TAK, jeśli odpowiedź jest napisana profesjonalnym tonem.

Efekt? Model ustali, że została wygenerowana błędna odpowiedź. Dowiecie się, co było w niej nie tak. Zajmie to sekundy i będzie kosztowało Was ułamki centów :)  
### Promptfoo - narzędzia do pomiaru skuteczności

Prawdopodobnie nie będziecie musieli programować takiego frameworka! Przedstawię Wam sprawdzone narzędzie open-source, które może okazać się dostateczne.

[Promptfoo](https://www.promptfoo.dev/) to moim zdaniem najlepsze narzędzie do testowania promptów oraz aplikacji RAG. Jest bezpłatne, stale rozwijane oraz stara się być możliwie uniwersalne. Post nie jest sponsorowany ;)

Zachęcam do zapoznania się z [README na Githubie](https://github.com/promptfoo/promptfoo). Poniżej zamieszcza przykładową konfigurację, która:
- porównuje 2 prompty
- porównuje 2 różnych providerów
- dla 4 wariantów (2 różne prompty razy 2 różnych providerów) wykona 2 przypadki testowe, z czego:
	- pierwszy przetestuje tłumaczenie na język francuski, i sprawdzi czy output ma mniej niż 100 znaków
	- drugi przetestuje tłumaczenie na język niemiecki, sprawdzi podobieństwo outputu na podstawie embeddingów (cosine similarity) oraz zapewni, że model nie opowiada o sobie jako o modelu językowym

```yaml
prompts:
  - file://prompt1.txt
  - file://prompt2.txt
providers:
  - openai:gpt-4o-mini
  - ollama:llama3.1:70b
tests:
  - description: 'Test translation to French'
    vars:
      language: French
      input: Hello world
    assert:
      - type: contains-json
      - type: javascript
        value: output.length < 100

  - description: 'Test translation to German'
    vars:
      language: German
      input: How's it going?
    assert:
      - type: llm-rubric
        value: does not describe self as an AI, model, or chatbot
      - type: similar
        value: was geht
        threshold: 0.6 # cosine similarity
```

Możliwości są niezwykle szerokie, więc bez problemu dostosujecie konfigurację pod swoje potrzeby. Output możecie podejrzeć w formie GUI:

TODO: zdjęcie

Narzędzie możecie zintegrować z CI/CD (jest zaprojektowane aby zarówno móc sterować nim przez GUI, jak i CLI). Promptfoo umożliwia ustalenia [dowolnej aplikacji jako providera](https://www.promptfoo.dev/docs/providers/webhook/).

## Porady do implementacji testów

Zostawiam Ci kilka praktycznych porad - bo diabeł tkwi w szczegółach:
### Stwórz benchmark już na samym początku pracy 

Zacznij od ustalenia: na jakie pytania powinna odpowiadać Twoja aplikacja? Jakie powinny być ich oczekiwane odpowiedzi? Na co zwracać uwagę? 

Mając gotową listę, możesz stworzyć prototyp aplikacji. Stworzenie działającego MVP da Tobie punkt odniesienia, który następnie będziesz mógł stopniowo ulepszać. Nie będziesz musiał polegać na subiektywnych odczuciach, ale na zbiorze metryk skuteczności: 50% trafności, 60% trafności, ... 

Może okaże się, że na Twoje potrzeby wczesny prototyp będzie wystarczająco dobry? Albo w drugą stronę - niezwykle niska skuteczność zasygnalizuje Ci, że pomysł jest znacznie cięższy niż myślałeś.
### Nie twórz testów pod zebrane dane; twórz testy pod użytkownika

Łatwo wpaść w pułapkę realizacji testów na podstawie aktualnie posiadanych danych.

Czujesz, że pytanie będzie na tyle ciężkie, że system sobie nie poradzi, bo np. wymaga wiedzy z dwóch różnych źródeł systemu, więc nie dodajesz pytania do zbioru testowego? Albo przeglądasz bazę danych, tworząc pytania bezpośrednio w oparciu o słowa kluczowe z oryginalnych tekstów?

To znak dla Ciebie, aby bardziej realnie przetestować swój system ;) Użytkownik wykorzystuje synonimy, często gubi interpunkcję czy duże znaki. Może nie używać terminów, które Ty znasz. Może wykorzystuje prostszy język, może fachową terminologię, a może korzysta z akronimów i skrótowców?

Pamiętaj, że celem testów jest zadowolenie użytkownika końcowego, nie sztuczne podbicie metryczki.
### Zadbaj o zróżnicowane pytania testowe

Nie umieszczaj w testach tylko i wyłącznie ciężkich pytań - umieszczenie pozornie prostych pytań pozwoli wyłapać poważne regresje, na które na pewno trafiłby użytkownik Waszej aplikacji. 

Pamiętaj również, że aplikacja RAG może nie działać prawidłowo na różne sposoby, więc Twoje pytania testowe powinny zabezpieczać przed możliwie najszerszym zakresem porażek:
- sprawdź, czy LLM nie halucynuje przy pytaniach spoza zakresu wiedzy;
- zobacz, czy retrieval działa poprawnie przy przypadkach brzegowych synonimy, akronimy, inna terminologia, niekompletna polszczyzna;
- czy można wymusić niestosowną odpowiedź? (jeśli to niedopuszczalne)
- czy można wymusić, aby LLM zwrócił prompt systemowy? czy można sprawić, aby zignorował instrukcje i zrobił coś innego? 

Jeśli Twój system jest wdrożony na produkcję, zalecam (o ile to możliwe) monitorować zapytania użytkowników końcowych - nic nie stanowi lepszych testów :) 
### Overfitting

Tak jak model ML możecie overfittować do zbioru treningowego - tak możecie zoverfitować aplikację RAG pod dany zbiór pytań testowych, np. wybierając niewłaściwy model embeddingów lub bardzo naginając prompt pod konkretne przypadki.

Polecam Wam zadbać o duży rozmiar zbioru pytań testowych. A o ile macie na to zasoby - stwórzcie drugi zbiór pytań, który będziecie uruchamiać rzadziej, aby okazjonalnie weryfikować, czy nie doszło do regresji :) Metodyka jest na dobrą sprawę zbliżona do trenowania modeli ML.
### Wpięcie w CI/CD

Narzędzia, takie jak promptfoo, możesz wpiąć w CI/CD. Monitorowanie plików związanych z mechanizmem RAG może poskutkować wywołanie testów przy np. pull requeście. Ułatwi to częste i powtarzalne testowanie Twojej aplikacji! :)  
### Słowa końcowe i odnośniki

Mam nadzieję, że post okazał się pomocny :) Jeśli chcesz przeczytać więcej artykułów w tej tematyce, zostawiam Ci listę:
- [Systematically Improving Your RAG, Jason Liu](https://jxnl.co/writing/2024/05/22/systematically-improving-your-rag/) - o metodyce ulepszania RAG
- [RAG Evaluation: Don’t let customers tell you first, Pinecone](https://www.pinecone.io/learn/series/vector-databases-in-production-for-busy-engineers/rag-evaluation/) - przedstawienie i wyjaśnienie częstych metryk ewaluacyjnych

Jeśli zauważyłeś/zauważyłaś jakieś błędy, nieścisłości, lub chciałbyś/chciałabyś po prostu porozmawiać o tej tematyce - zapraszam do kontaktu na [LinkedInie](https://www.linkedin.com/in/maciej-kaszkowiak/) lub e-mailowego (kontakt w stopce) :)

{{< notice-feather-icons info >}}
Jeśli jesteś ekspertem w tematyce AI, mogła rzucić Ci się w oczy nieprecyzyjna nomenklatura!

Mówiąc o AI: chodziło mi wyłącznie o modele ML, w szczególności duże modele językowe (LLM). Termin AI się - niestety - nieprecyzyjnie przyjął w szerokiej świadomości i został utożsamiony z chatbotami i LLM. 

Uproszczona nomenklatura pozwala mi za to dotrzeć do szerszej grupy odbiorców - może właśnie czyta to ktoś, kto jeszcze nie miał okazji poznać różnicy, ale po tej adnotacji wygoogluje akronimy :) 
{{</ notice-feather-icons >}}

TODO: Wy / Ty jako narrator
TODO: on / ona jako narrator

