---
title: Logical induction
published: 2017-02-01
modified: 2017-02-01
tags: ai safety, logic
type: paper
showTOC: True
---

# Definitions

* Let $L$ be a language of propositional logic[^f1], and $S$ be sentences in $L$.
* A **valuation** is $\mathbb V:S\to [0,1]$.
    * A **pricing** is $\Pj: S\to \Q \cap [0,1]$.
    * A **belief state** is a pricing with finite support. (Syntactically. Semantically, think of it as probabilities.)
* **Valuation sequence** $\mathbb N\to (S\to [0,1])$.
    * A **market** is a computable sequence of pricings $\Pj_i:S\to \Q\cap [0,1]$. (i.e., $\N \to (S\to \Q\cap [0,1])$).
	* A **computable belief sequence** is a market with each $\Pj_i$ having finite support. (Syntactically. Semantically, think of it as probabilities.)
* A **deductive process** $\ol D:\N^+\to \text{Fin}(S)$ (finite subsets of $S$) is a computable nested sequence $D_1\subeq D_2\subeq\cdots$ of sentences. Let $D_\iy:=\bigcup_n D_n$.
* A **world** is a truth assignment $\mathbb W: S\to \mathbb B$. True/false in $\mathbb W$ means $\mathbb W(\phi)=0,1$.
    *   $\mathbb W$ is **propositionally consistent (p.c.)** if it satisfies 
	    \begin{align}
		\mathbb W(\phi\wedge \psi)&= \mathbb W(\phi) \wedge \mathbb W(\psi)\\
		\mathbb W(\phi\vee \psi)&= \mathbb W(\phi) \vee\mathbb W(\psi)\\
		\mathbb W(\neg \phi) &= 1-\mathbb W(\phi)
		\end{align}
		(cf. Christiano. Can define more complicated equivalences, but becomes more computationally difficult to verify consistency; you can't make it intractable.)
		
		$PC(D)$ is the set of worlds where $\mathbb W(\phi)=1$ for $\phi\in D$. $PC(D)$ is the set of worlds propositionally consistent with $D$.
	*   $\mathbb W$ is **consistent** with $\Ga$, $\mathbb \in C(\Ga)$, if you can't prove contradiction from $\mathbb W$ and $\Ga$.[^f2]
		$$
		\Ga \cup \set{\phi}{\mathbb W(\phi)=1}\cup \set{\neg \phi}{\mathbb W (\phi)=0}\not\vdash \perp.
		$$
* **Efficiently computable** $(x_n)_{n=1}^{\iy}$ means $x_n$ computable in time $\poly(n)$.
*   A valuation **feature** 
    $$
	\al:\ub{[0,1]^{S\times \N^+}}{\text{valuation sequences}}\to \R
	$$
	is a continuous function such that $\al(\ol{\mathbb V})$ depends only on $\mathbb V_{\le n}$ for some $n\in \N^+$ called the rank.
	*   **Price feature** (cf. evaluation functional)
	    $$\psi^{*n}(\ol{\mathbb V}):=\mathbb V_n(\phi)$$
	*   **Expressible feature** is built up from price features, $\Q, +, \times, \max, \max(\cdot, 1)^{-1}$. $\mathcal{EF}$ is the set of expressible features, $\mathcal{EF}_n$ of rank $\le n$ (commutative ring).
*   A **trading strategy** is an affine combination
    $$T = \pa{-\sum_i \xi_i \phi_i^{*n}} + \sum_i \xi_i \phi_i^{*n}$$
	where $\phi_i\in S$, $\xi_i$ are expressible features of rank $\le n$. (I.e., it is an element of $\ker(\ph)$ where 
	$$\ph:\mathcal{EF}_n^{\opl S} \opl \mathcal{EF_n}
	= \mathcal{EF}_n^{\opl S\cup \{1\}} \mapsto \mathcal{EF_n}$$ 
	given by $\ph:x\opl y\mapsto x^{*n}+y$.) Let $T[\phi]$ be the coefficient of $\phi$, $T[1]$ be the constant term.
	* A **trader** $\ol T$ is a sequence $(T_1,T_2,\ldots)$ where each $T_n$ is a trading strategy for day $n$.
	*   Think of $\phi-\phi^{*n}$ as meaning "buy share of $\phi_i$ at prevailing price."
	*   Example of trading strategy: Arbitrage $\psi$ against $\neg \neg \psi$.
	    $$
		[(\neg \neg \phi)^{*n} - \phi^{*n}](\phi-\phi^{*n}) + [\phi^{*n}-(\neg\neg\phi)^{*5}](\neg \neg \phi - (\neg\neg \phi)^{*5}).
		$$
	*   Define evaluation of a value function on a $\mathcal F$-combination, $(S\to [0,1]) \times (\mathcal F^{\opl(S\cup \{1\})}) \to \mathcal F$ in the natural way, sending $\phi$ to $\mathbb V(\phi)$ and extending by linearity. ($\mathbb V(1)=1$.)
*   $\ol T$ **exploits** $\mathbb V$ relative to a deductive process $\ol D$ if 
    $$
	\set{\mathbb W\pa{\sumz in \mathbb V(_i(T_i))}}{n\in \N^+, \mathbb W\in PC(D_n)}
	$$
	is bounded below, but not bounded above.[^f3] This set is the set of **plausible assessments** of net worth. "The trader can make unbounded returns with bounded risk." 
	* Ex. if PA proves $\phi\vee \psi$, then a trader who buys $\phi,\psi$ at combined price $<1$ exploits the market.[^f4]
* $\ol{\Pj}$ satisfies the **logical induction criterion** relative to deductive process $\ol D$ if there is no efficiently computable trader $\ol T$ that exploits $\ol\Pj$ relative to $\ol D$. $\ol \Pj$ is a **logical inductor**.
    * A logical inductor over a $\Ga$-complete deductive process $\ol D$ is a **logical inductor** over $\Ga$.
* $\ol\Pj$ assigns $\ol p$ to $\ol\phi$ in a timely manner if $\Pj_n(\phi_n) \simeq_n p_n$.
	
[^f1]: What does this mean? Surely not $L$ is only propositional logic. $L$ is any logic that's universal (in the sense that you can express anything in arithmetic), right?
[^f2]: Checking propositional consistency is tractable if you restrict to a finite number of sentences. Otherwise (given oracle to $\mathbb W$), of course not because there's infinitely many things to check.
[^f3]: Why this definition? (Note: in the paper this is written as $T_i(\ol{\mathbb{V}})$. I changed this to be more consistent in notation.)
[^f4]: At any finite time a trader can earn arbitrarily large amount of money, but this is a statement about unbounded, not arbitrarily large.

# Theorem

For any deductive process $\ol D$, there exists a computable belief sequence $\ol \Pj$ satisfying the logical induction criterion relative to $\ol D$.

For any recursively axiomatizable $\Ga$, there exists a computable belief sequence that is a logical inductor over $\Ga$.

Intuition: Consider any polynomial-time method for efficiently identifying patterns
in logic. If the market prices don't learn to reflect that pattern, a
clever trader can use it to exploit the market. For example, if there
is a polynomial-time method for identifying theorems that are always
underpriced by the market, a clever trader could use that pattern to
buy those theorems low, exploiting the market. To avoid exploitation,
logical inductors must learn to identify many different types of patterns
in logical statements.

(Note: I expected that the logical inductor would be the trader, but no, it's the market! The traders are people trying to take advantage of the market. But I'm thinking of the AI against nature, and nature throwing catastrophes in the sense of trying to find things the AI would reason badly about.)

# Properties

## Limit properties

* Convergence: $\Pj_\iy(\phi) :=\limn \Pj_n(\phi)$ exists.
*   Limit coherence: $\Pj_\iy$ defines a probability measure on the set of worlds consistent with $\Ga$.
    $$
	\Pj(\mathbb W(\phi)=1):=\Pj_\iy(\phi).
	$$
*   Occam bounds: There exists $C>0$ such that, letting $\ka(\phi)$ be [prefix complexity](http://www.scholarpedia.org/article/Algorithmic_complexity#Prefix_complexity) of $\phi$,[^p1]
    \begin{align}
	\Pj_\iy(\phi) &\ge C 2^{-\ka(\phi)}\\
	\Pj_\iy(\phi) &\le 1-C2^{-\ka(\phi)}.
	\end{align}
* Domination of universal semimeasure[^p2] $M$: Let $\ol{\si}_n$ be the statement: the first $n$ bits of the observed sequence is $\si_{\le n}$. There is universal $C$ such that $\Pj_\iy(\ol \si_{\le n}) \ge CM(\ol\si_{\le n})$.

[^p1]: ??? Prefix complexity has to be with respect to something.
[^p2]: What is this?

## Pattern recognition

### Definitions

* Write $x_n\simeq_n y_n$ for $\limn x_n-y_n=0$. $\gtrsim$ and $\lesssim$ for $\liminf\ge 0$, $\limsup\le 0$.
* A divergent weighting is $\ol w\in [0,1]^{\N^+}$ with $\su w_n=\iy$.
$\ol q$ is **generable** from $\ol\Pj$ if there exists e.c. $\mathcal{EF}$-progression $\ol{q^{\dagger}}(\ol\Pj) =q_n$. ($q_n^{\dagger}(\ol\Pj) = \ol\Pj_n(q_n^{\dagger})$.)
    * "Divergent weightings generable from $\ol\Pj$ are the pattern detectors that logical inductors can use."
* Elements of $\R^{\opl (S\cup \{1\})}$ are constraints.
* **Bounded combination sequences** $BCS(\ol \Pj)$: $\ol\Pj$-generable $\ol A$ ($A_n\in \R^{\opl (S\cup \{1\})}$) that are bounded ($\exists b, \forall n,|A_n[1]|\le b$).

### Properties

*   Provability induction: Let $\ol{\phi}$ be e.c. sequence of theorems. Then
    $$
	\Pj_n(\phi_n) \simeq_n 1
	$$
	For disprovable sentences, $\simeq_n0$. (Analogy: Ramanujan and Hardy)
*   Preemptive learning: For e.c. sequence $\ol\phi$,
	$\liminf_{n\to \iy}\Pj_n(\phi_n) = \liminf_{n\to \iy} \sup_{m\ge n} \Pj_m(\phi_n).$
	and similarly for inf/sup switched.
*   Learning pseudorandom frequencies. $\ol{\phi}$ of decidable sentences is **pseudorandom with frequency p** wrt set of divergent weightings $S$ if for all $\ol w\in S$, $\limn \fc{\sumo in w_i \one_{\phi_i \text{ is theorem in }\Ga}}{\sumo in w_i}=p$. For $\ol\phi$ e.c., if $\ol\phi$ is pseudorandom over *all $\ol\Pj$-generable divergent weightings*, $\Pj_n(\phi_n) \simeq_n p$.
    * Think of $\ol{\Pj}$-generable as meaning: trading strategies you could come up with looking at past history of beliefs. This still doesn't fit my picture of traders as adversaries, rather than unkind nature.
*   Affine coherence: Let $\ol A\in BCS(\ol\Pj)$.
    $$
	\liminf_{n\to \iy} \inf_{\mathbb W\in C(\Ga)} \mathbb W(A_n) \le \liminf_{n\to \iy} \Pj_\iy (A_n) \le \lim_{n\to \iy} \Pj_n (A_n).
	$$
	Reverse inequalities for sup.
	* "Tie ground truth on $\ol A$ to value of $\ol A$ on main diagonal."
	* "learns in a timely manner to respect all linear inequalities that actually hold between sentences, so long as those relationships can be enumerated in polynomial time." Ex. if exactly one of $A_n,B_n,C_n$ is true, will get that.[^p21]
	* What is each inequality saying?
	
[^p21]: What about transformations? Ex. if $P$ is a polytime transformation $S\to \R^{\opl (S\cup \{1\})}$, such that $P(s)=0$ in all worlds ((or just is provable) and this is provable within $\Ga$?), then eventually it becomes 0? (I mean on worst case $s$ too, not just specific $s$.) Also, do there exist computable sequences $A_n$ of theorems such that for each $n$, $A_n$ is provable, but $\forall n, A_n$ is not provable? (Here we don't have the generators for $A_n$. Could we do more with the generators? The $A_n$ are just given to us by some adversary.)

I'm confused: Consider a sequence $y_n=f(x_n)$, $f:B^{2n}\to B^n$ which is hard-to-invert. Theorem $n$ is $y_n\in \im f$. How can we hope to assign probabilities $\to 1$?

Can we add true randomness? Randomness in $\Ga$ is not allowed because axioms are recursively computable. (Footnote 3 in paper says we can add randomness to market.) How about allowing traders to be random? 

## Self-knowledge

### Definitions

*   **Logically uncertain variable (LUV)**: formula $X$ free in one variable that defines a unique value via $\Ga$: ($\exists!$)
    $$
	\Ga \perp \exists x: \forall x': X(x')\to x'=x.
	$$
	Value of $X$ in $\mathbb W\in C(\Ga)$ is
	$$
	\mathbb W(X):= \sup \set{x\in [0,1]}{\mathbb W("X\ge x")=1}.
	$$
	Because it may not be clear that $X$ has a unique value, "$X\ge p$" is shorthand for $\forall x: X(x)\to x<p$.
	* Ex. "$\nu$ is 1/0 if Goldbach's conjecture is true/false."
	* Problem with a defining $\E$ the normal way: $\ol\Pj$ may not have figured out that $X$ takes a unique value!
	*   **Indicator LUV** $\one(\phi) := "(\phi \wedge (\nu = 1))\vee (\neg \psi \wedge (\nu=0))"$.
	*   **Approximate expectation operator** with precision $k$: For $X$ a $[0,1]$-LUV,
	    $$
		\E_k^{\mathbb V}(X):=\sumz i{k-1}\rc k \mathbb V("X>i/k").
		$$
		Let $\E_n:=\E_n^{\Pj_n}$.
* $f:\N^+\to \N^+$ is **deferral function** if $f(n)>n$ for all $n$, $f(n)$ can be computed in time $\poly(f(n))$. Say $f$ defers $n$ to $f(n)$.
* Continuous threshold indicator $\Ind_\de(x>y)$ interpolates between 0 and 1 on $[y,y+\de]$.

### Results

You can use the logic to encode the computation of the market prices, i.e. $\ul{\Pj}_{\ul{n}}(\ul{\phi_n})$. (I'm omitting underlines in the following theorem statements.)

* Introspection: Let $\ol \phi$ be e.c. sequence of sentences, $\ol a,\ol b$ be e.c. sequences of probabilities expressible from $\ol \Pj$. For any e.c. sequence of $\Q^+$ with $\ol \de\to 0$, there exists e.c. sequence of $\Q^+$ with $\ol\ep\to 0$, s.t. for all $n$,
    \begin{align}
	\Pj_n(\phi_n)&\in (a_n+\de_n,b_n-\de_n)&\implies \Pj_n("a_n<\Pj_n(\phi_n)<b_n")&>1-\ep_n\\
	\Pj_n(\phi_n)&\nin (a_n-\de_n,b_n+\de_n)&\implies \Pj_n("a_n<\Pj_n(\phi_n)<b_n")&<\ep_n
	\end{align}
	<!--(Asymptotically faster than any e.c. sequence!)-->
    * "If there is e.c. pattern of the form your probabilities on $\ol{\phi}$ will be in $(a,b)$ then $\ol{\Pj}$ learns to believe that pattern iff it is true subject to finite precision."
*   Paradox resistance: Define paradoxical sentences $\ol{\chi^p}$
    $$
	\Ga \vdash \ul{\chi_n^p} \lra (\Pj_n(\chi_n^p)<p).
	$$
	Then $\lim_{n\to \iy} \Pj_n(\chi_n^p) = p$.[^p31]
	* p. 16: Brain scanner.
* Expectations
	* Convergence: $\E_\iy$ exists.
	*   **Linearity of expectation**. $\ol \al,\ol\be$ e.c. sequences of $\Q$ expressible from $\ol\Pj$, $\ol X, \ol Y, \ol Z$ e.c. of $[0,1]$-LUV. 
	    $$
		\forall n, \Ga\vdash Z_n = \al_nX_n  +\be_nY_n\implies \al_n\E_n(X_n) + \be_n\E_n(Y_n) \simeq_n \E_n(Z_n).
		$$
	*   **Expectation coherence**. $\ol B\in $BLCS($\Pj$) set of bounded LUV-combination sequences.
		$$
		\liminf_{n\to \iy} \inf_{\mathbb W\in C(\Ga)} \mathbb W(B_n) \le \liminf_{n\to \iy} \E_\iy (B_n) \le \lim_{n\to \iy} \E_n (B_n)
		$$
		and reverse for sup.
*   No expected net update: $f$ deferral, $\ol\phi$ e.c. sequence of sentences.
	$$\Pj(\phi_n) \simeq_n \E_n("\Pj_{f(n)} (\phi_n)").$$
	* If $\ol\Pj$ on day $n$ believes on day $f(n)$ it will believe $\phi_n$ whp, then it already believes $\phi_n$ whp today. "In other words, logical inductors learn to adopt their predicted future beliefs as their current beliefs in a timely manner."
*   Self-trust: $f$ deferral, $\ol\phi$ e.c., $\ol\de\in (\Q^+)^n$ e.c., $\ol p$ e.c. sequence of rational probs expressible from $\ol\Pj$. Then
	$$
	\E_n ("\one(\phi_n)\Ind_{\de_n} (\Pj_{f(n)}(\phi_n)>p_n)") \gtrsim_n p_n \E_n ("\Ind_{\de_n}(\Pj_{f(n)}(\phi_n)>p_n)").
	$$
	* "Trust that if beliefs change, they must have changed for good reason"
	* Roughly: If we ask $\ol\Pj$ what it believes about $\phi$ now if it learned it was going to believe $\phi$ wp $\ge p$ in the future, it will answer with probability $\ge p$. (Some subtlety with continuous indicators, paradoxical sentences.)
	
	
[^p31]: How do polytime traders get access to prices if they are real numbers? Do they only get $\rc{\poly(n)}$ precision?

# Misc

"No dutch book" in expected utility theory, Bayesian probability theory
