---
title: Sum of squares
published: 2016-03-24
modified: 2016-03-24
tags: SoS, SDP, maxcut
type: notes
showTOC: True
---

Reference: Barak's notes. Barak and Steurer's survey.

#Introduction

"Sum-of-squares" is an algorithm that attempts to find feasible solutions to systems of polynomial inequalities, or a proof that there is no solution. It is widely applicable because many computational problems can naturally be put into the form of polynomial inequalities (ex. $k$-SAT can be encoded with degree $k$). The degree $d$ of sum-of-squares is a tunable parameter; the algorithm runs in $n^d$ time. We can look at

* lower bounds: sum-of-squares of degree $d$ cannot solve a certain problem. This is necessary, e.g., to show a problem has no polynomial-time algorithm - but very little is known about lower bounds even though sum-of-squares is a *single* algorithm, not a class of algorithms!
* upper bounds: use sum-of-squares of higher constant degree (e.g., $d=4$) to get better approximation algorithms, etc.

Why is SoS a natural notion?

* $d=1$ is linear programming, $d=2$ is semidefinite programming, and $d=n$ is brute-force-search. Everything in the middle is "dark matter" which we don't understand. In many cases it seems like you don't get better algorithms by looking t $d>2$, but there are also exceptions. Compare to how most natural problems seem to be either polynomial time or NP-hard/conjectured exponential time. By Ladner's Theorem (time hierarchy) there are problems of essentially any time complexity, but these aren't natural.
* The quest for optimal algorithms: In complexity theory the hope is to find a property $P$ such that easy problems have property $P$ while hard problems do not. Even more ambitiously, one hopes for a *single* "optimal algorithm" for all problems in a large class, in the sense that when a problem has an efficient algorithm, then this single optimal algorithm will solve it. SoS comes the closest to being such an algorithm. (Thus it's interesting to see what kinds of techniques are encompassed by the SoS framework, i.e., what facts have "SoS proofs", because then they will be solvable by the SoS algorithm.)

#Definitions

There are many equivalent notions of sum-of-squares; we give 4. The first definition introduces an algorithm that searches for a pseudo-expectation operator; on the boolean cube this is essentially equivalent to a pseudo-distribution. We also give equivalences to a sum-of-squares proof and sum-of-squares representation.

In the next section we will motivate these definitions and show equivalences.

Let $x=(x_1,\ldots, x_n)$ and $\R[x]_{\le d}$ denote polynomials in $x_1,\ldots, x_n$ of degree $\le d$.

1.  (Convex optimization) A degree-$l$ pseudo-expectation operator satisfying $p_1=\cdots =p_m=0$, where $\deg p_i\le d, 2d\mid l$, is a bilinear form $M:\R[x]_{\le l/2}\times \R[x]_{\le l/2}\to \R$ such that
    * (Normalization) $M(1,1)=1$.
	* (Consistency) If $p,q,r,s\in \R[x]_{\le l/2}$ and $pq=rs$, then $M(p,q)=M(r,s)$.
	* (Non-negativity) $M(p,p)\ge 0$.
	* (Feasibility) For all $p_i$ and $q\in \R[x]_{\le l/2-d}$, $M(p_iq,p)=0$.
	In other words, $M$ is a positive semidefinite quadratic form that, as a bilinear form, factors through $(\R[x]/\an{p_i})_{\le l}$,
	$$\R[x]_{\le l/2}\times \R[x]_{\le l/2} \to (\R[x]/\an{p_i})_{\le l} \to \R.$$
	The degree-$l$ SoS algorithm is the algorithm that solves the feasibility problem for this semidefinite program.
2.  (Pseudo-expectation) For a function $\mu:\{\pm 1\}^n\to \R$ 
    $$\wt{\EE_\mu} p(x) = \sum_x \mu(x)p(x).$$
	We say $\mu$ is a degree-$l$ **pseudo-expectation** if
	* (Normalization) $\sum_x\mu(x)=1$.
	* (Restricted non-negativity) For all $p\in \R[x]_{\le l/2}$, $\wt{\EE_\mu} p(x) \ge 0$.
3.  (Sum-of-square refutation) A **sum-of-squares refutation** for the system of polynomial equations $p_i\ge 0$[^f1] is a proof of $-1\ge 0$ from deduction system starting with $p_i\ge 0$ with the following rules
	* $p\ge 0, q\ge 0\vDash p+q\ge 0$.
	* $p\ge 0, q\ge 0\vDash pq\ge 0$.
	* $\vDash p^2\ge 0$.
	It is degree $l$ if the *syntactic* degree of each expression is at most $l$. (Explain.)
4.  (Sum-of-square representation) A degree-$l$ **sum-of-squares representation** for the infeasibility of $p_1=0,\ldots, p_m=0$ is
    $$\sum_i p_i q_i = 1+\sum_i r_i^2, \quad \deg(p_i),\deg(r_i)\le l.$$

[^f1]: Note that we can write equalities as 2 inequalities.

##Equivalence

1$\iff$2: See exercise 1.7.

2$\iff$3: This is the SOS Theorem. It encompasses the Positivstellensatz, which says that every unsatisfiable system of equalities has a finite degre proof of unsatisfiability. (See exercise 1.14, 15 for part of the theorem.)

3$\iff$4: See exercise 1.11.

#Sum-of-squares as semidefinite programs

The most common use of sum-of-squares is in SDP relaxations of combinatorial problems, as follows. Let $f$ be a convex function. The goal is to find
$$
\min_{x\in \{-1,1\}^n}f(x).
$$
One way to relax this is to write $f(x)=g(x^Tx/n)$, and find
$$
\min_{M\succeq 0, M_{ii}=1} g(M).
$$
This is a relaxation because if $x$ is the optimal solution to the first problem, $x^Tx/n$ is a feasible point for the second problem achieving the same value.[^f1]

[^f1]: There is another way to relax this kind of problem, by changing the values $x_i$ could take from $\pm1$ to vectors, like in Goemans-Williamson. We don't consider this kind of relaxation here. (Though we can do GW here too...?)

Think of $M_{ii}=1$ as degree-2 constraints that shrink the space we're minizing over to be closer to just the set $\set{x^Tx/n}{x\in \{-1,1\}^n}$. 

Note this is the degree-2 SoS relaxation of this problem! The degree-$l$ SoS relaxation is the optimization problem $$\min_{M\text{ pseudo-expectation satisfying }x_i^2=1} h(M)$$ (note we showed that the set of pseudo-expectations is convex; it is defined by $M\succeq 0$ and some linear equations). ($x_i^2=1$ corresponds to $M_{ii}=1$.) In the equation above we thought of $M$ as a bilinear form on $\R^n\times \R^n = \R[x]_{=1}\times \R[x]_{=1}$; here we're just adding 1 to the vector space  to get $\R[x]_{\le 1}\times \R[x]_{\le 1}$ and stipulating $M(1,1)=1$, which doesn't change anything.

(If $f$ is a linear function $f(x_1,\ldots, x_n,x_1^2,x_1x_2,\ldots, x_1^3,\ldots)$, then $g(M)$ is the function $f(M(x_1,1),\ldots, M(x_n,1), M(x_1,x_1),\ldots)$.

For example, the degree-4 SoS relaxation would correspond to optimizing over $(\R^2,\R^1,\R)^{\ot 2}$, where the solutions corresponding to solutions of the original problem are in the form $(x^{\ot 2},x,1)^{\ot 2},x\in \{-1,1\}^n$. For $M\in $(\R^2,\R^1,\R)^{\ot 2}$, the solutions satisfy equations like $M_{ii,jk}=1, M_{i,ij}=1$, etc.---corresponding to multiples of polynomials $x_i^2-1$.

#Exercises

##Chapter 1

1. 
2. Use linearity.
3. $M(p,p)\ge 0$ is semidefiniteness; all the other constraints are linear.
4. 
5. Let $p=\sum_{y\ne y^0} \prod_i (x_i-y_i)^2$; note $p(y^0)\ne 0$. Then $\wt{\EE_{x\sim \mu}} [p(x)^2] = \mu(y^0)p(y^0)$. Thus $\mu(y^0)\ge 0$.
6. Note the problem should say "degree $l$ polynomials". Write $\mu(x)$ as a multilinear polynomial. First, mod out by $x_i^2-x_i$. Now note that for every degree $\ge l+1$ monomial $x^L$, in $\wt{\EE_{x\sim x^L}} q(x)$, if $\deg q\le l$ is a monomial, then one term will be uncancelled and average out to 0. Now use linearity.
7. The map is $\mu \mapsto ((p,q) \mapsto \wt{\EE_\mu pq})$. We have $\sum \mu(x) (x_i^2-1)pq=0$. (Where do we use 6?)
8. 
9. ?
10. ?
11. Induct to say that at each stage, we have an expression in the form $\sum r_i^2 + \sum q_ip_i$. At the end we get $\sum r_i^2 + \sum q_ip_i = -1\ge 0$, which re-arranges to a SoS representation.
12. 
13. 
14. 
15. 

##Chapter 2

1. Imitate the proof of CS. We have $\wt{\EE_{\mu}} t^2P^2-2tPQ+Q^2$. Now set the discriminant to be $\le 0$.

#Misc.

* SoS in universal learning (Paul Christiano)
