---
title: Sum of squares
published: 2016-03-24
modified: 2016-10-31
tags: SoS, SDP, maxcut
type: notes
showTOC: True
---

Reference: Barak's notes. Barak and Steurer's survey.

# Introduction

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

Note this is the degree-2 SoS relaxation of this problem![^f0] The degree-$l$ SoS relaxation is the optimization problem $$\min_{M\text{ pseudo-expectation satisfying }x_i^2=1} h(M)$$ (note we showed that the set of pseudo-expectations is convex; it is defined by $M\succeq 0$ and some linear equations). ($x_i^2=1$ corresponds to $M_{ii}=1$.) In the equation above we thought of $M$ as a bilinear form on $\R^n\times \R^n = \R[x]_{=1}\times \R[x]_{=1}$; here we're just adding 1 to the vector space  to get $\R[x]_{\le 1}\times \R[x]_{\le 1}$ and stipulating $M(1,1)=1$, which doesn't change anything.

[^f0]: Not really. I'm confused here: why don't we factor through $(\R[x]/I)_{\le l}$ instead of $(\R[x]/I)_{\le l/2}\times (\R[x]/I)_{\le l/2}$?

(If $f$ is a linear function $f(x_1,\ldots, x_n,x_1^2,x_1x_2,\ldots, x_1^3,\ldots)$, then $g(M)$ is the function $f(M(x_1,1),\ldots, M(x_n,1), M(x_1,x_1),\ldots)$.)

For example, the degree-4 SoS relaxation would correspond to optimizing over $(\R^2,\R^1,\R)^{\ot 2}$, where the solutions corresponding to solutions of the original problem are in the form $(x^{\ot 2},x,1)^{\ot 2},x\in \{-1,1\}^n$. For $M\in $(\R^2,\R^1,\R)^{\ot 2}$, the solutions satisfy equations like $M_{ii,jk}=1, M_{i,ij}=1$, etc.---corresponding to multiples of polynomials $x_i^2-1$.

#Chapter 2

##Cut problems

Define

*   **expansion/conductance**
    \begin{align}
	\phi(S) &= \fc{E(S,\ol S)}{d\min\{|S|,n-|S|\}}\\
	\phi(S) &= \min_S \phi(S).
	\end{align}
    (which is at most a factor of 2 from $\fc{n E(S,\ol S)}{d|S||\ol S|}$). This is the **sparsest cut** problem.
*   (fractional) **cut size**
	\begin{align}
	\text{cut}(S) &= \fc{E(S,\ol S)}{|E|}\\
	\text{maxcut}(G) &= \max_S \text{cut}(S).
	\end{align}
	This is the **max-cut** problem.

We can express this in terms of the characteristic function $x$ of $S$ defined as $x_i=(i\in S)-(i\nin S)$ by
$$ \an{x,Lx} = \rc{2d}\sum_{i\sim j} (x_i-x_j)^2 =\fc{4E(S,\ol S)}{d} = 2n\text{cut}(S). $$

##Quadratic sampling lemma

**Lemma**: Let $\wt{\E}$ be a degree-2 pseudo-expectation operator. Then there is a Gaussian distribution $N$ such that
$$\wt{\E_{x\sim\mu}} p(x) = \E_{y\sim N} p(y).$$
The pseudo-expectation operator is a bilinear form on $\R[x]_{\le 1}\times \R[x]_{\le 1}$ is associated with a matrix $A=B^2$. Then $y=Bx$ where $x\sim N(0,1)$, i.e., $y$ is the Gaussian with covariance matrix $B$.

A lemma about Gaussians.

**Lemma**: If $(x,y)$ are $1-\ep$-correlated Gaussians, then $(x,y)^T =Av$ where $A=\rc2 \smatt{\sqrt\ep+\sqrt{2-\ep}}{\sqrt{\ep}-\sqrt{2-\ep}}{\sqrt{\ep}-\sqrt{2-\ep}}{\sqrt{\ep}+\sqrt{2-\ep}}$, $v\sim N(0,I)$. In other words, if $(x,y)$ are $\cos(\te)$-correlated Gaussians, then $A=\smatt{\sin(\fc\pi4-\fc\te2)}{\sin(\fc\pi4+\fc\te2)}{\cos(\fc\pi4-\fc\te2)}{\cos(\fc\pi4+\fc\te2)}$ (I might have gotten cos/sin switched).

(Sanity check: when $\te=0$ they point in $\pi/4$, when $\te=\fc \pi2$ they point in $0,\fc\pi2$.)

**Lemma**: Let $y,y'$ be Gaussians with variance 1 such that
$$\E(y-y')^2 \ge 4(1-\de) = 2+2\cos(\te).$$
Then
$$\Pj(\sgn(y) = \sgn(y')) = \fc{\te}{\pi} = O(\sqrt{\de}).$$

##Goemans-Williamson

**Theorem**: There is a polynomial-time algorithm which given a $n$-vertex $d$-regular graph $G=(V,E)$ and a degree 2 pseudo-distribution with $\wt E_{x\sim \mu} x_i^2=1$, $\wt E\an{x,Lx} \ge 2n(1-\ep)$, outputs $z\in \{\pm1\}^n$ such that $\an{z,Lz} \ge (1-f_{GW}(\ep))=O(\sqrt \ep)$. (Add the precise form of $f$.)

*Proof*: Let $z_i=\sgn(y_i)$ and use Lemma on Gaussian variables on each term.

This is optimal. To see optimality in order of magnitude, take the odd cycle on $n=\rc{\sqrt{\ep}}$ vertices, or a union of these. To see optimality in an additive sense, use the Feige-Schectman graph (random points on sphere connected in $\an{v_i,v_j}\le -1+\ep$).

##Degree 4 SoS breaks this hard instance

Show that the FS graph can be solved by a degree 4 SoS. This is the same as saying there is no degree-4 distribution over $\R^n$ consistent with $\{x_i^2=1\}$ such that
$$\wt E\sum (x_i-x_{i+1})^2>4(n-1).$$
(We had a degree-2 distribution with $\wt E>4n\pa{1-O\prc{n^2}}$, which gave the gap.)

Proof: The squared triangle inequality holds for degree-4 pseudodistributions. Sum up inequalities $\wt E(x_i-x_{i+1})^2 \le \sum_{j\ne i} \wt E(x_j+x_{j+1})^2$.

# Exercises

## Chapter 1

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

## Chapter 2

1. Imitate the proof of CS. We have $\wt{\EE_{\mu}} t^2P^2-2tPQ+Q^2$. Now set the discriminant to be $\le 0$.

# Misc.

* SoS in universal learning (Paul Christiano)















# Proofs, Beliefs, and Algorithms through the lens of Sum-of-Squares

* [Course](http://sos16.dsteurer.org)
* [Lecture notes](http://sumofsquares.org)

Applications

* Math
* Algorithms
* Complexity
* Information
* Physics
* Optimization
* Learning

Sum-of-squares is a powerful meta-algorithm.

Other meta-algorithms:

* Gradient descent
    * Multiplicative weight updates, FTRL

Gradient descent, integer linear programming: for a given problem there are many ways of formulating it. It depends crucially on how you set it up. SoS doesn't suffer this. There is a mechanical way to apply it.

* Applies to "any" problem
* Often matches best known theoretical guarantees
* Sometimes significantly better
* Plausible: SOS is "optimal" for many problems.
* Strongest evidence for difficulty of problems.
* SOS is driven by duality between proofs and beliefs. Compare to belief propagation.

The vanilla version is impractical, but there are efforts to extract practical algorithms. They resemble heuristic algorithms used in practice.

Given $p\in \R[x_1,\ldots, x_n]$, $p\ge 0$ over $\R^n$, 

* (Hilbert) It is not always possible to write it as a sum of squares of polynomials.
* (Artin) It is always possible to write it as a sos of rational functions.

Krivine characterized systems of polynomial inequalities without solutions over $\R^n$. (Positivstellensatz, cf. Farkas lemma)

Given $f:\{0,1\}^n\to \R$ (given as coefficients in monomial basis up to degree $\deg f$), is $f\ge 0$ or $\exists x\in \{0,1}^n, f(x)<0$? The number of coefficients is $\le n^{\deg f}$. (Every monomial is actually a subset.) This is NP-hard for degree 2.

Max-cut:
$$
\max cut(G) \le c \iff c - \sum_{\{i,j\}\in E(G)} (x_i-x_j)^2 \ge 0.
$$

Given $f$, the algorithm outputs either a short proof for $f>0$ or an object ptends to be a collection of $x\in \{0,1\}^n$.

Degree $d$ SoS certificate for $f$: $\deg g_i\le \fc d2$, 
$$\forall x\in \{0,1\}^n, f(x) = \sumo iv g_i(x)^2.$$
It can be the case that $\deg g_i>\deg f$! That would be true over $\R$, but we are working over $\{0,1\}^n$.

For degree 2, we can do this efficiently over $\R$; this question is hard because we restrict to the hypercube.

If $f$ has a degree $d$ sos certificate, we can find degree-$d$ certificate for $f+2^{-n^d}$ in time $n^{O(d)}$. (Can't solve general convex problems exactly.)

<!-- sdp feasibility -->

**Theorem**. For all $G$, there exists a degree-2 sos certificate, $\max(f_G) - 0.878 f_G$. This estimates MAX-CUT up to $0.878$.

Open question: if we replace 2 by 4, can we replace $0.878$ by a larger constant? This would disprove unique games.

<!-- constructions of graphs? can make constant 1.-->

<!-- known algorithms that solve decision problem solves search problem-->
<!-- certificate starts existing in 0.878(max-cut) and (max-cut)-->

**Theorem 5**. $f$ has degree-$d$ sos certificate iff there exists positive semidefinite $A$ such that 
$$\forall x\in \{0,1\}^n, f(x) = \an{(1,x)^{\ot d2}, A (1,x)^{\ot \fc d2}}.$$
(Proof. $A$ has a square root.)

<!-- affine linear subspace -->

**Theorem**. If $f\ge 0$, then it has a degree $2n$ sos certificate.

*Proof*. $f=g^2, g=\sqrt f$, $\deg g\le n$, or $f(x) = \sum_{y\in \{0,1\}^n} (\sqrt{f(y)}\one_y(x))^2$.

*Proof (finding sos certificates)*. $f(x) = \an{(1,x)^{\ot d/2}, F(1,x)^{\ot d/2}}$. Find $A$,
$$
A-T\in W = \set{Q}{\an{(1,x)^{\ot d/2}, Q(1,x)^{\ot d/2}}\equiv 0\text{ over }\{0,1\}^n}.
$$
Look at $F+W\cap$cone.

We just need an efficient separation oracle.

## 3 Lower bounds

### 3.1 Maxcut

Cheeger: Let $G$ be a $d$-regular graph and $L_G=I-\rc dA$ be its Laplacian, and $\la$ be the second smallest eigenvalue. Then 
$$\la \ge \Om(\ph(G)^2).$$

The second smallest eigenvalue of $L_{C_n}$ is $O\prc{n^2}$. (Proof: compute.) This shows Cheeger is tight, as we have
$$ \la = \Te\prc{n^2}, \quad \ph(G) = \Te\prc{n}. $$

Maxcut: We showed that 
$$maxcut (G)\le 1-\ep \implies (\forall \deg \mu=2, \wt{\EE_{\mu}} f_G(x) \le 1-\Om(\ep^2)).$$

To show tightness up to constant, show that for $G=C_n$ there is $\mu$:
\begin{align}
maxcut(C_n) &\le 1-\rc n =:1- \ep\\
\wt{\EE_\mu} f_G(x) &= 1-\Te\prc{n^2}. 
\end{align}

*Proof*. Let $n=2k+1$. Define $u, v, w, X, \mu$ as follows. 
\begin{align}
u=(\om^{jk})_{j=0}^{n-1} &= u+iw\\
X&=vv^T+ww^T\\
\wt{\EE_\mu} x &= \rc2 \one\\
\wt{\EE_{\mu}} xx^T &= \rc 4 \one \one^T + \rc 4 X
\end{align}
(We can find a degree-2 pseudodistibution whenever $\wt{\EE_\mu} xx^T - (\wt{\EE_\mu} x)(\wt{\EE_{\mu}}x)^T$ is psd and the diagonal of $\wt{\EE_\mu} xx^T$ equals $\wt{\EE_\mu}x$. (Do we want it to be in $[0,1]$?))
Calculation:
$$
\wt{\EE_{\mu}} f_G(x) = \rc 4 \sum |u_i-u_j|^2 = n\pa{1-\Te\prc{n^2}}.
$$
(Working backwards, setting $X=vv^T+ww^T$ and then finding what the values of $v,w$ should be, we want $\sum_{(i,j)\in E}|u_i-u_j|^2$ to be large. This motivates hops of $\om^k$. Calculations: $\E(x_i-x_j)^2 = \E[1-\fc{2v_iv_j+2w_iw_j}4]$.)
<!-- $\EE_{x\sim N(\rc 2\one, \rc 4 X)} x^T(vv^T+ww^T)x = \Tr((\rc 4\one \one^T+\rc4 X)X)$-->

\begin{align}
\al_{GW} &= \min_{0\le x\le 1} \fc{\cos^{-1}(1-2x)}{\pi x}\\
&=\min_{-1\le \rh\le 1} \fc{2\cos^{-1}\rh}{(1-\rh)\pi}\\
\rh_{GW} &= \amin_{-1\le \rh\le 1} \fc{2\cos^{-1}\rh}{(1-\rh)\pi}
\end{align}


**Theorem** (Tightness of GW): For every $\ep>0$ there is $G$ and $\mu$ such that
\begin{align}
maxcut(G) &\le \al_{GW} x_{GW} + \ep\\
\wt{\EE_{\mu}} f_G(x) &\ge x_{GW}.
\end{align}
*Proof*. Feige-Schechtman graph: Connect up points on the sphere if $\an{v,w}\le \rh_{GW}+\ep$. (Later reduce to a discrete graph by sampling.) 
We have variables $\{X_v\}_{v\in \R^d}$, $X_v = \rc 2 + \fc{\an{v,g}}2$, $\Cov(X_u,X_v) = \E \an{u,g}\an{v,g} = \an{u,v} \le -\rh_{GW} + \ep$ if $\an{u,v}\le \rh$.

### 3.2 CSP

**Theorem**. It is NP-hard to solve $\text{Max-3XOR}_{\rc 2+\de, 1-\ep}$.

There are reductions $3\SAT\stackrel{\wt O(n)}{\le}\text{LabelCover} \stackrel{O(n)}\le \text{3XOR}$.

The fraction of constraints satisfied by 3XOR problem $x_i+x_j+x_k = a_{ijk}$ is
$$
f_\psi = \rc 2 + \rc{2|\psi|}\sum_{\{i,j,k\}\in \psi} (1-a_{ijk})(1-2x_i)(1-2x_j)(1-2x_k).
$$

**Theorem** (Grigoriev). For every $\ep>0$, for large enough $n$, there is an instance $\psi$ of Max-3XOR such that

* every assignment satisfies $\le \rc2+\ep$ fraction of equations in $\psi$.
* there exists a pseudodistribution of degree $\Om(n)$ consistent with $x_i^2-x_i=0$ and $(1-2x_i)(1-2x_j)(1-2x_k) = 1-2a_{ijk}$.

Intuition: Unlike Gaussian elimintion, the sos algorithm cannot distinguish between a perfectly and $1-o(1)$ satisfiable system.

*Proof*. Take a random $(m,n)$ bipartite graph with left-degree 3. Left is constraints, right is variables.

1.  Soundness: Chernoff gives for $m>\fc{9n}{\ep^2}$, 
    $$\Pj(\forall x\in \{0,1\}^n, \val_\psi(x) \le \rc 2+\ep)\ge 1-2^{-n}.$$
	Union bound.
2.  Completeness:  (cf. expander codes.) Let $\chi_S = \prod_{i\in S}(1-2x_i)$. Idea: make pseudistribution "uniform" subject to constraints.

	We define $\wt{\EE_{\mu}}\chi_S$ for $|S|\le \ep n$. If $\wt \E \chi_S$, $\wt \E \chi_T$ have been defined and $|S\triangle T|\le d=\ep n$, set $\wt \E \chi_{S\triangle T} = (\wt \E \chi_S)(\wt \E \chi_T)$. Set remaining $\wt \E \chi_S=0$.
	
	A degree $d$ derivation is a set that is reached after some number of steps, each set on the way being $\le d$.
	
	WHP the graph is an expander. If we have degree $d$ derivations for $\sum_{i\in S} x_i\equiv 0$ and $\sum_{i\in S} x_i\equiv 1$, then we get a degree $2d$ derivtion of $\sum_{i\in \phi} x_i=1$. Impossible---similar to proof of expander codes: In order for $T_t$ to be $\bigopl_{l\in T_t}\Ga(l) = \phi$, $T_t$ is large; take the first large $T_i$ in the derivation, it will have large neighbor set.
	
	Show $\deg p\le \fc d2\implies \wt \E p^2\ge 0$ by Fourier expansion. Break $|S|\le \fc d2$ into equivalence classes based on $\E[\chi_{S\triangle T}]\ne 0$. For $p_i=\sum_{S\in C_i} p_S\chi_S$, 
	$$ \wt \E p_i^2 = \sum_i (\sum_S p_S\wt{\E} x_{S\triangle S_i})^2\ge 0.$$
	
**Exercise 11**. DO this!

To reduce from Max 3SAT $(\fc 78+\ep, 1)$, convert $a_{\ell_i}x_i \vee a_{\ell_j}x_j \vee a_{\ell_k}x_k=1$ to $x_i+x_j+x_k \equiv a_{\ell_i}+a_{\ell_j} + a_{\ell_k}$. 

A nice $V\in \F_2^L$ is one such that every $u\in V^{\perp}\bs \{0\}$ has $\ve{u}_0\ge 3$. A **nice subspace predicate** is one such that there exists nice $V$, $P(x)=1\iff x\in V$. 

**Theorem** (SoS hardness for nice-subspace CSP, SoS PCP). Let $k,\ep>0$ be given. There exist $\be = 2^k\prc{\ep^2}$, $c=\poly\prc{\be}$ such that there is an instance $\psi$ of Max-P for [$k$-variate predicate $P$ with $\le 2k$ satisfying assignments] on $n\gg \rc c$ variables and $m=\be n$ constraints such that

* Every assignment satisfies $\le \fc{2k}{2^k} + \ep$ fraction of constraints.
* There exists degree $cn$ pseudodistribution that satisfies all constraints.

**Read the rest (15-21)**

### 3.3 From integrality gaps to hardness

## 4 Arora-Rao-Vazirani approximation for expansion

**Theorem**. Let $G$ be a $d$-regular graph with vertex set $[n]$ and $\mu:B^n\to \R$ be a degree-4 pseudo-distribution. Then
$$
\ph(G) = \min_{x\in B^n} \fc{f_G}{\fc dn |x|(n-|x|)} \le O(\sqrt{\ln n}) \ph_\mu(G).
$$
There is a polynomial time algorithm that given $G$ and $\mu$, finds $x$ such that $\ph(G)\le O(\sqrt{\ln n})\ph_\mu(G,x)$.

*Proof*.

Let $d(i,j)=\wt{\EE_{\mu}} (x_i-x_j)^2$. For degree 4, we have $d(i,j) + d(j,k) \ge d(i,k)$.

1.  Structure Theorem.
    * Suppose that $\sum_{i,j} d(i,j)\ge 0.1 n^2$. We want to show that there exist $|A|,|B|\ge \Om(n)$ such that $d(i,j)\ge \De$ for all $i\in A, j\in B$.
	* Let $\mu$ be a distribution (obtained by quadratic sampling from the pd) satisfying $\E x_i^2\le 1$, $\sum_{i,j} d(i,j)\ge 0.1 n^2$ and $d(i,k) \ge d(i,j) + d(j,k)$. Then we can find $|A|,|B|\ge \Om(n)$, $d(A,B)\ge \Om\prc{\sqrt{\ln n}}$.
	* Algorithm: Pick $X$ randomly. Take $A^0=\set{i}{X_i\le -1}$ and $B^0=\set{i}{X_i \ge 1}$. Remove the largest matching between them where the graph $H$ has $(i,j)$ with $d(i,j)\le \De$. (Go through vertices in fixed order.)
	* $\E |A||B| \ge 0.1 cn^2 - n\E |M|$.
	* The problematic case is $\E|M|\ge 0.05cn$.
	*   Estimate $\E |M|$ by relating it to the max of a Gaussian process. 
	    $$ \fc{\Om(1)}{\De} \pf{\E |M|}{n}^3 \le \E \max_{i,j\in [n]} X_j-X_i \le \sqrt{2\ln n}.$$
		*   Let $H^k(i) =B_k(i)$ be vertices reached from $i$ in at most $k$ steps in $H$. Let 
			\begin{align}
			Y_i^{(k)} &= \max_{j\in H^k(i)} X_j-X_i\\
			\Phi(k) &=\sumo in \E Y_i^{(k)}
			\end{align}
			This gives a lower bound on $\E \max_{i,j\in [n]} X_j-X_i\ge \fc{\Phi(k)}n$.
			
			Lemma (chaining). 
			$$\Phi(k+1) \ge \Phi(k) + \E |M| - O(n) \max_{i\in [n], j\in H^{k+1}(i)} \pa{\E(X_i-X_j)^2}^{\rc 2}.$$
			*   Variance of maxima of Gaussian processes: Let $Z$ be centered Gaussian. Then
				$$\Var(\max(Z_1,\ldots, z-t))\le O(1) \max(\Var(Z_1),\ldots, \Var(Z_t)).$$
			*   For $(i,j)\in E(H)$, because $H^k(j)\subeq H^{k+1}(i)$, for $N$ an arbitrary matching of vertices not in $M$, 
				\begin{align}
				\forall (i,j)\in M, Y_i^{(k+1)}&\ge Y_j^{(k)}+2\\
				\forall (i,j)\in N, \rc2 Y_i^{k+1}+\rc2 Y_j^{(k+1)} &\ge \rc 2 Y_i^{(k)} + \rc2 Y_j^{(k)}
				\end{align}
				Sum up inequalities and take expectation. Use $|\E XY - \E X \E Y|\le \sqrt{\Var(X)\Var(Y)}$.
				\begin{align}
				\sum \E Y_i^{(k+1)} - \sum \E Y_j^{(k)}
				& = 2 \pa{\sum \E Y_i^{(k+1)} \E L_i - \sum \E Y_j^{(k)} \E R_i}\\
				& \le 2\ub{\pa{\sum \E Y_i^{(k+1)}L_i+\cdots}}{4|M|} - n O(1) (\max_{j\in H^{k+1}(i)} + \max_{i\in H^k(j)})[(\E (X_i-X_j)^2)^{\rc 2}].
				\end{align}
	* Reduce to case $\sum d(i,j) \ge 0.1n^2$. Let $\de = \rc{n^2} \sum_{i,j} d(i,j)$. 
		* Heavy cluster: (If there is a cluster that has a constant fraction of vertices, we get a good $A$.) If $A=B_{\de/4}(i), |A|\ge \Om(n)$, then $|A|\sum d(j,A) \ge \Om(1) \sum d(i,j)$.
			* $\de \le \rc{n^2} \sum (d(i,A)+d(A,j) + \diam(A))\le \fc\de2 + \rc n \sum 2d(i,A)$.
		*   Heavy cluster or well-spread: Either
			1. There exists $i\in [n]$, heavy cluster around $i$, or
			2. There exists $U\subeq [n]$, $|U|=\Om(n)$, Gaussian $Y$, $\E Y_i^2\le 1$, $\sum \E (Y_i-Y_j)^2\ge 0.05$, $\al=\Om(\de)$, $\forall i,j\in U, d(i,j) =\al \E(Y_i-Y_j)^2$.
			*  If not (1), then by averaging principle there is $k\in [n]$ such that $\sumo in d(i,k)\le \de n$. (Q: **WHY? This seems opposite**.) Lower bound $\sum_{i,j\in U=B_{2\de}(k)} d(i,j)$ by $(i, j\in B_{2\de}(k) \be B_{\de/4}(i))$. Define $X$ as having the same first 2 moments as $\mu$, and let $Y_i = \fc{X_i-X_k}{\sqrt{2\de}}$.
2.  Region growing. Suppose there exists $A\subeq [n]$ such that $|A|\sumo in d(i,A) \ge \De \sumo{i,j}n d(i,j)$. Then 
	$$\ph(G) \le \rc{\De} \ph_{\mu}(G).$$
	In fact, $\De \ph(G)\le \ph_{\mu}(G, B_t(A))$ for some $t$.
	* Define $\mu'$ by: Choose $t\sim U_{[0,1]}$ and let $x_i'=1\iff d(i,A)\le t$. 
	* Numerator: Then $d(i,A)\le d(j,A) \implies \E_{\mu'} f_G \le \wt{\EE_{\mu}} f_G$.
	* Denominator: $\EE_{\mu'} |x'|(x-|x'|) \ge |A| \sum (1-x_i') \ge \De \sum d(i,j) = \De \wt{\EE_{\mu}} |x|(n-|x|)$.
	* Combine.

## 5 Bayesian view

### 5.1 Bayesian view

We want $\min_{x\in B^n}f$; degree $d$ SoS finds $\min_{\deg \mu = d} \wt{\EE_{\mu}} f$.

Often the global minimum is at a single point, but pseudodistribution pretends to be high entropy over nonexistent elements, "supported on unicorns".

### 5.2 General domains

Replace $B^n$ with $\Om\subeq \R^n$ defined by polynomial inequalities $A=\{f_1\ge 0,\ldots, f_m\ge 0\}$. Questions:

* Are these inequalities feasible, $A\ne \phi$?
* Is $g\ge 0$ on $A$?

A degree $l$ SoS proof is $g=\sum_{S\subeq [n]} p_S \prod_{i\in S} f_i$, where $p_S$ is SoS, each $\deg(p_S \prod_{i\in S} f_i)\le l$. Write $A\vdash_l \{g\ge 0\}$. (There is a SoS proof of degree $d$ of $g\ge 0$ from $A$.)

**Theorem** (Positivstellensatz). Every $A$ is either feasible, or $A\vdash_l\{-1\ge 0\}$ for some $l\in \N$.

SoS has inference rules for addition, multiplication (add degrees), transitivity (multiply degrees), and substitution (multiply with degree of substituted $H$).

**Lemma**. Let $\mu$ have finite support, $\wt{\EE_{\mu}} 1=1$. $\mu$ is degree $d$ pd iff $\wt{\EE_{\mu}} ((1,x)^{\ot d/2})((1,x)^{\ot d/2})^T$ is psd.

*Proof*. Writing $p = \an{v,(1,x)^{\ot d/2}}$, $\wt{\EE_{\mu}} p^2 = \wt{\EE_{\mu}} \an{v,(1,x)^{\ot d/2}}^2$.

Write $\mu\vDash_l A$ (satisfy $A=\{f_i\}$ at degree $l$) if for all $S\subeq [m]$, every SoS with $\deg h + \sum_{i\in S} \max(\deg f_i,l)\le d$ satisfies $\wt \E_\mu h \prod_{i\in S}f_i\ge 0$ for all SoS's $h$. (Ex. for $A=\{f\ge 0\}$, take $S=\{f\}$.)

**Question: how does this mesh with $B^n$ definition?**

**Theorem** (Duality). Suppose $\ve{x}^2\le M$ is in $A$. For all $d\in \N$, $f\in \R[x]_{\le d}$, either

* for all $\ep>0$, there exists degree $d$, $A\vdash_d \{f\ge -\ep\}$.
* $\exists \deg \mu=d$, $\mu \vDash A$, $\wt{\EE_{\mu}} f\le 0$. (I.e., $\exists \mu, \mu\vDash A$, $\wt{\EE_{\mu}} f\le 0$.)
	* If $A$ is a variety, then we can replace with $f \ge 0$ and $f<0$.

*Proof*. Consider 2 cases.

* $f\in \ol C$, $C$ the cone of the $g$ such that $A\vdash_d \{g\ge 0\}$. Then $(1-\ep) f+ \ep g\in C$. $f\ge -\ep(g-f) \ge \ep M'$.
<!--Moving $f$ in the positive direction will eventually -->
* Else there is separating linear functional. $\phi(1)>0$ because moving $f$ in direction of 1 eventually makes it in $C$. Rescale so $\phi(1)=1$.

Think of $\vdash$ as a proof, and $\mu \vDash$ as saying $\mu$ is a model.
<!--as saying, under a certain $\mu$, the conditions are in fact satisfied.-->

**Lemma**

1. (Soundness) $\mu \vDash_l A, A\vdash_{l'} B\implies \mu \vDash_{ll'}B$.
2. (Completness) If $\forall \deg \mu=d, (\mu\vDash_l A \implies \mu\vDash_{l'} B)$, then $\forall \ep>0, A\vdash_d B_{\ep'}$ (weaken each constraint by $\ep$).

**Theorem** (SoS algorithm). 

* Given satisfiable $A$, output in time $n^{O(d)}$ a degree $d$ pseudo-distribution satisfies $\mu\vDash A$ up to error $2^{-n}$.
* (For varieties) Given a basis for $\R[x]_{\le d} \cap I(\Om)$, can find a degree-$d$ Sos proof, or $\mu$ with $\wt{\EE_{\mu}}\le 2^{-n}$.

#### Exercises

1. NA
2. NA
3. Let $r$ be argmin. Write $f(r) + (x-r)^2q(x)$. Repeat.
4. $\{\ve{x}^2\le 1\} \vdash_d \{-1\le x_i\le 1\}$. Use these.

### 5.3 Planted clique hardness

Planted clique: Take $G(n,\rc 2)$, add a random $\om$-clique.

Whp the max clique of $G(n,\rc 2)$ is of size $c\ln(n)$, so for $\Om(\ln n)$ size cliques there is quasipoly algorithm.

**Theorem** (SoS hardness). Let $d(n)$ be a function. There is $c$ such that for $\om = n^{\rc 2 - c\pf{d}{\ln n}^{\rc 2}}$ and large enough $n$, wp $1-\rc n$ over $G\sim G(n,\rc 2)$, there is a degree $d$ pseudodistribution $\mu$ over $B^n$ that is consistent with $x_ix_j=0$ for every $i\nsim j$ in $G$ and such that $\wt{\EE_{\mu}} \sumo in x_i\ge \om$.

In contrast with Max-3XOR, in planted clique, each variable has a weak but GLOBAL effect on all other variables.

**Definition**. A degree $d$ pseudoexpectation map is $G\mapsto \mu_G, \deg (\mu_G)=d$. It is *pseudocalibrated with respect to $f$* if
$$\sum_{G\sim G(n,\rc 2)} \wt{\EE_{G}} f_G = \EE_{(G,x)\sim G(n,\rc 2,\om)}f_G(x).$$
($x$ is the characteristic vector of the planted clique.)

(Q: **Why is the LHS $G(n,\rc2)$ rather than $G(n,\rc 2,\om)$?**)

Example: If $f_G(x)=x_{17}$, then a first estimate could be $\wt E x_{17}=\fc{\om}n$. But if we want to get higher degree functions, ex. covariance with degree, right, then we should not each $\wt E x_i$ to $\fc{\om}n$.

*Proof* (Sketch). Let $\mu(G,x) = \mu_{planted}(G,x)_{\deg_x\le d, \deg_G\le \tau}$. Show it still satisfies normalization, etc. Hrd part is psd-ness.

**Finish**

#### Exercises

1. 
2. 
3. 
4. 
5. 
6. $\EE_{G\sim G(n,\rc2)}\wt{\EE_G} p_G^2 = \EE_{(G,x)\sim G(n, \rc 2,\om)} p_G^2(x)$. So all $=0$. Now $a\wt{\EE_G} p_G \le a^2 \wt{\EE_G} p_G^2 + 1$, take $a\to \iy$.
7. 

## 6 Sphere

*   Tensor PCA: given $\E X^{\ot d}$, find $\max \E\an{X,x}^d$.
*   Sparsest vector in subspace.
	* Sparseness is approximated by $\fc{\ve{v}_q}{\ve{v}_p}$, $q>p$.
		* $q=\iy, p=1$ onlygives $\wt O(\sqrt n)$ approximation
		* $q=2,p=1$ is good by inefficient to compute.
		* $q=4,p=2$ is amenable to SoS
* Quantum
	* Separable $v=ww^T$, $v\in \R^{N=M^2}$.
	* Quantum measurement: $N\times N$ matrix $M$, $M\preceq I$, $\Pj(M\text{ accepts }\rh) = \Tr(M\rh)$.
	* $\ep$-separable: $|\Tr(M\rh)-\Tr(M\rh')|\le \ep$ for all $M$.
	* Quantum separability problem: separable vs. not $\ep$-separable.
		* Under ETH, needs $N^{\Om_\ep(\ln N)}$ timme.
	* Best separable state: given $1>c>s>0$, decide: there exists $\rh: \Tr(M\rh)\ge c$, $\rh$ separable, or for all separable, $\Tr(M\rh)\le s)$. 
		* For $(1,1-\ep)$ this is QAM(2). $M$ is the verifier receiving quantum states from provers guaranteed to be non-entangled.
		* Known: $QMA(2)\in EE$. Quasipoly algorithms places in EXP.
		* There always exists a pure state maximizing acceptance probability, so want $\max_{\ve{x}=1} \Tr(M(xx^T)^{\ot 2})$.

### Tensor decomposition (11/14)

Tensor decomposition with and without SoS

Plan

* Problem definition
* Application (mixture of Gaussians)
* Simple algorithm
* SoS algorithm

Problem

* Unknown: $a_1,\ldots, a_n\in \R^d$.
* Given: $\sumo in (1,a_i)^{\ot k}$. I.e., we get $\pa{\sumo in a_i^{\ot l},l\le k}$.
<!--how important is 1, all components same-->
* Goal: Find vectors close to $a_1,\ldots, a_n$.
<!--can't hope polytime in full generality: conditions on $a_1,\ldots, a_n,k$. Depends on assumptions. Most cases, not a big difference. Simpler if lower moments. -->
* Question: Under what conditions on the geometry of $a_1,\ldots, a_n$ and $k$ can we solve this problem?
* Simplest case: $a_1,\ldots, a_n$ are orthogonal. $k=3$ is enough.
	* Also: $a_1,\ldots, a_n$ linearly independent. $k=3$ is enough, $k=2$ is not.
	
Application

* Unknown: probability distribution $D$ over $\R^d$, uniform mixture of $N(a_1,I),\ldots, N(a_n,I)$.
* Given (polynomial number of) samples of $D$, find $a_1,\ldots, a_n$.
	
Algorithm (high-level)

* Use samples to estimate $\sumo in a_i^{\ot 3}$. (Possible for many families of distribution, e.g. Latent Dirichlet, topic modeling)
* Use tensor decomposition to find $a_1,\ldots, a_n$.

Estimate $\sum a_i^{\ot 3}$ from samples

*   Compute empirical moments from samples $y_1,\ldots, y_N$ from $D$.
	$$ \wt M_l = \rc N \sumo iN y_i^{\ot l}. $$
*   $\E \wt M_l = M_l = \EE_{y\sim D} y^{\ot l}$.
	For $N\gg d^l$, $\wt M_l\approx M_l$ with high probability.
*   Estimate $\sum a_i^{\ot3}$ from $\wt M_i\approx M_i$ for $i=1,3$.
*   \begin{align}
	M_1 &=\EE_{y\sim D} y = \rc n \sum a_i\\
	M_2 &=\EE y^{\ot 2} = \rc n \sum \E_{g\sim N(0,I)} (a_i+g)^{\ot 2}\\
	&= \rc n \sum a_i^{\ot 2} + \E g^{\ot 2}\\
	&= I + \rc n \sum a_i^{\ot 2}\\
	M_3 &= \rc n \sum \EE_{g\sim N(0,I)}(a_i+g)^{\ot 3}\\
	&= \rc n \sumo in [a_i^{\ot 3} + \ub{\E a_i^{\ot 2}\ot g}{0} + \ub{\E a_i \ot g^{\ot 2} + a_i\ot g\ot a_i + a_i^{\ot 2}\ot g}{a_i\ot I + I \ot a_i + \sumo id e_i\ot a_i \ot e_i}]\\
	&= \rc \sum a_i^{\ot 3} + \ub{\pa{\rc n \sum a_i}\ot I}{\text{already estimated}} + \pat{symmetric terms}
	\sum a_i^{\ot 3} &= \pat{simple function of $M_1,M_3$}.
	\end{align}

Random contraction algorithm (Jeinrich)

* Choose $g\sim N(0,I)$
* Compute contraction ($(I\ot I\ot g^*) M_3=A$)
* Compute top eigenvector of $A$. <!--$A_{\{1\},\{2\}}$-->

Consider the orthogonal case first. Note that the most difficult case is if all the norms are the same (if they are all different, we can use SVD).

... (see notebook)

Decompose random gaussian along 2 directions. If correlation large ,more likely to recover $e_1$.

**Claim**. $\E_g \ve{(I^{\ot 2}\ot g^T)X} \le \sqrt{\ln d} \si$ where $\si = \max\{\ve{X}_{13,2},\ve{X}_{1,23}\}$.

<!-- how apply syntactically. both are linear functions of $g$. -->
This is a linear function of $g$, we can write it as in the concentration inequality.

\begin{align}
(I^{\ot 2} \ot g^T)X &=\sum g_i \ub{(I^{\ot 2} \ot e_i^T)X}{A_i}\\
\ve{X} &=\ve{X^TX}^{\rc 2} = \ve{XX^T}^{\rc 2}\\
\sum A_iA_i^T &= X_{3,12}^T X_{3,12}\\
\sum A_i^TA_i &= X_{1,23}^T X_{1,23}
\end{align}
(check the indices).

Davis-Kahan: $\ve{A-aa^T}\le o(1) \ve{a}^2$ implies that the top eigenvector of $A$ is $o(1)$ close to $a$. So top eigenvector of $(I\ot I\ot a^T)X$ is close to $a$.

**Theorem**. Let $a_1,\ldots, a_n\in R^d$, $\ve{a_i}=1$. Suppose $\sum a_i a_i^T \preceq \si I$ ($\si$ is overcompleteness), $\max_{i\ne j} |\an{a_i,a_j}|\le \rh$. Then, given $\sumo ih a_i^{\ot3}$, can recover vectors close to $a_1,\ldots, a_n$ in polytime whenever $\rh \si^2=o(1)$.

E.g., $\si=d^{0.1}$, $\rh = d^{0.3}$. This is satisfied by $d^{1.1}$ random unit vectors, or $n=d^{1.24}, (d^{.24},d^{-.5})$.
<!-- ex. $\si$ random ortho bases, $\rh$ close to $\sqrt d$. When $\si\ll d^{\rc 4}$. Up to $d^{0.1}$. Spectral noise $d^{0.1}$. Condition on $g_1$ large enough to swallow, $d^{-O(c^2)}$. Exponential in $d^{.1}$-->
<!-- can this go up to 3/2? If $\rh=d^{-.5}$, $\si$ up to $d^{.5}$, would imply for random unit. -->

This algorithm can be poly in $d$ and $n$.

Open question: Is this true for $\rh\si <o(1)$? This would imply for $d^{1.5}$ random vectors. (Though there is another argument that can give up to $d^{1.5}$.) (Maybe a $-\ep$ in exponent.)

<!-- isotropic position -->

Algorithm: given $M_3$,

1.  Compute p.d. $\mu$ over unit sphere of $\R^d$ so as to maximize $\an{\wt\E_{\mu} x^{\ot 3}, M_3}$, which satisfies
	$$\ve{\wt \EE_{\mu} x^{\ot 6}}_{1234, 56}\le 2.$$
2.  Run random contraction on $\wt\EE_{\mu} x^{\ot 6} = \wt\EE_{\mu} (x^{\ot 2})^{\ot 3}$. (Letting $X=\wt \E(x^{\ot 2})^{\ot 3}\in (\R^{d^2})^{\ot 3}$, this is $\ve{X}_{12,3}$.)

Use SoS to find tensor which we can run random contraction on, living in higher-dimensional space.

Under conditions of theorem, let $b_i=a_i^{\ot 2}$, can show that random contraction works for $X=\sum b_i^{\ot 3}$. (Show $\ve{X}_{12,3}\le  O(1)$ if $\rh\si^2\ll 1$.) Recover the $b_i$'s, then recover $a_i$'s. But we don't get $b_i^{\ot 3}$, we just get $a_i^{\ot 3}$. SoS: given $a_i^{\ot 3}$ it's computing $b_i^{\ot 3}$. Find pseudodistribution matching 3rd moment and outputs 6th moments.

The intended $\mu$ is uniform over $a_1,\ldots, a_n$. $\wt \EE_{\mu} x^{\ot 3} = \rc n \sum a_i^{\ot 3}$ and $\E x^{\ot 6} = \rc n \sum a_i^{\ot 6} = \rc X$.

Philosophy: first prove statement for distributions, then verify that the steps fall in SoS proof system.8

### Tensor decomposition (11/17) talk

* 3rd moment enough for $n\le d$ linearly independent vectors
* 4th moment for $n\le \fc{d^2}{10}$ generic vectors (e.g., randomly perturbed)

When are 3rd moments enough for overcomplete tensors, $n\gg d$? Robustness against noise in input tensor?

We use lower-degree moments, have better error robustness, and develop new improved analyses of classical tensor decomposition algorithms.

SoS a priori not practical but we can extract practical algorithms

Dream up higher-degree moments and apply classical algorithms.

Algorithm: Magic box lifts 3rd moments to 6th moment, $M_3=\sum_i a_i^{\ot 3}$ to $M_6=\sum_i a_i^{\ot 6}$. Then apply Jennrich to get $a_i^{\ot 2}$.

It's not even clear this is information theoretically possible!

Ideal implementation: find $D$ over unit sphere subject to $\EE_D x^{\ot 3} = \rc n M_3$, then use $\EE_D x^{\ot 6}$. Claim is that this is $\approx \rc n M_6$. 

Key inequality: by niceness of vectors, $a_1,\ldots, a_n$ are approximate global maximizers. For all $x\in \bS^{d-1}$, 
\begin{align}
P(x) &\le \max_{i\in [n]} \an{a_i,x} + O(\rh si^2).\\
1 &\approx \EE_D \sumo in \an{a_i,x}^3\\
\EE_{D} P(x) &\ge 1-o(1).
\end{align}
Also close to uniform over $a_i$.

Remaining questions:

1. Find $D$? Relax to pseudo-distributions.
2. Can Jennrich tolerate this error (Frobenius)? No. Fix by adding maximum entropy constraint $\ve{\E_D x^{\ot 4}}_{\text{spectral}}\le \fc{1+o(1)}n$.

SoS is slow. Instead find direct algorithm to fool Jennrich,
$$
\sum_{ijk} \an{a_i,a_k}\an{a_j,a_k}
(a_i\ot a_j) \ot (a_i\ot a_j) \ot a_k\approx \sumo in a_i^{\ot 5} = M_5.
$$

Tensor structure to implement Jennrich in time $O(d^{1+\om})$.

Open: 3 tensors with $d^{1+\ep}$ generic components, $d^{1.5+\ep}$ random components?

Tensor power: fewer guarantees. Does better in amount of time needed to reduce error.

## Reading

* [Windows on theory](https://windowsontheory.org/2016/08/27/proofs-beliefs-and-algorithms-through-the-lens-of-sum-of-squares/), [h](http://scrible.com/s/2KMCS)
