---
title: Combinatory Categorial Grammar
subtitle: How we all speak in functions
published: 2018-01-01
modified: 2018-01-01
tags: language, grammar, CCG, NLP
showTOC: True
inline: True
---

[googledoc](https://docs.google.com/document/d/1fOOnfYQRWUgvEHg_vI9S9J2Nc2_RJprNwvyhAeClkXM/edit)
[code](https://github.com/holdenlee/learn-grammar )

# Todo

* Read papers.
* Implement "identity"
* Implement prepositional phrases.
* Think about higher-level functions, or less exact matches with AST (like lambda x: f(x,c)). cf. nouns as functions/filters.
* SHAPES/CLEVR: import data, make AST, try it.

# Blog post

(Background: it will help to know about functions in programming, and grammar, ex. CFG's.)

[DL](https://dynalist.io/d/80BlcNrzxATvu5wf__C99MZe#z=E-IW9yTDg90oQYxVhl6-PR3k)

We're doing functional programming every day in our natural speech without thinking about it. 

Combinatory categorial grammar is one view of grammar that looks at parts of speech not just as tags but as "types", like the kind of types you get in programming languages, including function types.

If you're not familiar with functional programming, don't worry. "Function" here means the same as it does in math: something that takes input(s) and gives an output. A given function can't just take *any* input - it has to take input of a given "type". 

I will give a very simplified account of CCG's, and touch on some subtleties and give references at the end.

# Example: Math grammar

Math is a good playground for thinking of parsing natural language, because every math statement has a well-defined logical form associated with it. In contrast, it's not clear what a "logical representation" of a arbitrary sentence such as "Carefully put the bag on the table" is. 

So let's jump right in with some math expressions. Our goal is to formalize a notion of grammar that we can use to program a computer to parse a sentence into a logical form.

With this goal in mind, let's look at some expressions.

[MathGrammar](https://github.com/holdenlee/MathGrammar)

> even prime number

What does this mean? It means that we take the set of all numbers (here "number" means "natural number"), *filter* it for prime numbers, and then *filter* that for even numbers. "Even" and "prime" are adjectives, but here it makes sense to think of them as *functions* `Number -> Boolean`. `Even` consumes a number as input and returns `True` if it is even and `False` otherwise. So this is saying 

```
filter isEven (filter isPrime) [1..]
```

What about this?

> smallest even number that is greater than 6

# English

Let's consider sentences built up of nouns, verbs, and adjectives. Instead of "parts of speech", we'll talk about "types" (or "categories"). One of the types will be `NP` for Noun (Phrase), and another will be `S` for sentence.

How do verbs and adjectives fit in?

(We want the types to *carry the information* about how the words and phrases combine. In a CFG, the grammar is defined by rules such as `S -> NP VP`. In a CCG, once we say how individual words and phrases parse, the rest is taken care of - i.e. we only need to specify the terminal rules and the rest is determined.)

Well, an adjective takes a noun (phrase) as input, and the output is still a noun phrase, so we can think of it as a function `NP->NP`.

In CCG's, this is represented as the type `NP/NP`. This means that it takes a `NP` argument from the right and returns a `NP`.

The function application rules in a CCG are:

1. `A/B:f B:x` becomes `A:f(x)`.
1. `B:x A\B:f` becomes `A:f(x)`.

Verbs have more variety - they aren't all the same type. First consider an intransitive verb. If we give it a subject (on the left), then it becomes a complete sentence. So the type is `S\NP`. 

$$
\ub{\text{I}}{\text{NP}}\, \ub{\text{sleep}}{\text{S\NP}}.
$$

Now a transitive verb takes an object on the right and a subject to the left.

$$
\ub{\text{I}}{\text{NP}}\,\ub{\text{eat}}{\text{(S\NP)/NP}}\,\ub{\text{artichokes}}{\text{NP}}
\implies
\ub{\text{I}}{\text{NP}}\, \ub{\text{eat artichokes}}{\text{S\NP}}.
$$

Some verbs like `give` take both direct and indirect objects: "I give him flowers." What would the type be? It has 3 arguments.

(Bonus question: can you think of an English verb which can be thought of as having 4 arguments (without needing any prepositions)? Answer[^ans])

[^ans]: "bet" as in "I bet you five dollars she'll win." Here, `bet : ((((S\NP)/S)/NP)/NP)`

## More on multiple arguments, and prepositions

You may ask: why does "eat" consume the object first, before the subject? (No pun intended.) It seems that there's a kind of symmetry here: we should allow "eat" to either consume the subject or the object first. Consider the sentences:

> I cook food and eat it.
> 
> I cook and Ben eats food.

In the first sentence we want "cook food" to parse as `S\NP`; it combines with another `S\NP` (eat it) to be a single `S\NP`. 
In the second sentence we want "I cook" to parse as `S/NP`; it combines with another such to be a single `S/NP`, and then consumes `food`. (Note "and" effectively functions as `((*\*)/*)` where `*` is any type, like NP.)

There is another rule called lifting [?] which takes care of this, though I wonder if things could be simplified by introducing "symmetric" arugments.

There are cases when it is NOT symmetric. For example, we can't flip the two arguments in an intransitive verb.

> I give him flowers.
> 
> *I give flowers him.

However, if we use prepositions we are more free to order the arguments.

> I give flowers to him.

Many verbs also have optional prepositional phrases to go with them - they're like named optional arguments. You could imagine a more elaborate grammar which takes into account prepositional phrases. See (ref) for details; we'll jkeep it simple.

### Aside: other languages

Lojban is a constructed language that aims to be logical by thinking of verbs *as* functions taking a set number of arguments. However, I think that it doesn't do this correctly. Lojban is missing prepositions - or rather, it has prepositions, but the prepositions just mark the location of the arguments (so you can reorder them), not their purpose (ex. prepositions like "to" are reused between many phrases, but has a certain set of meanings). This means there's a lot of memorization involved.

On the other hand, Japanese is a very logical language when it comes to prepositions (particles). Pretty much everything is marked by prepositions.

# What else to say?

* The lambda terms.
* Building the blocks world language. To make things simple, I'll let the types match exactly the types in the logical expression. (Although you can put it in the same framework, for example, `Act` is `S` here, you can think of `Set` and `Color` as subtypes of `NP`, etc.)
	* Ex. `Add : (Act/Set)/Color`.
* Math example (take from Percy Liang paper)
	* If you can say math language, you know the basics of functional programming...
* An overview of ZC, and learning CCG's.
* List of papers.