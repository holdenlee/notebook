---
title: LDCs
published: 2016-03-03
modified: 2016-03-14
tags: LDC
type: notes
showTOC: True
---

#Previous work

##Lower bounds

* [GKST02] O. Goldreich, H. Karloff, L. Schulman, and L. Trevisan. Lower bounds for linear locally decodable codes and private information retrieval
* [KdW04] Exponential lower bound for 2-query locally decodable codes via a quantum argument
* [WW08] Improved Lower Bounds for Locally Decodable Codes and Private Information Retrieval
* [BARdW08] A Hypercontractive Inequality for Matrix-Valued Functions
with Applications to Quantum Computing and LDCs
* [BDSS11] A. Bhattacharyya, Z. Dvir, A. Shpilka, and S. Saraf. Tight lower bounds for 2-query LCCs over finite fields.
* [DSW13] Breaking the quadratic barrier for 3-LCC's over the Reals
* [BDHS14] Lower Bounds for Approximate LDCs
* [B15] On Embeddings of $\ell_1^k$ from Locally Decodable Codes

Unless otherwise specified, all bounds are for nonadaptive linear LCC's/LDC's. *What about adaptive codes?*

###LCC's

* [BDSS11] use additive combinatorics (Balog-Szemeredi-Gowers and Ruzsa) to give a lower bound on the number of points in a $\de$-SG configuration (equivalently, an upper bound on the number of dimensions). This extends to a bound for LCC's. [Summary](https://dl.dropboxusercontent.com/u/27883775/wiki/math/pdfs/sg1.pdf)

###LDC's

Let $\de,\ep\in (0,\rc2]$, $q\ge 2$.

* [BRW08] use matrix hypercontractivity to show a $(2,\de,\ep)$-LDC has $N=2^{\Om(\de^2 \ep^4 n)}$.
    *   Usual hypercontractivity says that $\ve{T_\rh f}_p\le \ve{f}_q$ for $0\le \rh \le \sfc{q-1}{p-1}$. For $p=2$, $\rh=\sqrt{q-1}$, this gives
		$$ \sum_{|S|>0}\rh^{2|S|}\wh f(S)^2 \le \pa{\EE_x |f(x)|^q}^{\fc 2q}.$$
		The matrix version of $(2,q)$ hypercontractivity is (Theorem 1), for $f:B^n\to \C^{d\times d}$
		$$\sum_S (p-1)^{|S|} \ve{\wh f(S)}_p^2 \le \pa{\rc{2^n} \sum_{x\in \{0,1\}^n} \ve{f(x)}_p^p}^{\fc 2p}.$$
		The difference is that we use the normalized Schatten $p$-norm $\ve{A}_p = \pa{\rc d\Tr |A|^p}^{\rc p}$.
	*   **Lemma**: If there is a $(q,\de,\ep)$-LDC, then there is a set $M_i$ of $\ge \fc{\de \ep N}{q^2}$ disjoint tuples of $q$ elements and signs $a_{i,Q}\in \{\pm 1\}$ for $Q\in M_i$ such that[^q1]
	    $$ \EE_x\ba{a_{i,Q} x_i\prod_{j\in Q}C(x)_j}\ge \fc{\ep}{2^q}.$$
		(Intuition: A linear decoding corresponds to taking a product of the queried bits. It is correlated with the true answer.)
	*   Realize that this expression for $q=2$, $a=\EE_x [C(x)_j C(x)_k x_i a_{i,(j,k)}]\ge \fc{\ep}{4}$ is a Fourier coefficient in disguise, for the matrix function $f(x) = C(x)C(x)^T$. We get
	    $$\wh f(\{i\})_{\{j,k\}\times \{j,k\}} = \matt 0{\pm a}{\pm a}0.$$
		Swapping entries so the $a$'s are in the diagonal,
		$$\ve{\wh f(\{i\})}_p = \pa{\rc N \pf{\de \ep N}{2}\pf{\ep}4^p}^{\rc p},$$
		since $\fc{\de\ep N}{2}$ is the number of pairs in the matching and each $|a|\ge \fc{\ep}4$ and using the (nonobvious) fact $\ve{F_i}\ge \ve{\diag(F_i)}_p$.
	*   Matrix hypercontractivity gives a bound on this. Dropping all but the weight 1 terms, 
	    $$n(p-1) \pf{\de\ep}{2}^{\fc 2p}\pf{\ep}4^2 \le (N^{p-1})^{\fc 2p}.$$
		Choose $p=1+\rc{\ln N}$.
	*   Other applications:
	    * Lower bounds on $k$-out-of-$n$ random access codes
		* Quantum direct product theorems for functions in terms of VC dimension (ex. disjointness).
	*   Generalization to 3 or more queries seems to fail; see [BNR12](http://arxiv.org/pdf/1208.0539.pdf) LOCALLY DECODABLE CODES AND THE FAILURE OF COTYPE FOR PROJECTIVE TENSOR PRODUCTS. What is the relationship to cotype?
<!--
[22] I. Haviv and O. Regev. On tensor norms and locally decodable codes. (Broken reference, email.)
Dear Oded Regev,
I read your paper "A Hypercontractive Inequality for Matrix-Valued Functions with Applications to Quantum Computing and LDCs", where you mentioned a work on generalizing the hypercontractivity inequality to tensors ([22] I. Haviv and O. Regev. On tensor norms and locally decodable codes, 2008. In progress.). I couldn't find the reference
What is the relationship between hypercontractivity and type?
-->
* [KdW04] $N\ge 2^{\Om(\de \ep^2 k)}$, $q$-query lower bound of $\Om\pf{k}{\ln k}^{\fc q{q-2}}$, improved by [Woo07] to $\Om\pf{k^{\fc q{q-2}}}{\ln k}$.
* [B15] Define $\cal L(N;\mathbf p)$ to be the Banach space of $q$-multilinear functions on $\R^N$ with norm taken with respect to $(p_1,\ldots, p_q)$ norms on $\R^N$. (Ex. $\cal L(N,(2,2))$ are matrices under the Schatten-$\iy$ (max eigenvalue) norm.)
    * High-level relationship to LDC's: $q$-LDC's of subexponential length give that (1) for $\sumo iq \rc{p_i}\le 1$, $B(\mathbf p)$ has trivial type and hence (2) for every $K$, $B(\mathbf p)$ contains a $K$-isomorphic copy of $\ell_1^d$. 
	* More quantitatively: If there exists a $(q,\de,\ep)$-LDC $B^k\to \Ga^N$, then for any $\mathbf p\in (1,\iy)^q$ with $\sum\rc{p_i}\le 1$, every $N'\ge 2|\Ga|N$, and any $K\ge 2^q |\Ga|^{\fc{q+2}2}/(\de \ep)$, $\cal (N',\mathbf p)$ contains a $K$-isomorphic copy of $\ell_1^k$.
	* From geometry, $\cal L(N;(2,2))$ does not contain a $K$-isomorphic copy of $\ell_1^k$ for $k>CK^2\ln (2N)$. This gives $N\ge 2^{\Om(\de^2\ep^2 k)}$ for 2-query LDC's.
* [BDHS14] Exponential lower bounds $n\ge 2^{\Om(\al \de \sqrt d)}$ for $q$-query $(a,\de)-approximate LDC. This is a set $V$ of $n$ points in $\R^d$ so that, for each $i\in [d]$ there are $\de n$ disjoint q-tuples $(u_1,\ldots ,u_q)$ in V so that $\spn(u_1,\ldots ,u_q)$ contains a unit vector whose $i$th coordinate
is at least $a$. (See Zeev's talk on [Barthe's Theorem](https://dl.dropboxusercontent.com/u/27883775/wiki/math/pdfs/simons.pdf). 10/15.)

[^q1]: Is this true for just linear codes or any codes?
		
##Upper bounds (construction)

Families

* Reed-Muller codes
* Matching vector codes (constant regime)
* Multiplicity codes ($\poly(k)$ regime)
* Expander-based codes ($>\poly(k)$, $<n^{o(1)}$)
* [KT00], [GKST06] $q$-query LDC's essentially equivalent to $q$-server PIRs.

###Constant query

A matching vector family in $(\Z/(p-1))^m$ of size $n$ gives a $(p-1)$-query LDC $(\Z/(p-1))^m \to (\Z/(p-1))^m$. There is also a trick to reduce the number of queries (e.g. to 3).

Construction: Given $(v_i)$, the encoding is
$$(a_i)\mapsto f=\sum_i a_j x^{v_j}.$$
($x$ is a vector in $\F_p^{\times n}$.) Recovery works by taking a primitive $g$ and summing $f(g)+\cdots + f(g^{p-1}) = a_i$ by orthogonality of characters.

Motivation: Ordinary Reed-Muller codes are $$(a_d)\mapsto \sum a_d x^d.$$
We modify by replacing $x$ by an element in $\F_p^{\times}$.

###More queries

* [KSY10] High-rate codes with sublinear-time decoding: For every $\ep>0,\al>0$, for infinitely many $k$, there is a code encoding length $k$ with rate $1-\al$ and locally decodable from a constant fraction of errors using $O(k^\ep)$ queries and time.
* [KMRS15] High rate locally-correctable and locally-testable codes with sub-polynomial query complexity: LCCs and LTCs with constant rate, constant relative distance, and sub-polynomial ($\exp(\wt O(\sqrt{\ln n}))$, greater than polylog) query complexity.


#Basic definitions

##LDC's

A $(q,\ep,\de)$, $k\to n$ LDC consists of

* An encoding function $\{\pm1\}^k \to \{\pm 1\}^n$.
* Decoding functions $D_{i,t}(x)$. For linear LDCs over $\F_2$[^f0], we can assume this is the same for all $i$, namely the product $\prod_{i=1}^q X_{t_i}$.[^f1]
    * For linear LDCs, there is a matching $M_i$ for each coordinate $i$. $M_i=(\pi_1,\ldots, \pi_q)\in S_n^q$ and the sets of the matching are given by $\set{\pi_j(x)}{j\in [q]}_{x\in [n]}$.[^f2]
* For each $x$, for each $\ve{y'-C(x)}\le \de$, $\Pj(D_i(C(x))=x_i) \ge \rc 2+\ep$. (See previous footnote.)

Let $\mu_i(x)=\EE_{t\sim M_i} D_{i,t}(x)$, $\mu(x)=(\mu_1(x),\ldots, \mu_k(x))$.

Can we assume WLOG there is perfect decoding of codewords? $D_i(C(x))=x_i$.

If we can, then $\{-1,1\}^k\subeq \im \mu$. Otherwise, we still have: for each $x\in \{-1,1\}$, there is $x'$ with $\sgn(x')=\sgn(x)$ such that $|x_i'|\ge \rc2 + \ep$.[^f3] (If there is $\mu$ such that this is true, does that mean we can make a LDC out of it? Yes---send the messages to the preimages of those points.)

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

3-query LCC's:

* For $f_1,f_2,f_3:G\to \{\pm 1\}$, let $\phi(y) = \La_{M_y} (f_1,f_2,f_3)=\EE_x [f_1(x)f_2(x+y)f_3(x+2y)]$. Then by generalized von Neumann, $\ve{\phi}_{U^3}^*$.
*   (Dual of inverse Gowers Theorem) $\ve{\psi}_{U^d}^*$ implies $\psi=c(\de,d)\al+\be$ where
    * $\psi = c(\de,d)\al+\be$,
	* $\al\in \conv\set{e(p)}{p\in Poly(d,n)}$ (nonclassical polys in $n$ vars of degree $<d$.
	* $\ve{\be}_{L_1}\le \de$.
    By approximate Caratheodory, it's sufficient to communicate $c(\ep,3)^2/\ep^2$ quadratic phase polys, communication $O_\ep((\ln n)^2)$.

This doesn't work for 3-query LDC's. (It can't because of MVC's.) The decoding functions are no longer given by all $y\in G$, but only $y\in S\sub G$ where $|S|=k$. The $L_1$ norm (normalized) blows up by $\fc nk$. We have to take $\ep\leftarrow \ep \fc{k}{n}$, which can make $c(\ep,d)$ a LOT larger.

Question: Generalize this to

* nonabelian groups
* more queries (straightforward using inverse theorem?)
* non-AP's $x,x+y,x+z$ (can be hard because you're only taking $n/n^2$ now...)

##Matrices

#Scraps

Smooth decoding: For $C:\{\pm 1\}^k\to (B^n)^N$ a $(q,\de,\ep)$-LDC, for each $i\in [k]$ there exists a probability distribution $\mu_i$ over $[N}^q$ and functions $f_S^i,S\in [N]^q$,

* (Good probability of success when choose sets according to $\mu_i$) For every $x$, $x_i\EE_{s\sim \mu_i}[f_S^i(C(x)_S)]\ge 2\ep$.
* (No entry queried too much) For all $s\in [N]$, $\Pj_{S\sim \mu_i} [s\in S]\le \fc{2q}{\de N}$.

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


#To add

* Smooth decoding.

#Open questions

* 3+ query LCC and LDC lower bounds.
* 2 query LDC over large alphabets (?). (I haven't looked at this regime.)
