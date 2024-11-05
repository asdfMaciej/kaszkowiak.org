---
title: "Query rewriting - doprecyzuj zapytania użytkowników"
date: 2024-11-05T12:00:00+02:00
lastmod: 2024-11-05T12:00:00+02:00
summary: "Czym jest query rewriting? Dlaczego przyda Ci się zawsze, gdy tworzysz chatbota? Jak to wdrożyć? Przeczytaj w artykule!"
thumbnail: "thumbnail.png"
tags: ["ulepsz swoje AI", "ai", "python", "llm", "rag", "retrieval"]
---

Artykuł jest skierowany dla każdej osoby pracującej z AI. Jeśli dopiero zaczynasz, polecam wytłumaczenie [co to LLM i RAG](/blog/retrieval-augmented-generation) 🚀

## Czym jest query rewriting?

**Query rewriting** to wzbogacenie pytania użytkownika przed przekazaniem go do wyszukiwarki (retrievera) w RAG. 

Zmodyfikowane pytanie zawiera pełny kontekst, co umożliwia uzyskanie lepszych wyników wyszukiwania.

### Praktyczny przykład

Przyjmijmy, że stworzyliśmy chatbota, który zna kierunki studiów. Uruchamiamy go publicznie i widzimy pierwszą rozmowę:

> **Użytkownik:** Cześć! Czy są dostępne kierunki związane z fryzjerstwem?
>
> **Asystent:** Tak! Fryzjerstwo z certyfikatem oraz stylizacja fryzur.

Póki co wszystko dobrze - ale wtem użytkownik pyta:

> **Użytkownik:** Czym się różnią?

Nagle się okazuje, że nasz asystent nie potrafi odpowiedzieć na podstawowe pytanie:

> **Asystent**: Nie wiem!

Dlaczego? Ponieważ nie zastosowaliśmy query rewritingu.
Nasz retriever próbował znaleźć dokumenty dla hasła "Czym się różnią?". 

Bylibyście w stanie znaleźć odpowiedź na "Czym się różnią?" bez dodatkowego kontekstu? :)
{{< gallerystart >}}
{{< img src="retriever moment.jpeg" caption="Retriever próbujący znaleźć dokumenty" >}}
{{< galleryend >}}

Teraz wyobraźmy sobie, że zdanie "Czym się różnią" zostaje zamienione na zdanie "**Czym się różnią kierunki fryzjerstwo z certyfikatem a stylizacja fryzur**?".

Na tym właśnie polega query rewriting. System już sobie poradzi, ponieważ retriever znajdzie opisy kierunków na podstawie zaktualizowanego precyzyjnego zapytania :)

{{< notice-feather-icons tip >}}
Jeśli użytkownik rozmawia w formie chatu, **zawsze warto zastosować query rewriting**. 

Umożliwia to w pełni naturalną rozmowę z asystentem. Użytkownik nie musi kombinować z podawaniem precyzyjnych określeń i może się odwoływać do wcześniejszych wiadomości.
{{< /notice-feather-icons >}}

## Jak to wdrożyć?

Przedstawię przykład w Pythonie z komentarzami:

```python
import openai
from dotenv import load_dotenv

load_dotenv()
openai_client = openai.OpenAI()

def call_llm(messages: list) -> str:
    chat_completion = openai_client.chat.completions.create(
        messages=messages,
        model='gpt-4o-mini',
        temperature=0.2
    )

    return chat_completion.choices[0].message.content
```

Odrobina boilerplate, czyli załadowanie klucza API z pliku .env oraz funkcja, która zwróci nam odpowiedź LLM.

```python
CHAT_HISTORY = [
    {"role": "user", "content": "Czy są dostępne kierunki związane z fryzjerstwem?"},
    {"role": "assistant", "content": "Tak: 1. Fryzjerstwo z certyfikatem, 2. Stylizacja fryzur"},
]
USER_QUERY = "czym się różnią?"
```

Nasza historia rozmowy.


```python
SYSTEM_PROMPT = "You will receive a conversation between an user and an assistant.\n"
SYSTEM_PROMPT += "Respond with an unambiguous version of the last message.\n"
SYSTEM_PROMPT += "For example, if the user was talking about planting a tree, "
SYSTEM_PROMPT += 'you might convert "how long will it take?" to "how long will it take to plant a tree?".'
```

Przykładowy system prompt, który doprecyzuje nam ostatnią wiadomość na podstawie historii czatu.

```python
LLM_MESSAGES = [
    {"role": "system", "content": SYSTEM_PROMPT},
    *CHAT_HISTORY,
    {"role": "user", "content": USER_QUERY}
]

rewritten_query = call_llm(LLM_MESSAGES)
print(f"Previous query: {USER_QUERY}")
print(f"Rewritten query: {rewritten_query}")
```

Łączymy historię wiadomości z system promptem, uderzamy do LLMa, i... gotowe!

{{< gallerystart >}}
{{< img src="works.png" caption="Działa!" >}}
{{< galleryend >}}

## Informacje poza historią rozmowy

Przedstawię jeszcze prosty przykład, który wykracza poza samą historię rozmowy.

Przyjmijmy, że stworzyliśmy chatbota, który udziela informacji o imprezach w Poznaniu.

> **Użytkownik:** Cześć! Co dzieje się w tą sobotę?
>  

Mając kontekst, że to zapytanie o imprezy, moglibyśmy je wzbogacić o kontekst:

> Jakie **imprezy** odbywają się w sobotę?

Ale - nadal nie znamy dokładnej daty! Możemy więc umieścić aktualną datę w system prompcie odpowiedzialnym za query rewriting:

> [...] Today's date is Wednesday, 2024-11-06. Next weekend starts on Friday, 2024-11-09. [...]

Po query rewritingu z zaktualizowanym promptem, wcześniejsze zapytanie będzie wzbogacone o datę:

> Jakie imprezy odbywają się w sobotę **2024-11-10**?

Takie zapytanie już jest precyzyjne :)

## Słowa końcowe i odnośniki

Mam nadzieję, że post okazał się pomocny!

Jeśli zauważył\*ś jakieś błędy, nieścisłości, lub chciał\*byś po prostu porozmawiać o tej tematyce - zapraszam do kontaktu na [LinkedInie](https://www.linkedin.com/in/maciej-kaszkowiak/) lub e-mailowego - kontakt w stopce :)

