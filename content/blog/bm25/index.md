---
title: "BM25: wyszukiwanie po słowach kluczowych"
date: 2024-09-24T00:00:00+02:00
lastmod: 2024-09-24T00:00:00+02:00
summary: "Jak dobrze wdrożyć BM25 w języku polskim? - poznaj problemy, rozwiązania i realne przykłady 🚀"
thumbnail: "placeholder.jpg"
draft: true
tags: ["ulepsz swoje AI", "ai", "python", "nlp", "rag", "retrieval"]
hidethumbnail: 1
---

# Co to BM25?

BM25 to funkcja, która punktuje dopasowanie dokumentów do zapytania użytkownika. Jeśli słowa w zapytaniu znajdują się w dokumencie, to dokument otrzyma punkty. 

BM25 jest domyślnym algorytmem ElasticSearch ([src](https://www.elastic.co/blog/practical-bm25-part-2-the-bm25-algorithm-and-its-variables)) - to chyba najlepszy dowód, że algorytm jest praktyczny :)

## Wykorzystanie

BM25 przyda się wszędzie tam, gdzie potrzebujemy wyszukiwanie po słowach kluczowych. 

Przykładowo: jest szeroko wykorzystywane w [aplikacjach RAG](/blog/retrieval-augmented-generation) jako element wyszukiwania hybrydowego. 

{{< notice-feather-icons info >}}
Wyszukiwanie hybrydowe to połączenie wyszukiwania semantycznego, [opartego na embeddingach](#todo), oraz wyszukiwania po słowach kluczowych, jak np. BM25. To łączy zalety obu rozwiązań:

- wyszukiwanie semantyczne jest w stanie znaleźć synonimy, zdania o podobnym znaczeniu, czy nawet w innym języku;
- wyszukiwanie po słowach kluczowych potrafi znaleźć zdania z niecodziennymi słowami, akronimami czy odwołujące się do niespotykanych wcześniej fraz. 

Połączenie np. 3 najlepszych wyników z wyszukiwania semantycznego i 3 najlepszych z BM25, pozwala nam przeważnie osiągnąć znacznie lepsze wyniki niż 6 wyników z pojedynczej metody.
{{</ notice-feather-icons >}}

Zrozumienie mechanizmu działania oraz sztuczek związanych z implementacją staje się niezwykle przydatne - w szczególności dla języka polskiego!

### Jak działa BM25?

Algorytm analizuje częstość występowania poszczególnych słów kluczowych w zbiorze dokumentów.   

Dokładny wzór i bardziej formalny opis [znajduje się na Wikipedii](https://en.wikipedia.org/wiki/Okapi_BM25) - jednak ważniejsze jest zrozumienie mechanizmu:

### Najważniejsze zasady działania

Dokumenty oraz zapytania w pierwszej kolejności dzielone są na termy - przyjmijmy, że po prostu na słowa.

Im rzadziej dopasowane słowa występują w dokumentach, tym bardziej będą punktowane: 
- Jeśli np. przeszukujemy zasoby księgarni, to dla zapytania "książka eklektyzm", dopasowania do rzadziej występującego słowo "eklektyzm" będą bardziej punktowane niż do słowa "książka".
- Pospolite słowa będą znacznie mniej punktowane: np. w zdaniu "*co na* **obiad**", dopasowanie do "*co* wrzucić *na* grilla" będzie znacznie słabsze niż "pomysły na **obiad**" 

Im słowo częściej będzie występowało w dokumencie, tym dokument otrzyma większą liczbę punktów. Dzięki temu, dla zapytania "kot" będzie bardziej punktowany artykuł o kotach, niż encyklopedia wymieniajaca wszystkie zwierzęta. 

Algorytm uwzględnia długość dokumentów, więc 1-stronicowy dokument z 1 dopasowaniem może otrzymać większą liczbę punktów niż 100-stronicowy dokument z 3 dopasowaniami. Liczy się gęstość dopasowań w tekście.  

BM25 ignoruje również względną pozycję słów w dokumencie - zdanie "**czerwony** notatnik, czarny **słoń**" będzie miało identyczne dopasowanie do zdania "**czerwony słoń** był zły", co zdanie "gdzie jest **czerwony słoń**?". Każde słowo jest rozpatrywane indywidualnie.

## Pre-processing

BM25 dla skutecznego działania wymaga pre-processingu danych wejściowych. Przedstawię na przykładach istotne kroki:

#### Lowercasing 

BM25 przy domyślnej tokenizacji (dzielimy zdania na słowa i tyle) będzie rozróżniał pomiędzy dużymi a małymi znakami.  **Token "Czerwony" nie będzie powiązany z tokenem "czerwony".** 

Czy to jest pożądane? W większości przypadków nie, więc **zamiana zdania na małe znaki (*lowercasing*) wyeliminuje ten problem**. Jednak jeśli Wasza aplikacja np. operuje na kodach seryjnych, które rozróżniają małe i duże znaki, i chcielibyście umożliwić ich precyzyjne wyszukiwanie, to wprowadzenie takiego kroku mogłoby pogorszyć Wasze wyniki! 

Stąd zawsze warto się zastanowić: czy chcemy wprowadzić pre-processing?     

```python
# Przed zmianami
documents = ["Słońce jest zielone"]
query = "Jakiego koloru jest słońce"
search_bm25(documents, query) == []

# Po zmianach
documents = ["słońce jest zielone"]
query = "jakiego koloru jest słońce"
search_bm25(documents, query) == ["słońce jest zielone"] # match na słowie słońce
```

{{< notice-feather-icons note >}}
Zauważcie, że dane wejściowe muszą być przetworzone w identyczny sposób, co dane dokumentów w indeksie. Jeśli np. chcemy usunąć polskie znaki - to musimy to robić zarówno dla zapytania użytkownika, jak i dokumentów. To tyczy się każdego kroku.
{{</ notice-feather-icons >}}

### Usuwanie stopwordów

{{< notice-feather-icons info >}}
Stopwordy to słowa powszechnie występujące w danym języku, na przykład: "to", "w", "jak", "z", "na".
{{</ notice-feather-icons >}}

Usuwanie stopwordów sprawia, że najczęściej występujące słowa w danym języku zostaną usunięte: 

```python
remove_stopwords("jaka jest pogoda dzisiaj?") == "pogoda dzisiaj?"
remove_stopwords("pies jest bardzo szczęśliwy") == "pies szczęśliwy"
```

 Po usunięciu stopwordów, "jaka **jest** pogoda dzisiaj?" nie zostanie dopasowane do zdania "pies **jest** bardzo szczęśliwy" - usunęliśmy wspólny mianownik "jest".

Nie istnieje *uniwersalna* lista stopwordów - podlinkuję [przykładową listę dla języka polskiego](https://github.com/bieli/stopwords/blob/master/polish.stopwords.txt). 

#### Problematyka

Usuwanie stopwordów ma swoje problemy:

1. Stopwordy różnią się w zależności od języka. Gdybyśmy wykorzystali angielską listę stopwordów w polskim zapytaniu do wyszukiwarki, to nie moglibyśmy znaleźć informacji o mostach - bowiem "most" to angielski stopword! Oznacza to, że jeśli tworzymy indeks BM25 operujący na kilku językach, to **musimy poprawnie zidentyfikować język** przed doborem odpowiedniej listy. 
2. Stopwordy mogą mieć znaczenie semantyczne w zdaniu - mówiąc o "The Rock", chodzi nam o amerykańskiego aktora; mówiąc o "rock", chodzi nam o kamienie.  

Zwrócę również uwagę, że usuwanie stopwordów nie jest w 100% konieczne przy BM25. Algorytm wyżej punktuje unikalne słowa, więc przy dostatecznie dużej liczbie dokumentów, powszechnie występujące stopwordy powinny być punktowane w niewielkim stopniu. Oznacza to w teorii, że trafimy na niewłaściwe dopasowania, ale o słabej punktacji.

Jak ze wszystkimi krokami: wprowadźcie takie przetwarzanie dla swojego datasetu i **przetestujcie czy i jak wpłynęło na wyniki** :) 

#### Stemming i lematyzacja

Kluczowy problem - dla BM25, "pies", "psy" oraz "psach" to 3 różne słowa! Rozpatrzmy następujące zdania:
- "kleszcz na psie"
- "poradnik: zwalczanie kleszczy u Twojego psa"

Zdania nie zostaną dopasowane - "kleszcz" to nie "kleszczy", a "psie" to nie "psa". 

Dwie metody, które mogą rozwiązać ten problem, to stemming i lematyzacja.

**Stemming** polega na wydobyciu ze słowa rdzenia, czyli obcięcie końcówki fleksyjnej. Wynikiem nie jest poprawne słowo:

```python
stemmer('teraz') == 'teraz'
stemmer('przeszywająco') == 'przeszywa'
stemmer('krzyczała') == 'krzy'
stemmer('kobiety') == 'kobiet'
stemmer('kobietom') == 'kobiet'
stemmer('kobieta') == 'kobiet'
``` 

**Lematyzacja** polega na wydobyciu formy podstawowej, czyli np. bezokolicznika dla czasowników czy liczby pojedynczej rzeczownika:

```python
lemmatization('teraz') == 'teraz'
lemmatization('przeszywająco') == 'przeszywać'
lemmatization('krzyczała') == 'krzyczeć'
lemmatization('kobiety') == 'kobieta'
```

Lematyzacja jest bardziej zasobożerna od stemmingu, jednak przeważnie osiąga lepsze wyniki. Dla języka polskiego możemy zastosować m.in. [PoLemma](https://huggingface.co/amu-cai/polemma-large) do lematyzacji oraz [Stempel](https://github.com/dzieciou/pystempel) do stemmingu.

Wracając do przykładu - po zastosowaniu lematyzacji, nasz algorytm BM25 będzie w stanie dopasować zdania:
- "kleszcz na psie" > "**kleszcz** na **pies**"
- "poradnik: zwalczanie kleszczy u Twojego psa" > "poradnik: zwalczyć **kleszcz** u twój **pies**"

#### Polskie znaki, interpunkcja

Wspomnę również o tym, że w pre-processingu możemy usuwać polskie znaki, co wyeliminuje niedopasowania pomiędzy "zażółć gęślą jaźń" a "zazolc gesla jazn". Jednak - jeśli dodamy ten krok przetwarzania, to słowo "łoś" zacznie być powiązane z loteryjnym "los". Coś za coś!

{{< img src="bralczyk.jpg" caption="Tematyczny boomerski żarcik">}}

#### Literówki i synonimy

BM25 nie powiąże słowa "pies" z słowem "peis"; nie powiąże również słowa "auto" ze słowem "samochód".

Na moment pisania artykułu nie znam rozwiązania ;) Dla synonimów może się przydać [wyszukiwanie semantyczne](/blog/embeddingi), ale to nie jest stricte BM25.

### Implementacja BM25 

#### Jak stworzyć indeks BM25?

BM25 ma wiele implementacji w Pythonie, w szczególności:
- [rank-bm25](https://pypi.org/project/rank-bm25/) jest najbardziej popularną, ale nie jest najlepsza;
- znacznie lepszym wyborem będzie [bm25s](https://github.com/xhluca/bm25s), która jest kilkaset razy szybsza od `rank-bm25` i wspiera m.in. zapisywanie indeksu w memory-mapped plikach

Alternatywnie możemy zastosować bazy danych - osobiście polecam [ParadeDB](https://www.paradedb.com/), które jest Postgresem z doinstalowanym rozszerzeniem `pg_search`, które umożliwia [indeksowanie BM25](https://docs.paradedb.com/documentation/full-text/scoring) na kolumnie tekstowej. Rozszerzenie również [umożliwia bardziej skomplikowane zapytania](https://docs.paradedb.com/api-reference/full-text/overview). Projekt jest objęty licencją AGPL v3.0. 

Alternatywy, których osobiście nie testowałem, to [ElasticSearch](https://www.elastic.co/blog/practical-bm25-part-1-how-shards-affect-relevance-scoring-in-elasticsearch) oraz [Weaviate](https://weaviate.io/developers/weaviate/search/bm25).

{{< notice-feather-icons tip >}}
Jeśli wybrana przez Was baza/rozwiązanie nie wspiera odpowiedniego pre-processingu, zaimplementujcie je po stronie aplikacji i przekazujcie do indeksu BM25 już przetworzone dokumenty.  
{{</ notice-feather-icons >}}

#### Benchmark 

Przed rozpoczęciem pracy [powinieneś stworzyć benchmark trafności](#todo) Twojej wyszukiwarki, z wybranymi metrykami, np. recall@3 / recall@5.  To umożliwi Wam ustalić, czy wprowadzone zmiany polepszają, czy pogarszają jakość Waszej aplikacji - nie wierzcie intuicji!

```python
recall_a = test_recall_bm25_bez_preprocessingu(test_set)
# 85%
recall_b = test_recall_bm25_z_niestosownym_preprocessingiem(test_set)
# 67%

# Recall może się pogorszyć!
```
### Reading list

- [Better Sparse Retrieval: Extending BM25 With Subwords, Evan Harris](https://medium.com/@emitchellh/extending-bm25-with-subwords-30b334728ebd) - artykuł przedstawiający ulepszenia do BM25, z konceptem wykorzystania tiktoken jako alternatywę do stemmingu;
-  [Understanding TF-IDF and BM-25, Rudi Seitz](https://kmwllc.com/index.php/2020/03/20/understanding-tf-idf-and-bm-25/) - świetne wytłumaczenie różnic między TF/IDF a BM25;
- [Polish NLP Resources, Sławomir Dadas](https://github.com/sdadas/polish-nlp-resources/), lista zasobów NLP w języku polskim
- [Stop Stopping](https://vectara.com/blog/stop-stopping/) - o usuwaniu stopwordów
- [Czym jest NLP?](https://pogromcykodu.pl/czym-jest-nlp/) - źródło przykładów dla stemming vs lematyzacja
- [What Are Stemming and Lemmatization?, IBM](https://www.ibm.com/topics/stemming-lemmatization) - stemming vs lematyzacja

TODO: napraw linki (todo)
TODO: ty/wy
TODO: ona/on