---
title: [Rem16] The Hilbert Function, Algebraic Extractors, and Recursive Fourier Sampling
published: 2016-02-29
modified: 2016-02-29
tags: none
type: paper
understanding: 1
location: complexity/randomness/TR16-020.pdf
showTOC: True
---

Summary: Define an algebraic measure of randomness ($\de$-versatility for $U$), such that a versatile function is an algebraic extractor. RFS is versatile, with applications to $BQP^A\stackrel{?}{\subeq} ?^A$.
#Extractors

Problem: Find extractors for algebraic sets of degree $d$ and density $\ge \rh$, i.e., for sources uniform over sets of the form $V(f_1,\ldots, f_t)$ (common zeros), $\deg(f_i)\le d$.

Previous results: [Dvi12] gives explicit extractors for

* $|\F|=\poly(d)$, $\rh=2^{-\fc n2}$,
* $|\F|=d^{\Om(n^2)}$, small density.
* [CT13] degree 2, at most $(\ln \ln n)^{\rc{2e}}$ polynomials; disperser for $t$ polys of degree $\le (1-o(1))\fc{\ln\pf nt}{\ln^{0.9}n}$.

**Theorem 1**: Any $\de$-versatile function is an extractor for algebraic sets. Parameters: $\de\ge \fc n2-n^{\ga}$, $d\le n^\al$, $\rh\ge 2^{-n^{\be}}$, bias $O\pf{n^\ga+d\ln \pf{\sqrt n}{\rh}}{\sqrt n}$. Proof exploits structure of sets of zeros.

#Recursive Fourier sampling

Used to find $A$, $BQP^A\nsubeq \NP^A$.

Problem: Find larger class $C$ for which $BQP^A\nsubeq C^A$. 

Technique: connection between relativized separations from the polynomial hierarchy and lower bounds against constant depth circuits [FSS84],[Yao85]. "Here, the key idea is to reinterpret the 9 and 8 quantifiers of a PH machine as OR and AND gates."

?: Don't understand the part on poly approx.

Problem: What is the lowest degree polynomial $/\F_2$ representing [recursive Fourier sampling](RFS.html)? 

**Theorem 2**: $n=2^k-1$. No poly of degree $<\pf{n+1}2^h$ can nontrivally one-sided agree (soundness) with $RFS_{n,h}^{\Maj}$. (Similar statement for GIP.)

#VC dimension

Interpolation degree $\text{reg}(C)$ is min $d$ such that every $f$ is a multilinear poly of degree $\le d$.

Problem: Characterize sets with interpolation degree $r$.

**Theorem 4**: $\text{reg}(C)=r$ iff $r$ is smallest so $\rank \mathcal M(C, \binom{[n]}{\le r})=|C|$.

#Algebraic geometry

* Affine Hilbert function $h^a(R,d) = \dim(R_{\le d})$ where $R_{\le d}=\F[\mx]_{\le d}/I(V)_{\le d}$.
* Leading monomials of an ideal. Standard monomials are the complement. (Don't know why they're named like this. "Missing monomials" makes more sense.)
    * Hilbert function is a sum of sizes of SM's: $h^a(V,d)=\sum_{i=0}^d |SM(V,i)|.
    * Regularity is maximum degree of standard monomial of $V$.
* $a(I)$ is the min degree of $g\in I$ such that $g$ consists only of monomials from $SM(V)$. (If says $SM(\F^n)$, but this doesn't make sense.)
    * $V\subeq \F^n$ a nonempty zero-dimensional algebraic set. (What does zero-dim mean here?) Then $a(\ol V)+\text{reg}(V)=n$.
* How to calculate Hilbert function? Inclusion matrix $M(\mathcal F,\mathcal G)$ has $M_{F,G} = 1_{F\subeq G}$. Calculate Hilbert function by $h^a(V,d) =\rank M\pa{V,\binom{[n]}{\le d}}$.

#Versatile functions

* Versatile: $\forall g, \exists \deg(u),\deg(v)\le \fc n2$ and $g=uf+v$.
    * Question: isn't this always true for $\deg g=\fc n2$ by division? Yes, but there are other functions that are versatile too!
	*   Observation: when $f(x)=0, g=v$. When $f(x)=1$, $g=u+v$. Let $U_i=\set{x}{f(x)=i}$. (Lemma 4) This shows that any poly can be collapsed to one of degree $\le \fc n2$ on $U_0$ and $U_1$, i.e. $\text{reg}(U_i)\le \fc n2$. Converse also holds.
	    (How is regularity related to max degree of defining function?)

Example: the standard monomials (those missed by leading monomials) of Maj are those with weight $<\fc n2$. (Proof: any product of $\ge \fc n2$ variables vanishes on Maj.)

Generalize: $\de$-versatile on $U$ if $\de \le \text{reg}(U)-\text{reg}(U_i)$. (A versatile function is $\fc n2$-versatile on $\F_2^n$.)

Lemmas:

* 6: A $\de$-versatile function on $U$ cannot be represented on $U$ by degree $<\de$. (Note how we changed the degree and the set!)
* 7: If $q$ has degree $<\de$ and $q$ vanishes on $U_i$, then it vanishes on $U_{1-i}$. (This gives failure of one-sided computation.) Necessary is that $U$ be critical algebraic, $a(\ol V)=\deg(1_U)$. I don't understand this condition.
* 8: The LM's for $U\cap G,U_i\cap G$ for $G$ a union of hypersurfaces of degree $<d$, are the same up to degree $\le \de -d$.
* 9: Bound the difference between 2 evaluations of the Hilbert function at around $\text{reg}(V)$. Q: Why do we expect this to be small, and why do we care?

#RFS



#Todo

* Go through proof of Theorem 1.
* Understand recursive Fourier sampling. Read another source for this.

Questions

* How to construct a versatile set?
