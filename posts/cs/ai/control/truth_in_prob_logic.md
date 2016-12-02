---
title: (CYHB13) Definability of Truth in Probabilistic Logic
published: 2016-08-19
modified: 2016-08-26
tags: ai safety, logic
type: notes
showTOC: True
---

<!--Can't have True predicate,
$$\forall \ph: True(\ce{\ph}) \iff \ph.$$-->
<!--don't need to be computable, just definable. already impossible-->

# Intro

Undefinability of truth: no expressive and consistent language can contain its own truth predicate, satisfying
$$\forall \ph: True(\ce{\ph}) \iff \ph.$$

Responses:

1. Work with meta-languages.
2. Accept some sentences are neither true nor false.

"Then we may continue to define True by the strong strong reflection property that the truth values of $\ph$ and $True(\ce{\ph})$ are the same for every $\ph$. (?)

Unsatisfying. 

* No way test if $\ph$ is undefined
* No bound on number of undefined sentences.

Possible over prob. logic!

<!-- can... -->

Fix a theory $T$ over a language $L$. (We will let also let $L$ denote the set of sentences.)

**Definition**: 
A probability function $\Pj:L\to [0,1]$ is **coherent** if there is a probability measure $\mu$ over models of $L$ such that
$$\Pj(\ph) = \mu(\set{\mathcal M}{\mathcal M \vDash \ph}).$$

**Theorem**: $\Pj$ is coherent iff all these hold.

1. For each $\ph,\psi$, $\Pj(\ph)=\Pj(\ph\wedge \psi)+\Pj(\ph\wedge \neg \psi)$.
2. For each tautology (something that is true in all models) $\Pj(\ph)=1$.
3. For each contradiction $\ph$, $\Pj(\ph)=0$.

*Proof*. Define $T_{i+1}$ iteratively by choosing the first statement independent of $T_i$, and including it with probability $\Pj(\ph_j|T_i)$ and its negation otherwise. Let $T=\bigcup_i T_i$. (Consistent by compactness.)

Axiom 1 implies $\Pj(\ph|T_i)$ is a martingale. It eventually stabilizes at 0 or 1; the martingale property implies $T\vdash \ph$ with probability $\Pj(\ph|T_0)$.

# Reflection

This reflection principle doesn't work:
$$\forall \ph\in L', \forall a,b\in \Q: a<\Pj(\ph)<b\iff \Pj(a<\Pj(\ce{\ph})<b)=1$$
because we can construct $G\iff \Pj(\ce{G})<1$,
$$\Pj(G)<1\iff \Pj(\Pj(\ce{G})<1)=1 \iff \Pj(G)=1.$$

Instead imagine $\Pj$ having arbitrarily precise information about $\Pj$. Say $\Pj$ is **reflectively consistent** if (these are equivalent)
\begin{align}
\forall \ph\in L',\forall a,b\in \Q: (a<\Pj(\ph)<b) &\implies \Pj(a<\Pj(\ce{\phi})<b) &= 1\\
\forall \ph\in L',\forall a,b\in \Q:  (a\le \Pj(\ph)\le b) &\Leftarrow \Pj(a\le \Pj(\ce{\phi})\le b) &= 1
\end{align}

**Theorem** (Consistency of reflection): Let $T$ be a consistent theory over $L$ where $(\Q,+)$ can be embedded, and $L'$ be the extension of $L$ by $\Pj$. There is a coherent probability function $\Pj$ over $L'$ assigning probability 1 to $T$ and satisfying the reflection principle.

*Proof*.

**Theorem (Kakutani fixed point)**: [wikipedia](https://en.wikipedia.org/wiki/Kakutani_fixed-point_theorem)

1. Let $S\subeq \R^n$ be non-empty compact convex, $\ph:S\to 2^S$ such that $\ph(x)$ is non-empty and convex for all $x\in S$, and $\ph$ has closed graph. Then $\ph$ has a fixed point ($x\in \ph(x)$).
2. $\ph:X\to 2^Y$is upper hemicontinuous if for every open $W\subeq Y$, $\set{x}{\ph(x)\subeq W}$ is open in $X$. If $X,Y$ are topological vector spaces, $\ph:X\to 2^Y$, $Y$ convex, then $\ph$ is Kakutani if it is upper hemicontinuous and $\ph(x)$ is non-empty, compact and convex. If $S$ is non-empty, compact, convex subset of Hausdorff locally convex topological vector space, and $\ph:S\to 2^S$ is Kakutani, then it has a fixed point.

* Let $\cA\sub [0,1]^{L'}$ be the set of coherent probability distributions which assign probability 1 to $T$. $\cA$ is nonempty convex and closed (in a compact set), so compact. (?? Nonempty because can set $\Pj(\ce{\ph})$ arbitrarily and it still satisfies these.
*   Given $\Pj\in \cA$, let $R_{\Pj}$ be axioms of the form $a<\Pj(\ce{\ph})<b$ where $a<\Pj(\ph)<b$. Let
    $$ f(\Pj') = \set{\Pj\in \cA}{\Pj(R_{\Pj'}) = 1}.$$
*   Show that $f$ has a closed graph and use Kakutani fixed point.
	
(Why do we care that $R_{\Pj'}$ is countable?)

> "we don't want P to assert
> that P is reflectively consistent, we want it to actually *be* reflectively consistent."

> our work shows that the obstructions presented
> by the liar's paradox can be overcome by tolerating an infinitesimal error, and that Tarski's
> result on the undefinability of truth is in some sense an artifact of the infinite precision
> demanded by reasoning about complete certainty.

(Don't understand the last page: revisit.)

