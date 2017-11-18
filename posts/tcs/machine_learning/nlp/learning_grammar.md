---
title: Learning grammar
published: 2017-10-04
modified: 2017-10-04
tags: nlp
type: paper
showTOC: True
---

See also

* Weekly summary [2017-09-09](posts/summaries/2017-09-09.html)
* [Percy Liang](percy_liang.html)
* [Language games](language_games.html)
* [IO algorithm](nlp.html#io-algorithm)

# Code

[Naturalizing PL](https://worksheets.codalab.org/worksheets/0xbf8f4f5b42e54eba9921f7654b3c5c5d/)

## My code

* [Blocks grammar](https://github.com/holdenlee/Blocks)
* [Learn grammar](https://github.com/holdenlee/learn-grammar)
* [Math grammar](https://github.com/holdenlee/MathGrammar)
	
# Previous work on grammar

* [TH] Unsupervised learning of probabilistic context-free grammar using iterative biclustering
* [CTC] Automatic Learning of Context-Free Grammar
* Chris Manning's notes [Inside-outside](http://www.cs.columbia.edu/~mcollins/io.pdf)
* Spectral approaches (knowing CFG)
* [Unification](https://www.uio.no/studier/emner/matnat/ifi/INF2820/v12/undervisningsmateriale/unification.pdf) (?)

# Conversations

## PCFG

* it's not so easy - adding the minimum number of rules often results in the wrong rules
* [Greedy] doesn't really work
* for example, suppose you have sentences NV (noun verb) and NVN (noun verb noun, i.e., subject verb object)
* it would learn S->NV from the first and then V->VN from the second.
* but this isn't right because the second rule can give V->VN->VNN->VNNN...
* the right thing would be to have a VP (verb phrase), and S -> N VP, VP-> V N, but this is an extra symbol it would have to come up with
* I wonder what would happen if I threw in all possible rules for a PCFG and then just did gradient descent on the probabilities. Ex. if I have 10 symbols then to get all rules A->BC I would need 1000 parameters. It would be doable (though it wouldn't scale well) to keep all of them.
* having more symbols than required is like overparametrization, which helps avoid local minima when doing gradient descent
* rn it seems like it will always be possible to generate ungrammatical things; either that or you will have poor rule diversity
* yeah we really want to not have ungrammatical things
maybe a lot of rules will have probability close to 0 and we can remove them
* also I just realized that HMMs are a special case of PCFGs (hidden) -> (observed) (hidden) so maybe the right thing to do is some kind of EM algorithm?

## Sentence transformations

* WH-movement is the way you transform sentences into questions. "You want x." -> "What do you want []" where x disappears and leaves a hole.
* The CFG doesn't capture very well what's going on because it's better thought of as a transformation of the whole sentence
* anyway I'm pretty sure you can also model that with a CFG, it would just have a longer description length than our intuitive notion of what's going on

# Talk with Sida (10-4)

Some notes:

* It would be interesting to formally compare using a CCG parser to using a floating parser on a benchmark task. (The first is really learning a grammar and mapping to logical forms, while the second is doing a search over logical forms and scoring based on features. The first is probably more complex to get working. The second suffers from an exponential explosion of logical forms.)
* Building a system that could give grammatical utterances (ex. give commands to the user in SHRDLURN) is a good goal.
* Sida is working on a system for data visualization that can take commands in natural language; it learns by demonstration. 
