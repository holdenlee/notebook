---
title: NLP
published: 2016-05-04
modified: 2016-05-04
tags: nlp
type: notes
showTOC: True
---

* [Notes by Mike Collins](http://www.cs.columbia.edu/~mcollins/).
* [Deep learning for NLP](http://cs224d.stanford.edu/syllabus.html)

#Language models

A language model is a probability distribution over sentences consisting of words from a finite set $\mathcal V$.

> in speech recognition the language model is combined with an acoustic model that models the pronunciation of different words: one way to think about it is that the acoustic model generates a large number of candidate sentences, together with probabilities; the language model is then used to reorder these possibilities based on how likely they are to be a sentence in the language.

A $t$th order Markov model ($n+1$-grams) assumes the probability distribution of the next word depends only on the previous $t$. To model variable-length sentences, include STOP as a word. Treat the $0,\ldots,-(t-1)$ words as $*$.

The most naive estimate is to let
$$wh p_{x_{t+1}|x_1\ldots x_t} = \fc{\#(x_1,\ldots, x_{t+1})}{\#(x_1,\ldots, x_t)}$$
but this requires lots of computations and makes many counts 0.

Let $x^{(i)}$ be the test sentences. Letting $l=\rc{M} \sumo im \lg p(x^{(i)})$ (average log probability), the **perplexity** is $2^{-l}$ (geometric mean of probabilities).

1.  **Linear interpolation** is
    $$ \wh p(x_{t+1}|x_1\cdots x_t) = \sumo i{t+1} \la_i p(x_i|x_{[1,i-1]}).$$
    Find $\amax_{\la} L(\la)$ over the development data (separate from training and test data).
2.  **Bucketing** is replacing $\la_{t+1} = \fc{\#(x_1,\ldots, x_{t+1})}{#+\ga}$, $\la_{t} = (1-\la_{t+1}) \fc{\#(x_1,\ldots, x_t)}{\#(x_1,\ldots, x_{t-1})+\ga}$,...
3.  **Discount counts** by $c^(\mathbf x) = c(\mathbf x) - \be$, $\be\in [0,1]$, let $\wh p = \fc{c^*(\cdots)}{c(\cdots)}$. Spread the missing mass evenly over those that have not appeared.
4.  **Linear interpolation with bucketing**: Let $\Pi: \mathcal V^{t} \to [K]$ depending on counts seen in the training data. Now make the smoothing parameters depend on $\Pi(u,v)$.

Note that bucketing and discounting only have 1 parameter.

#HMMs and tagging

#PCFGs

A CFG is $G=(N,\Si,R,S)$ where

* $N$ has non-terminals
* $\Si$ has terminals
* $R$ has rules $X\to Y_1\ldots, Y_n$.
* $S\in N$ is te start symbol.

A leftmost derivation is one where we choose to replace the leftmost nonterminal each time.

Strings can be ambiguous under a CFG.

Notation:

* $\mathcal T_G$ is the set of possible leftmost derivations (parse trees).
* For $t\in \mathcal T_G$, yield$(t)$ is the yield.
* $\mathcal T_G(s)$ is the set of possible parse trees for $s$.
* A sentence is ambiguous/grammatical if $|\mathcal T_G(s)|>1$ and grammatical if $>0$.

We want
* define a probability distribution $p$ on parse trees
* learn parameters
* find $\amax_{t\in \mathcal T_G(s)}p(t)$ (decoding/parsing)

A **PCFG** has probabilities with $\sum_{X\to \be\in R} a(X\to \be)=1$. The probability is the product of the probabilities of the derivations.

To learn parameters given *parse trees*, let $\wh p (\al \to \be) = \fc{\#(\al\to \be)}{\#\al}$.

**Chomsky normal form** has rules in the form $X\to Y_1Y_2$ and $X\to Y$ where $Y_1,Y_2$ are nonterminal and $Y$ is terminal.

* Parsing: The CKY algorithm is a dynamic programming algorithm. For a CFG, just keep track of possibility. For a PCFG, keep track of the max and argmax at each level.
* Finding probability: The inside-outside algorithm is a dynamic program that takes the sum at each step.

#Lexicalized PCFGs

These have much higher parsing accuracy.

Weaknesses of PCFG's are

1.  Lack of sensitivity to lexical information: PCFGs make a strong independence assumption. The identity of each lexical item depends only on the part-of-speech (POS) above that lexical item, but does not depend directly on other information in the tree.

    Example: Workers dumped sacks into a bin. What parsing is picked depends only on comparing $q(VP\to VP,PP), q(NP\to NP, PP)$.

	`Into` is 9 times more likely to attach to a VP rather than NP.

	Example (coordination ambiguity): Dogs in houses and cats.
2.  Lack of sensitivity to structural preferences.

	Ex. President of a company in Africa.

	President of a (company in Africa) is *close attachment*. Close attachment is twice as frequent.

	When a PP can attach to 2 potential verbs, it is 20 times more likely to attach to the most recent verb.

To lexicalize a treebank,

* label terminal words with lexical information (POS).
* For each $X\to Y_1\ldots Y_n$ identify $h\in [n]$ the head of the rule, the most important child. (In CNF, $n=2$.) Do this recursively to get a word associated with the POS. Now label the POS with that word. (See p. 12 for an example.) Write $\to_h$ to specify that the $h$th child is the head.
* Overline the heads.

Thus, each node in the parse tree is now POS(word). Note the number of non-terminals is now much larger.

For a rule $X(H) \to_2 Y_1(M) Y_2(H)$ corresponding to $R:X\to_2 Y_1Y_2$, factor the probability
$$\Pj(X\to_2 Y_1Y_2, M|X, H) = \Pj(X \to_2 Y_1Y_2 |X, H) \Pj(M|S\to_2 Y_1Y_2, X, H)$$
and estimate each of the factors with counts.

* For $\Pj(X \to_2 Y_1Y_2 |X, H)$, estimate by linearly interpolating $\wh p(X\to_2 Y_1Y_2|X)$ and $\wh p(X\to_2 Y_1Y_2|X,H)$.
* For the other model, linearly interpolate $M|R,H$ and $M|R$.

For DP, include also the head position $h\in [i,j]$. Complexity goes up to $O(n^4)$!

#IBM

#6

#7 Log-linear models

Log-linear models are more flexible; they allow a rich set of features. We can combine a much larger set of estimates with $\la$ parameters. Linear interpolation becomes unwieldy.

We want to model the conditional probability $p(y|x)$, $x\in \mathcal X$, $y\in \mathcal Y$. 
For example, $\mathcal Y=\mathcal V$, $\mathcal X = \mathcal Y^{i-1}$. Or $\mathcal Y=\mathcal T$, the set of tags.

A loglinear model has
$$\Pj_v(y|x) =\Pj(y|x;v) \propto e^{v\cdot f(x,y)}$$
with $f:\mathcal X\times \mathcal Y\to \R^d$.

Often features are indicator functions. Features can include all bigrams, trigrams... Other features include

* skip-grams (skip words)
* part-of-speech of previous word(s)
* suffixes, etc.

A key idea is **feature templates**.

For any trigram *seen in training data*, create an indicator feature. Hash each $(u,v,w)$ to a unique integer (for trigrams). We can do the same for suffixes, etc.

Models can have millions of features.

Key observation: for any pair $(x,y)$, the number of values for $k$ in $[d]$ such that $f_k(x,y)=1$ is often very small.

Implementation: for any pair $(x,y)$, compute indices of nonzero features (ex. use hash functions).

ML estimates are bad because they overfit---ex. give 0 probability to $n$-grams that haven't appeared. Include a regularization term like $\ve{v}^2$,
$$L(v) = \sumo in \ln p(y^{(i)}|x^{(i)};v) - \fc\la2\ve{v}^2.$$
This is convex. Use gradient ascent. LBFGs is a gradient method that makes a more intelligent choice of search direction.

The gradient is
$$\nb L(v) = \sumo in \pa{f(x^{(i)},y^{(i)}) - (p(y|x^{(i)};v))_{y} \cdot (f_k(x^{(i)},y))_{yk}}.$$
(Think of the second part as the expected number of times $f_k$ is equal to 1.)

#MEMMs (Maximum entropy Markov models = Log-linear tagging models)

A generative tagging model defines a joint distribution $p(x_1,\ldots, x_n,y_1,\ldots, y_n)$ where $x_i$ is a sentence tagged with $y_i$. A **conditional tagging model** defines $p(y_1\ldots, y_n|x_1,\ldots, x_n)$.

Tag by taking the argmax.

1. How to define a conditional tagging model?
2. How to estimate the parameters?
3. How to find argmax?

Consider trigrams for example. The independence assumption is that conditioned on $X_{[1,n]}$, the distribution of $Y_i$ depends only on $Y_{i-1},Y_{i-2}$.

1.  Let the $i$th history $h_i=(y_{i-2},y_{i-1},x_{[1,n]}, i)$. Let $f:H\times \mathcal K\to \R^d$ be the feature-vector representation ($H$ is the space of histories and $\mathcal K$ is the space of tags). Define the probability as a loglinear model on $f$.

    Features may include
	* Word/tag
	* Prefix, suffix (Ex. -ing is often with VBG, gerunds)
	* $n$-gram (on $y$) (Having $i$-grams for $1\le i\le n$ is useful with regularized approaches to parameter estimation)
	* Word before/after
	* Spelling features
	* Contextual features ($x_{i-2},x_{i+2}$)
	
2. Use gradient methods.
3. Use the Viterbi algorithm.

#CRFs

> There are close connections to support vector machines, where linear models are
> learned in very high dimensional spaces, with good generalization guarantees hold
> as long as the margins on training examples are large. Margins are closely related
> to norms of parameter vectors.

#Scraps

Can we extract simple features/algorithms out of neural nets?

Extracting code from a neural net may be NP-hard?

Can a neural net do at least as well as $n$-gram, and can you crystallize a $n$-gram from it?

What information is present in memory?

Allow a neural net to revise, or wait before it outputs...

Matrix indexed by Indexable.

*   [KJF14] Deep Fragment Embeddings for bidirectional sentence mapping:
    > Inspired
    > by previous work [5, 22] we observe that a dependency tree of a sentence provides a rich set of
	> typed relationships that can serve this purpose more effectively than individual words or bigrams.
	> We discard the tree structure in favor of a simpler model and interpret each relation (edge) as an
	> individual sentence fragment (Figure 2, right shows 5 example dependency relations)