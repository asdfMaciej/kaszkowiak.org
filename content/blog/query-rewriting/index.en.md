---
title: "Query rewriting - refine user queries"
date: 2024-11-05T12:00:00+02:00
lastmod: 2026-01-19T08:00:00+02:00
summary: "What is query rewriting? Why is it useful whenever you build a chatbot? How to implement it? Read the article!"
thumbnail: "thumbnail.png"
tags: ["improve your AI", "ai", "python", "llm", "rag", "retrieval"]
---

## What is query rewriting?

**Query rewriting** is the enrichment of a user's question before passing it to the retriever in RAG.

The modified question contains the full context, which enables better search results.

### A practical example

Let's assume we created a chatbot that knows about university majors. We launch it publicly and see the first conversation:

> **User:** Hi! Are there any majors related to hairdressing available?
>
> **Assistant:** Yes! Certified Hairdressing and Hair Styling.

So far so good - but then the user asks:

> **User:** How do they differ?

Suddenly it turns out our assistant cannot answer a basic question:

> **Assistant**: I don't know!

Why? Because we didn't use query rewriting.
Our retriever tried to find documents only for the latest message - the phrase "How do they differ?".

Would you be able to find the answer to "How do they differ?" without additional context? :)
{{< gallerystart >}}
{{< img src="retriever moment.jpeg" caption="Our poor retriever trying to find documents" >}}
{{< galleryend >}}

Now let's imagine that the sentence "How do they differ" is changed to "**What is the difference between Certified Hairdressing and Hair Styling?**".

This is what query rewriting is all about. The system will now handle it because the retriever will find descriptions of the majors based on the updated, precise query :)

{{< notice-feather-icons tip >}}
If the user is communicating via chat, **it is always worth using query rewriting** in RAG.

This allows for a fully natural conversation with the assistant. The user doesn't have to struggle with providing precise terms every time and can refer to previous messages.

However: newer methods, such as agents, often don't require query rewriting. Agents are able to accurately call the retriever tool with proper context!
{{< /notice-feather-icons >}}

## How to implement it?

I will present an example in Python with comments:

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

A bit of boilerplate: loading the API key from the .env file and a function that returns the LLM response.

```python
CHAT_HISTORY = [
    {"role": "user", "content": "Are there majors related to hairdressing available?"},
    {"role": "assistant", "content": "Yes: 1. Certified Hairdressing, 2. Hair Styling"},
]
USER_QUERY = "how do they differ?"
```

Our conversation history.

```python
SYSTEM_PROMPT = "You will receive a conversation between an user and an assistant.\n"
SYSTEM_PROMPT += "Respond with an unambiguous version of the last message.\n"
SYSTEM_PROMPT += "For example, if the user was talking about planting a tree, "
SYSTEM_PROMPT += 'you might convert "how long will it take?" to "how long will it take to plant a tree?".'
```

An example system prompt that will clarify the last message based on the chat history.

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

We combine the message history with the system prompt, hit the LLM, and... done!

{{< gallerystart >}}
{{< img src="works.png" caption="It works!" >}}
{{< galleryend >}}

## Information beyond conversation history

I will present one more simple example that goes beyond just the conversation history.

Let's assume we created a chatbot that provides information about events in Poznań.

> **User:** Hi! What's happening this Saturday?
>

Knowing the context is about events, we could enrich the query:

> What **events** are taking place on Saturday?

But - we still don't know the exact date! So we can include the current date in the system prompt responsible for query rewriting:

> [...] Today's date is Wednesday, 2024-11-06. Next weekend starts on Friday, 2024-11-09. [...]

After query rewriting with the updated prompt, the previous query will be enriched with the date:

> What events are taking place on Saturday **2024-11-10**?

Such a query is now precise :)

## Final words and links

I hope this post proved helpful!

If you noticed any errors, inconsistencies, or simply would like to chat about this topic - feel free to contact me on [LinkedIn](https://www.linkedin.com/in/maciej-kaszkowiak/) or via email - contact details in the footer :)