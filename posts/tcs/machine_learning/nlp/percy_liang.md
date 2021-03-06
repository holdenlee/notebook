---
title: Percy Liang's papers
published: 2016-05-04
modified: 2016-05-04
tags: nlp
type: paper
showTOC: True
---

# [L16] Learning Executable Semantic Parsers for Natural Language Understanding

Goal: Map natural language into logical forms (which can be executed).

We must use *logic* and *statistics/machine learning*. Early systems were very rule-based (hand-crafted); we want to use ML to learn without hand-crated rules.

The field is called **statistical semantic parsing**.

Two ideas:

* Model theory: expressions are symbols which obtain meaning only from execution with respect to a model.
* Compositionality: Denotation of an expression is defined recursively in terms of denotations of subexpressions.

Recent developments:

* Previous work relies on having annotated logical forms. Now works rely on weak supervision (just answers).
* Scaling up from a specific domain (e.g. geography) to larger domains (with Freebase, etc.).

There are linguistic, statistical (generalization), and computational challenges.

## Framework

Example: What is the largest prime less than 10? becomes $\max(\text{primes}\cap (-\iy,10))$.

5 components

* Executor---first-order logic with lambda calculus. Use lambda DCS, which eliminates variables, giving a good interface to NL. "A `x` that satisfies blah" is $\la x. blah(x)$---lift functions to truth values.
* Grammar
* Model (distribution over derivations)---loglinear model
* Parser (search for high probability derivations)---agenda-based parsing, uses beam search. (Can't use DP because we need to add constraint that the execution is correct?)
* Learner (estimate parameters/rules)

Note the grammar can be coarse, and application-specific.

## Qs

Chart parsing? Builds derivations in fixed order, causing parser to waste resources.


# [BL15] Imitation learning of agenda-based semantic parsers

# [WBL15] Building a Semantic Parser Overnight

Use a simple grammar to generate logical forms paired with canonical utterances. Then use crowdsourcing to paraphrase them into natural utterances, and train (natural utterances, logical forms). 

(This means we don't have to start with data to train on!)


# Scraps

Look at CCG, it's interesting! Number less than...
