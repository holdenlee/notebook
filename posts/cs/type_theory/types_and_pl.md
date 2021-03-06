---
title: Types and programming languages, Benjamin Pierce
published: 2016-07-31
modified: 2016-07-31
tags: none
type: notes
showTOC: True
---

#20 Recursive types

$\mu$ is a recursion operator for types. A definition $T = \mu X. Y$ means: let $T$ be the infinite type satisfying $X=Y$.

```
Hungry = \mu A. Nat -> A
Stream = \mu A. Unit -> {Nat, A}
Process = \mu A. Nat -> {Nat, A}
Counter = \mu C. {get: Nat, inc: Unit -> C}
```
Note: you can't define Hungry in Haskell because
(Then how does printf work? Something with type classes?)

Recursive types well-types the fixed-point combinator.
$$
fix_T = \la f:T\to T.(\la x:(\mu A. A\to T). f (x x)) (\la x:(\mu A. A\to T). f (x x))
$$

Every type is inhabited ($\la\_:(). fix_T (\la x:T.x)$), so systems with recursive types are useless as logics.

[Embed untyped lambda calculus]

##20.2 Formalities

There are 2 basic approaches to recursive types. What is the relationship between the type and its one-step unfolding?

1. Equi-recursive: They are definitionally equal.
2. Iso-recursive: They are different but isomorphic. There are functions `unfold` and `fold` going both ways. (Ex. Haskell)

Note equi-recursive places more demands on the typechecker.

##20.3 Subtyping

#21 Metatheory of recursive types

**Theorem** (Knaster-Tarski): Let $X$ be a poset, $f:X\to X$ be order-preserving. Then there exists a fixed point, $\sup\set{x\in X}{x\le f(x)}$.

Let $\cal U$ be the universal set. Consider $(\cal P(\cal U), \subeq)$.  Say $X$ is $F$-closed/consistent if $F(X)\subeq/\supeq X$.

*Corollary*. The intersection/union of all $F$-closed/consistent is the least/greatest fixed point of $F$, denoted by $\mu F, \nu F$.

(Principle of induction/coinduction) If $X$ is $F$-closed, $\mu F\subeq X$; if $X$ is $F$-consistent, $X\subeq \nu F$.

Finite tree types are given by
```
T = Top | (T, T) | T -> T 
```
Infinite tree types are like this but the tree can be infinite.

##21.3 Subtyping

Say $T<:Top$, $S_1<:T_1, S_2<:T_2 \implies (S_1\times S_2)<:(T_1,T_2)$ and similarly for $\to$. Take the transitive closure to get the subtyping relation.

##21.7 Regular trees

A tree type is regular if subtrees(T) is finite.

##21.8 Mu-types

```
T = X
	| Top
	| T x T
	| T -> T
	| \mu X. T
```
"Keep substituting" $\mu X. T$ to get the tree type corresponding to the $\mu$-type, treeof$([X\mapsto \mu X. T]T)(\pi)$.

#22 Type reconstruction

2 questions:

1.  Are all substitution instances of t well typed?
    $$\forall \si, (\si \Ga \vdash \si t:T)$$
	Type variables should be held abstract. This leads to **parametric polymorphism**.
2.  Is some substitution instance of $t$ well typed?
    $$\exists \si, (\si \Ga \vdash \si t:T)$$
	Can $t$ be instantiated to a well-typed term by choosing appropriate values? This leads to type reconstruction/inference.

Constraint typing: $\Ga \vdash t:T|_{\cal X} C$ means "term $t$ has type $T$ under assumptions $\Ga$ whenever constraints $C$ are satisfied." $\cal X$ tracks type variables introduced in each subderivation.

(This is a hybrid between the normal deductive system, and the bottom-up constraint generation system.)

##22.7 Let-polymorphism

Not allowed: doubleFun:$\forall a . (\forall f : a\to a) \to a \to a$ defined by
```hs
let doubleFun = \f x -> f (f x)
```
Reason: a polytype cannot appear inside `->`. 

T-LetPoly:
$$
\frac{\Ga \vdash [x\mapsto t_1]t_2:T_2 \quad \Ga \vdash t_1:T_1}{\Ga \vdash \text{let }x=t_1\text{ in }t_2:T_2}.
$$
Instead of calculating a type for $t_1$, it substitutes $t_1$ in the body. I.e., perform a step of evaluation before calculating types.

Problem: If the body contains many occurrences, we have to check once for each occurrence. This can take exponential time. See p. 333-4 for solution. Worst-case is still exponential, but in practice it is essentially linear.

# Universal types

We need to abstract out a type from a term and instantiate the abstract term with concrete type annotations.

* Parametric polymorphism: a single piece of code can be typed generically using variables in place of types, and then instantiated. They behave uniformly.
    * Impredicative/first-class
	* Let-polymorphism (restricted to top-level let-bindings). Functions cannot take polymorphic values as arguments.
* Ad-hoc polymorphism: Exhibit different behaviors when viewed at different types. Overloading: associate single function symbol with many implementations.
* Multi-method dispatch
* Intensional polymorphism: restricted computation over types at run time.
* Subtype polymorphism

##23.3 System F

Equivalent to polymorphic lambda-calculus a.k.a. 2nd-order lambda calculus because it corresponds to 2nd-order intuitionistic logic, which allows quantification over predicates (types) not just terms.

New terms are

* $\la X.t$ (type abstraction)
* $t [T]$ (type application)

##23.10

Impredicative: definition involves thing being defined. $T=\forall X.X\to X$ ranges over all types, including $T$ itself.

Predicative/stratified: range is restricted to monotypes.
