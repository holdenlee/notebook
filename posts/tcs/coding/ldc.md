---
title: LDCs
published: 2016-03-03
modified: 2016-03-03
tags: LDC
type: notes
showTOC: True
---

#Previous work

##Lower bounds

##Upper bounds (construction)

A matching vector family in $(\Z/(p-1))^m$ of size $n$ gives a $(p-1)$-query LDC $(\Z/(p-1))^m \to (\Z/(p-1))^m$. There is also a trick to reduce the number of queries (e.g. to 3).

Construction: Given $(v_i)$, the encoding is
$$(a_i)\mapsto f=\sum_i a_j x^{v_j}.$$
($x$ is a vector in $\F_p^{\times n}$.) Recovery works by taking a primitive $g$ and summing $f(g)+\cdots + f(g^{p-1}) = a_i$ by orthogonality of characters.

Motivation: Ordinary Reed-Muller codes are $$(a_d)\mapsto \sum a_d x^d.$$
We modify by replacing $x$ by an element in $\F_p^{\times}$.

#Basic definitions

##LDC's

A $(q,\ep,\de)$, $k\to n$ LDC consists of

* An encoding function $\{\pm1\}^k \to \{\pm 1\}^n$.
* Decoding functions $D_{i,t}(x)$. For linear LDCs over $\F_2$[^f0], we can assume this is the same for all $i$, namely the product $\prod_{i=1}^q X_{t_i}$.[^f1]
    * For linear LDCs, there is a matching $M_i$ for each coordinate $i$. $M_i=(\pi_1,\ldots, \pi_q)\in S_n^q$ and the sets of the matching are given by $\set{\pi_j(x)}{j\in [q]}_{x\in [n]}$.[^f2]
* For each $x$, for each $\ve{y'-C(x)}\le \de$, $\Pj(D_i(C(x))=x_i) \ge 1-\ep$. (Se previous footnote.)

Let $\mu_i(x)=\EE_{t\sim M_i} D_{i,t}(x)$, $\mu(x)=(\mu_1(x),\ldots, \mu_k(x))$.

Can we assume WLOG there is perfect decoding of codewords? $D_i(C(x))=x_i$.

If we can, then $\{-1,1\}^k\subeq \im \mu$. Otherwise, we still have: for each $x\in \{-1,1\}$, there is $x'$ with $\sgn(x')=\sgn(x)$ such that $|x_i'|\ge 1-\ep$.[^f3] (If there is $\mu$ such that this is true, does that mean we can make a LDC out of it? Yes---send the messages to the preimages of those points.)

The picture to have in mind:
$$\{\pm 1\}^k \xra{C} \{\pm 1\}^n \xra{\text{noise}}  \{\pm 1\}^n \xra{\mu} [-1,1]^k$$
($\mu$ is the average decoding according to $D$.)

[^f0]: Over other fields, the decoding functions are $\prod \ze_p^{k_iy_i}$ where $y_i\in \Z/p$.
[^f1]: We can assume exactly $q$ queries because we can add a few bits that are always 1. What about if we want to negate? Will this ever be the case? In any case we can cover this by adding $\pm$.
[^f2]: Why do these have to be matchings? The fact they are matchings means it's an LDC with parameters $\de n q$ for error $\de q$.
[^f3]: This doesn't make much of a difference for the $\ep$-net argument? So for simplicity we just assume $\{-1,1\}^k\sub \im C$?

##Notation

* $\La_M(f_1,\dots, f_q) :=\EE_{y\sim M_x}(D_{x,y}(f_1,\ldots,f_q) = \EE_{y\sim M_x} \prod_{i=1}^q f(y_i)$.

##Approach

It is necessary for $\im \mu$ to have a large $\ep$-net. Otherwise it can't contin $\{-1,1\}^k$. Thus we can show lower bounds by showing any $\im\mu$ has a small $\ep$-net. Think of this as a communication complexity problem: Alice wants to communicate $\mu(y)$ to Bob with $\ep$ accuracy without sending many bits. (Be careful about $\ep$ vs. $\eph$ here.)

**Lemma**: If there is an $\ep$-net of size $s$, then $\ln s \ge \pa{1-H\pa{\eph}}k$. (Generalization $p$-norm: $\ge \pa{1-H\pf{\ep^p}2}$.)

Thus if $s= n^{O_\ep(1)}$ then we get an exponential lower bound.

##Toy problem

A random matching should not work. Can we generalize to a larger class of mappings that don't work? Yes, if we have the property, say, that every set of $\Om(\ln n)$ of the matchings form an expander, because then the average of $\mu_i$ for $d=C\ln n$ indices is concentrated around 0, and even stronger than not having an $\ep$-net, the larged $d$ of them has to be on the order of $\rc{\sqrt{d}}$, and can't be close to 1.

##Abelian group

Consider matchings $(x,x+y)$ where $y$ ranges over the whole group. For $q$-query, consider $(x,x+y,\ldots, x+(q-1)y)$.

Is this reasonable? In the MVC construction, we query $(h,hg,\ldots, hg^{(p-2)})$ (i.e., fixing a generator $g$, this is a line $g^{w+tv}$). So the $p-1$-query MVC is an example of such a construction for $q=p-1$. Does a bound here for arbitrary $q$ give a bound for MVC's? (But it can't because doesn't MVC achieve  $2^{n^{o(1)}}$

**Theorem** (Approximate Caratheodory): For $2\le p<\iy$, given $(x_i)_{i=1}^m\in \R^d$, $\ep>0$, $\ga = \max_{i\in[n]}\ve{x_i}_p$, for every $\mu\in \conv\{x_1,\ldots, x_n\}$ there exists $i_1,\ldots, i_s,s\le \fc{4p\ga^2}{\ep^2}$ such that $$\ve{\mu-\rc{m}\sum_{i\in S} x_i}_p\le \ep.$$

For 2-query LDC, let $M_y$ be a group matching, $\set{(x,x+y)}{y\in G}$, $\La_{M_y}(f,g) = f*g$.[^f4] Now $f*g\in \conv\{\chi_a\}$ so Theorem gives that it is $\ep$-approximated in $L_2$ by $O\prc{\ep^2}$ characters. The $\ep$-net is of size $O\pf{\log n}{\ep^2}$, which gives an exponential bound.

[^f4]: (Do we just need $f*f$?)

3-query AP's:

* For $f_1,f_2,f_3:G\to \{\pm 1\}$, let $\phi(y) = \La_{M_y} (f_1,f_2,f_3)=\EE_x [f_1(x)f_2(x+y)f_3(x+2y)]$. Then by generalized von Neumann, $\ve{\phi}_{U^3}^*$.
*   (Dual of inverse Gowers Theorem) $\ve{\psi}_{U^d}^*$ implies $\psi=c(\de,d)\al+\be$ where
    * $\psi = c(\de,d)\al+\be$,
	* $\al\in \conv\set{e(p)}{p\in Poly(d,n)}$ (nonclassical polys in $n$ vars of degree $<d$.
	* $\ve{\be}_{L_1}\le \de$.
    By approximate Caratheodory, it's sufficient to communicate $c(\ep,3)^2/\ep^2$ quadratic phase polys, communication $O_\ep((\ln n)^2)$. 

Question: Generalize this to

* nonabelian groups
* more queries (straightforward using inverse theorem?)
* non-AP's $x,x+y,x+z$ (can be hard because you're only taking $n/n^2$ now...)

##Matrices

#Scraps

#Directions

##3/10

* Find a bound for 3-query LDC's along the same lines at that for LCC's. (What's the difficulty?)
* To what degree are the theorems in additive combinatorics necessary? Ex. would existence of LDC's/LCC's imply things in additive combinatorics?

##Talk with Zeev 3/2

Consider a partition of the complete bipartite graph into matchings. What is the worst partition, in the sense that you have to take the union of many ($\Om(\ln n)$) matchings before you get an expander in the sense of the Expander Mixing Lemma?

Now consider if the bipartite graph represents a Cayley graph ($x$ on the left is connected to $gx$ on the right). "Abelian groups are the worst expanders."

If you need $\ge d$ matchings, you get a LDC from $d$ to $n$. 

Consider tripartite hypergraphs, with $n^3$ matchings partitioned into $n^2$. Is the worst partition take $(\ln n)^2$?

##Low-weight LDCs to LDCs


