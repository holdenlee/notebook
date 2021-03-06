---
title: Finite model theory
published: 2016-10-14
modified: 2016-10-14
tags: model theory
type: topic
showTOC: True
---

[Link](https://simons.berkeley.edu/talks/finite-and-algorithmic-model-theory)

# 1 Definability and undefinability

* Expressive power of logics on class of finite structures.
* Problems in computer science (complexity theory, database theory) are naturally questions about expressive power of logics.

$$Mod(\ph) = \set{\mathbb A}{ \mathbb A \vDash \ph}.$$
Here $\mathbb A$ ranges over finite relational structures.

What classes of structures are definable? (Set of possible $Mod(\ph)$'s for $\ph$ in logic $\mathcal L$.) 

* Syntactic restrictions on $\ph$ vs. semantic restrictions on $Mod(\ph)$.
* Computational complexity of $Mod(\ph)$ vs. syntactic complexity of $\ph$.

## Expressive power

Relational vocabulary: finite set $A$ with relations $R_1,\ldots, R_m$ and constants $c_1,\ldots, c_n$. 

A property of finite structures is any isomorphism-closed class of
structures. (Morphisms are permutations. Ex. graph ismomorphisms.)
Given logic, for which properties $P$ is there a sentence $\ph$ such that $\mathbb A\in P\iff A\vDash \ph$.

Ex. colored graphs: one binary relation $E^2$ and some unary relations $C_i^1$. First-order logic formulas involve these relations and $\wedge, \vee, \neg, \exists, \forall$.

* Vertex cover of size at most $k$. ($k$ fixed)
* 3-colorability when allow quantification over sets of vertices.

Compactness, completeness, preservation fail. (What are these exactly?)

Methods:

* Ehrenfeucht-Fraisse Games and related model-comparison games
* Locality Theorems
* Automata-based methods
* Complexity
* Asymptotic Combinatorics

Equivalence means satisfying the same statements in the logic. On finite structures, two structures are equivalent iff they are isomorphic.

Quantifier rank: 

1. For atoms, $qr(\ph)=0$.
2. $qr(\neg \psi) = qr(\psi)$.
3. $qr(\psi_1\wedge/\vee \psi_2) = \max_i(qr(\psi_i))$.
4. $qr(\exists/\forall x \psi) = qr(\psi)+1$.

$\mathbb A\equiv_p \mathbb B$ iff for all $qr(\ph)\le p$, $A\vDash \ph\iff B\vDash \ph$.

$S$ is definable by first order sentence iff $S$ is closed under $\equiv_p$ for some $p$. (13) ??
(Is $S$ on finite set? What does "finite relational vocab" mean?)
(Is this trivial by taking $p=|A|$?)
(NO: $A$ is of arbitrary finite size!)

Ex. I think connectedness is not first-order!

Define **partial isomorphism**.

Ehrenfeucht-Fraisse game:

For $p$ rounds:

* Spoiler choose one structure and an element of that structure.
* Duplicator responds with element of other structure $a_i$.

After $p$ rounds, Duplicator wins if $a_i\mapsto b_i$ is partial iso. Duplicator has winning strategy iff $\mathbb A\equiv_p \mathbb B$.

Proof: choose the witnesses of existence, going to the other structure for a $\forall$ because negated $\forall$ gives $\exists$.

So to show not definable, for every $p$ produce $\mathbb A_p$, $\mathbb B_p$ such that one is in $S$, and duplicator wins.

Ex. Not definable: 2-colorability, even cardinality, connectivity.

(Duplicator's strategy is to ensure that after r moves, the distance between corresponding pairs of pebbles is either equal or $2p^r$.)

Alternative: stratify by number of free variables (in any sub-formula), $\equiv^k$. $\equiv^k\implies \equiv_k$.

Connectivity and 2-colorability are axiomatizable in $L^k$ (define $path_{\le l}$, $disconnect_l$); even cardinality is not.
(I'm confused... why can we reuse variables?? 21)

$\equiv_p, \equiv^k$ have finitely/infinitely many equivalence classes.

How is the pebble game different?? 23
