---
title: (WJ08) Graphical Models, Exponential Families, and Variational Inference
published: 2016-09-30
modified: 2016-09-30
tags: probabilistic models, graphical models, exponential families, variational inference
type: notes
showTOC: True
---

# 1 Introduction

Inference: computing marginal probabilities.

# 2 Graphical models

Probability distributions that factorize according to underlying graph.

## 2.1 

* Vertices $s\in V$ correspond to random variables $X_s\sim \mathcal X_s$.
* DAG graphical model: $\pi(s)$ parents, $p(x) = \prod_{s\in V} p_s(x_s|x_{\pi(s)})$.
*   Undirected graphical model: Cliques have compatibility function $\psi_C:(\bigot_{s\in C}\mathcal X_s)\to \R_+$.
	$$ p(x) = \rc{Z}\prod_{C\in \mathcal C} \psi_C(x_C).$$
	* A DAG can be thought of as undirected by having node-parent groups as cliques. 
* Let $F$ be the set of factors for a graphical model (node-parents for DAGs, $\mathcal C$ for undirected GMs). The factor graph is the bipartite graph $(V,F,E')$.

## 2.2 Conditional independence

* Undirected: $X_A\perp X_B| X_C$ if there is no path from $A$ to $B$ removing $C$.
* Directed ?? See Pearl?

## 2.3 Statistical inference and exact algorithms

Computational inference problems

* Compute likelihood of observed data
* Compute marginal $p(x_A)$
* Compute conditional $p(x_A|x_B)$.
* Compute mode $\amax_{x\in \mathcal X^m} p(x)$.

For undirected graphs without cycles or directed graphs where each node has a single parent, problems can be solved by recursive message-passing algorithms (cf. DP). 

* Marginals: sum-product
* Modes: max-product
* Junction tree algorithm, exponential in treewidth.

## 2.4 Applications

* Hierarchical Bayesian model
* Contingency table analysis ($(X_1,\ldots, X_m)$, each takes $r$ possible values). A contingency table is a $r\times \cdots \times r$ tensor.
    * Ex. given 3 variables, are they independent, or pairwise independent, or is there 3-way interaction? Note the undirected graph can't distinguish the last two.
* Constraint satisfaction and combintorial optimization
	* $\psi_{stu}=1$ iff satisfied; get uniform distribution over satisfying assignments.
	* Random 3-SAT instances tend to have locally tree-like structure. Phase transition?
	* Survey propagation algorithm.
* Bioinformatics
	* Hidden Markov model
		* Junction tree becomes forward-backward algorithm, Viterbi algorithm (for MAP).
	* Phylogeny
	* Hidden Markov phylogeny
	* Factorial HMM: multiple chains coupled by link to common set of observed variables.
* Language and speech processing
	* Also HMM.
	* Coupled HMM (fuse pairs of data streams, e.g. audio and lip)
	* Bag-of-words, ex. latent Dirichlet allocation
* Image processing and spatial statistics	
	* 2d lattice, potential functions enforce local smoothness
	* Multiscale quad trees
* Error-correcting coding
	* Parity-check codes. Codewords are those satisfying all parity relations. 
		* Most successful decoder for many graphical codes is sum-product algorithm. Martingale arguments [160, 199]

## 2.5 Exact inference algorithms

Sum-product and junctio-tree algorithms are DP algorithms based on method for sharing intermediate terms.

Transform directed to undirected graphical model by making it **moral**: parents of each child are linked.

Tree-structured graph:
For $u\in N(s)$ let $T_u=(V_u,E_u)$ be the component of $u$ after deleting $s$.
\begin{align}
p(x) &= \rc Z \prod_{s\in V} \psi_s(x_s) \prod_{(s,t)}\psi_{st}(x_s,x_t)\\
\mu_s(x_s) & = \ka \psi_s(x_s) \prod_{t\in N(s)} M_{ts}^* (x_s)\\
M_{ts}^*(x_s) &= \sum_{x_{V_t}'} \psi_{st}(x_s,x_t') p(x_{V_t}'; T_t)
\end{align}
<!--p(x_{V_t}; T_t) &\propto \prod_{u\in V_t} \psi_u(x_u)-->
Compute marginals for all nodes simultaneously in parallel. $M_{tu}(x_u)$ is passed from $t$ to $u\in N(t)$.
$$
M_{ts}(x_s) \leftarrow \ka \sum_{x_t'} \ba{
\psi_{st}(x_s,x_t') \psi_t(x_t') \prod_{u\in N(t)\bs \{s\}} M_{ut}(x_t')
}.
$$
(To see this holds for $M^*$ up to constant, expand out the $p(x_{V_t}';T_t)$.) 
For tree-structured graphs, converges to unique fixed point after finite iterations, up to normalization equal to $M_{ts}^*(x_s)$.
(**Why?** TODO: derive this.)

Max-product: replace $\sum$ with max. Backtracking computes the argmax.

(Updates apply to arbitrary commutative semirings.)

A clique tree is an acyclic graph whose nodes are maximal cliques of $G$. Running intersection property: for any 2 clique nodes $C_1$, $C_2$, all nodes on the unique path joining them contain $C_1\cap C_2$. Then it's a **junction tree**.

$G$ has a junction tree iff it is triangulated.

1. Triangulage $G$. (HOW)
2. Form junction tree $G$. (HOW? Naive way is take 2 vertices, sort into those in between, recurse.)
3. Run tree inference on junction tree.

The separators are the intersection of cliques adjacent in the junction tree.

Passing a message from $B$ to $C$ (through $S$):
\begin{align}
\wt \phi_S(x_S) &\leftarrow \sum_{x_{B\bs S}} \phi_B(x_B)\\
\phi_C(x_C) &\leftarrow \fc{\wt\phi_S(x_S)}{\phi_S(x_S)} \phi_C(x_C).
\end{align}

After a round of message passing, clique potentials are proportional to marginal probabilities.

For a separator set $S$, let $d(S)$ be the number of maximal cliques to which it is adjacent.
$$p(x) = \fc{\prod_{C\in \mathcal C}\mu_C(x_C)}{\prod_{S\in \mathcal S} [\mu_S(x_S)]^{d(S)-1}}.$$
Ex. for $x_1\to x_2\to x_3$, $p(x) = \fc{p(x_1,x_2)p(x_2,x_3)}{p(x_2)}$.

**Proposition 2.1**. A candidate set of marginal distributions $\tau_C, C\in \mathcal C, \mathcal S$ is globally consistent iff
\begin{align}
\forall S, \sum_{x_S'} \tau_S(x_S') &= 1\\
\forall S\subeq C, \sum_{x_C'|x_S'=x_S} \tau_{C}(x_C') &=\tau_S(x_S).
\end{align}

Computational cost grows exponentially in size of maximal clique in junction tree. Minimal size of maximl clique over all possible triangulations $-1$ is **treewidth**.

Alternate definition (why equivalent?): covered by subgraphs of $k+1$ nodes in treelike fashion.

## 2.6 Message-passing algorithms for approximate inference

* Sum-product message-passing applied to graph with cycles: loopy sum-product or BP.
* Naive mean field algorithm
	* Ex. Ising model. Apply Gibbs sampling to update a node.
	* For dense graph, replace neighbors by their means. Hope LoLN works.
	
# 3 Exponential families

## 3.1 Exponential representations via maximum entropy

Let $\{\phi_\al\}$ be a family of functions (called **potential functions** or **sufficient statistics**). Say $p$ is consistent with the data if
$$ \EE_p [\phi_\al (X)] = \wh \mu_\al.$$
Ex. $\phi=\{x,x^2\}$. The maximum entropy distribution is
\begin{align}
p^*:&= \amax_{\EE_p [\phi_\al (X)] = \wh \mu_\al} H(p)\\
H(p):&= -\int_X p(x) \ln p(x)\,\nu(dx).
\end{align}
Under certain conditions, the optimal solution is an exponential family.

## 3.2 Basics of exponential families

The **exponential family** associated with $\phi$ is the parametrized collection of density functions
\begin{align}
p_\te(x_1,\ldots, x_m) &= \exp[\an{\te,\phi(x)} - A(\te)]\\
A(\te) &= \ln \int_{X^m} \exp[\an{\te, \phi(x)}]\nu(dx).
\end{align}
($A$ is the **log partition** or **cumulant** function.) Here $\te\in \Om:=\set{\te\in \R^d}{A(\te)<\iy}$. A **regular** exponential family has $\Om$ open. Say $\phi$ is minimal if $\phi\cup \{1\}$ is linearly independent; otherwise it is overcomplete.

## 3.3 Examples of graphical models in exponential form

1. Ising model: $p_\te(x\in \{\pm 1\}^V) = \exp\ba{\sum_{s\in V} \te_s x_s + \sum_{(s,t)\in E} \te_{st}x_sx_t-A(\te)}$.
2. Potts model: Nodes take values in $\{0,\ldots, r-1\}$. Sufficient statistics are $\one_{st;jk}(x_s,x_t) = \one_{x_s=j, x_t=k}$. (Note this is overcomplete---the standard overcomplete representation. Note the state space of nodes can also be different.) 
    * Metric labeling problem: $\te_{st;jk} = -\rh(j,k)$ for $\rh$ a metric.
	<!-- cf. CSP -->
3. Sufficient statistics $x_s,x_s^2, x_sx_t, (s,t)\in E$. $\Te = -(\E xx^T)^{-1}$ has $(s,t)$ entry 0 for $(s,t)\nin E$.
	* Multivariate Gaussian is $\exp\ba{\an{te,x} + \rc 2 \Tr(\Te xx^T) - A(\te, \Te)}$. ($\Om$ consists of symmetric $\Te\prec 0$.)
<!-- question: are $\rh$-correlated Gaussians included here? What about $\an{x_i,g}$? -->
4. Mixture models: Ex. mixture of Gaussians. Let $\one_j[x_s], j\in [0,r-1]\cap \N$ be sufficient statistics with parameters $\al_{s;0},\ldots, \al_{s;r-1}$.
	*   Let the distributions have parameters $\ga_{s;i}, \ga_{s;i}'$. The density is 
	    $$\propto \exp\ba{\sumz j{r-1} \al_{s;j} \one_j(x_s) + \sumz j{r-1} \one_j(x_s) [\ga_{s;j}y_s+\ga_{s;j}'y_s^2]}.$$
5. Latent Dirichlet Allocation: $\al \to U\to Z \to W, \ga \to W$. 
	* Topic distribution: $U$ follows Dirichlet distribution with parameter $\al$.
	* Topics of document: $Z$ multinomial drawn from $U$.
	* Words: $W$ multinomial drawn from the topic distribution of $Z$. $\ga$ specifies distribution of words in topics. 
	*   Equations
		\begin{align}
		\Pj(W=j|Z=i;\ga) &= \exp(\ga_{ij})\\
		p_\ga(w|z) &= \exp\ba{\sumz i{r-1}\sumz j{k-1} \ga_{ij} \one_i(z)\one_j(w)}\\
		p(z|u) &\propto \exp\ba{\sumz i{r-1} \one_i(z)\ln u_i}.\\
		p_\al(u) &= \exp\pa{\sumz i{r-1} \al_i\ln u_i}.
		\end{align}
6. Hard-core constraints: subset of configurations that are forbidden. Ex. decoding linear codes, combinatorial optimization problems.
	*   To express as exponential family, take density wrt appropriate bse measure. Ex. restrict to valid codewords.
		\begin{align}
		p(y_i|x_i) &= \exp(\te_ix_i-\ln (1+\exp(\te_i)))\\
		\te_i &=(2y_i-1) \ln \prc{1-\ep}{\ep}.
		\end{align}
		for BSC.

Simple distributions

| Family | $(X,\nu)$ | Sufficient statistics |
|---|---|---|
| Bernoulli | $\{0,1\}$ | $x$ |
| Gaussian | $\R$ | $x,x^2$ |
| Exponential | $(0,\iy)$ | $x$ |
| Poisson | $\N$ | $x$ |
| Beta | $(0,1)$ | $\ln x, \ln (1-x)$ |

## 3.4 Mean parameterization and inference problems

Any exponential family has alternative parameterization in terms of a vector of **mean parameters**.

Realizable mean parameters:
$$\mathcal M :=\set{\mu\in \R^d}{\exists p  \forall \al, \EE_p [\phi_\al(X)] = \mu_\al}.$$

Ex. Gaussian MRF mean parameters are $\Si=\E[XX^T]$ and $\mu=\E[X]$. Realizable parameters are those with $\Si-\mu\mu^T\succsim 0$. $\mathcal M$ is always convex. (Take the convex combination of the distributions.) When $|X^m|$ is finite, $\mathcal M$ is a convex polytope,
$$ \mathcal M = \conv \set{\phi(x)}{x\in X^m}.$$

Ex. Ising mean parameters 
\begin{align}
\mu_s &= \EE_p[X_s]=\Pj(X_s=1)\\
\forall (s,t)\in E, \mu_{s,t} &= \EE_p[X_sX_t] = \Pj[(X_s,X_t)=(1,1)]
\end{align}
The set $\mathcal M$ is the set of singleton and pairwise marginal probabilities that can be realized by some distribution over $\{0,1\}^m$, call the **correlation/cut polytope**. For $\cdot -\cdot$ this is $\conv\{(0,0,0),(1,0,0),(0,1,0),(1,1,1)\}$.

Ex. For binary linear codes, $\mathcal M$ is the codeword polytope, convex hull of codewords.
<!-- distance $\ge 1$ from odd-parity vertices-->

Ex. For the standard overcomplete representation, $\mathcal M$ is the **marginal polytope**.

**Q: Codeword polytope can be converted to MRF?**

The facet complexity---number of constraints required to express---depends on the graph structure. For non-trees, this grows quickly.

* Forward mapping: $\te\mapsto \mu$. Inference.
* Backward mapping: $\mu\mapsto \te$. Finding the MLE is equivalent (under some conditions) to computing the backward mapping.

## 3.5 Properties of $A$

**Proposition**: $A(\te)=\ln \int_{X^m} \exp[\an{\te,\phi(x)}] \,\nu(dx)$ has derivatives of all orders and is convex on $\Om$, strictly convex if representation is minimal.
\begin{align}
A_{\te_\al} &= \EE_{\te}\phi_\al(X)\\
A_{\te_\al\te_\be} &= \Cov(\phi_\al(X),\phi_\be(X))\\
\end{align}

*Proof*. DCT, differentiate through integral.

The range of $\nb A:\Om \to \R^d$ is contained in $\mathcal M$.

Questions:

1. When is $\nb A$ one-to-one?
    * Iff exponential representation is minimal.
	* *Proof*. Minimal implies strict convexity which gives $\an{\nb A(\te^1) - \nb A(\te^2), \te^1-\te^2}$.
	* If not minimal, there is 1-to-1 correspondence after modding out by nullspace.
2. When does image of $\Om$ fully cover $\mathcal M$?
	* When $\Om$ is open, $\nb A(\Om)=\mathcal M^{\circ}$.
	* Corollary: except for boundary points, all mean parameters realizable by some distribution can be realized by a member of the exponential family.
	* *Proof*.
		* Sufficient to prove for minimal $\phi$. (Just reparametrize.)
	    * $\nb A(\Om)\subeq \mathcal M^{\circ}$: This follows from $\nb A(\Om)\subeq \mathcal M$, $\Om$ open, and $\nb A$ strictly convex.
		* $\mathcal M^{\circ}\subeq \nb A(\Om)$: WLOG, $0\in \mathcal M^{\circ}$ and we show $0\in \nb A(\Om)$. 
		*   Let $H_{\ga,\ep} = \set{x\in X^m}{\an{\ga,\phi(x)}\ge \ep}$. For small enough $\ep$, this has measure $>0$. Now 
		    \begin{align}
			A(\te^0 + t\ga)
			&\ge \ln \int_{\R^n} e^{\an{\te^0 + t\ga,\phi(x)}}\nu(dx)\\
			& \ge t\ep + C_0.
			\end{align}
			so taking $t\to \iy$ this blows up. This shows that $A$ has a minimum where $\nb A=0$, i.e., $0\in \nb A(\Om)$.

## 3.6 Conjugate duality: maximum likelihood and maximum entropy

Conjugate dual function

$$A*(\mu) :=\sup_{\te\in \Om} [\an{\mu, \te} - A(\te)].$$

Let $\te(\mu)$ be such that $\EE_{\te(\mu)} [\phi(X)] = \nb A(\te(\mu)) = \mu$.

**Theorem**. 

1.  The conjugate dual function satisfies
    $$
	A^*(\mu) = \begin{cases}
	-H(p_{\te(\mu)}), &\text{if }\mu\in \mathcal M^{\circ}\\
	\iy, &\text{if }\mu\nin \ol{\mathcal M}\\
	\lim_{\mu^n\to \mu} A^*(\mu^n).
	\end{cases}
	$$
2. $A(\te) = \sup_{\mu\in \mathcal M} [\an{\te,\mu} - A^*(\mu)]$. (This holds for any convex function?)
3. The sup is attained uniquely at $\mu=\mu(\te)$.
4. $\nb A^*$ is the inverse of $\nb A$.

| Family | $\Om$ | $A(\te)$ | $\mathcal M$ | $A^*(\mu)$ |
|---|---|---|---|
| Bernoulli | $\ln(1+e^{\te})$ | $[0,1]$ | $-H(\mu)$ |
| Gaussian | $\R\times \R_{<0}$ | $-\fc{\te_1^2}{4\te_2} - \ln (-2\te_2)$ | $\set{(\mu_1,\mu_2)}{\mu_2-\mu_1^2}>0$ | $-\rc 2 \ln (\mu_2-\mu_1^2)$ |
| Exponential | $(-\iy,0)$ | $-\ln (-\te)$ | $(0,\iy)$ | $-1-\ln (\mu)$ |
|Poisson | $\R$ | $e^\te$ | $(0,\te)$ | $\mu\ln \mu-\mu$ |

## 3.7 Computational challenges with high-dimensional models

We can compute $A,\mu$ by solving the variational problem.

The optimization problem is a concave function over a convex set---what's hard?

* $\mathcal M$ is complex.
* $A^*$ is not given explicitly (it has a variational form). It is a composition of $(\nb A)^{-1}(\mu) = \te(\mu)$ and $-H(p_{\cdot})$.
	1. Inverse mapping
	2. High-dimensional integration.
	
Instead approximate!


## Thoughts

<!-- This gives a quick proof that you can't necessarily sample from degree $\ge 3$ pseudo-distributions. We can obtain an exponential distribution-->

# 4 Bethe approximation and sum-product algorithm

## 4.1 Sum-product and Bethe approximation

Pairwise Markov random field: undirected graphical model with potential functions involving at most pairs of variables. (Often discrete or Gaussian.)
\begin{align}
p_\te(x)&\propto\exp\ba{\sum_{s\in V} \te_s(x_s) + \sum_{(s,t)\in E} \te_{st}(x_s,x_t)}\\
\mu_{st}(x_s,x_t) :&= \sum_{(j,k)\in X_s\times X_t} \mu_{st;jk} \one_{st;jk}(x_s,x_t)\\
\mathbb{M}(G) :&= \set{\mu\in \R^d}{\exists p\text{ with marginals }\mu_s(x_s), \mu_{st}(x_s,x_t)}
\end{align}
(globally realizable distributions)

(Q: how to convert an undirected GM into an equivalent pairwise form?)

Locally consistent marginal distributions:
\begin{align}
\sum_{x_s} \tau_s(x_s) &= 1\\
\sum_{x_t'} \tau_{st}(x_s,x_t') &=\tau_s(x_s)
\end{align}
and vice versa. These constraints, and $\tau\ge 0$, define $\mathbb L(G)$. 

In general $\mathbb M(G)\sub \mathbb L(G)$. (Elements in $\mathbb L(G)\bs \mathbb M(G)$ are pseudomarginals.) For trees they are equal.

*Proof*. Set
$$
p_\mu(x) := \prod_{s\in V} \mu_s(x_s) \prod_{(s,t)\in E}\fc{\mu_{st}(x_s,x_t)}{\mu_s(x_s)\mu_t(x_t)}.
$$

<!--what is the junction tree theorem?-->

The negative entropy $A^*$ as a function of $\mu$ has a closed form for trees.

\begin{align}
H(p_\mu) &= \sum_{s\in V} H_s(\mu_s) - \sum_{(s,t)\in E} I_{st}(\mu_{st})\\
H_s(\mu_s) :&= -\sum_{x_s\in X_s} \mu_s(x_s)\ln \mu_s(x_s)\\
I_{st}(\mu_{st}):&=\sum_{(x_s,x_t)\in X_s\times X_t} \mu_{st}(x_s,x_t) \ln \fc{\mu_{st}}{\mu_s\mu_t}.
\end{align}
**Check me!**

**Bethe entropy approximation** ($\tau$ a pseudomarginal)
$$
H_{\text{Bethe}}(\tau) := \sum_{s\in V} H_s(\tau_s) - \sum_{(s,t)\in E} I_{st}(\tau_{st}).
= -\sum_{s\in V} (d_s-1)H_s(\tau_s) + \sum_{(s,t)\in E} H_{st}(\tau_{st}).
$$

Bethe variational problem:
$$
\max_{\tau\in \mathbb L(G)}\ba{
\an{\te, \tau} -H_{\text{Bethe}}(\tau)
}
$$
<!--
\sum_{s\in V} H_s(\tau_s)
-\sum_{(s,t)\in E} I_{st}(\tau_{st}).
-->

<!-- $M_{ts}(x_s) = \exp(\la_{ts}(x_s))$.-->

The corresponding Lagrangian is
$$
\mathcal L(\tau,\la;\te) =
\an{\te,\tau} + H_{\text{Bethe}} + \sum_{s\in V} \la_{ss} C_{ss}(\tau) 
+ \sum_{(s,t)\in E} \ba{
\sum_{x_s} \la_{ts}(x_s) C_{ts}(x_s;\tau)
+\sum_{x_t} \la_{st}(x_t) C_{st}(x_t;\tau)
}.
$$

**Theorem** (Sum-product and Bethe). 

1.  Any fixed point of sum-product updates satisfies 
	$$
	\nb_{\tau,\la} \mathcal L(\tau^*, \la^*; \te)=0.
	$$
2.  For a tree-structured MRF, the unique solution has $\tau$ the singleton and pairwise marginal distributions. The optimal value is $A(\te)$.

*Proof* (of 1). 
Solving the Lagrange multiplier problem (note the multipliers are $\la_s(x_s)$ and $\la_{ts}(x_s)$) gives \begin{align}
\nb_\tau \ub{(\an{\te,\tau} + \sum H_s - \sum I_{st})}{F} &= \la^TD_\tau C\\
\nb_\tau F&= (\te_s - \cancel{1} - \ln \tau_s +cancel{\sum_t \tau_{st} \rc{\tau_s}}, \te_{st} - 1 - \ln \fc{\tau_{st}}{\tau_s\tau_t})\\
\la^T \nb_\tau C &= (-\la_{ss} + \sum_{t\in N(s)}\la_{ts}, -\la_{st}(x_s) - \la_{st}(x_t))\\
\implies
\ln \tau_s &= \la_{ss} + \te_s \fixme{+} \sum_{t\in N(s)} \la_{ts}(x_s)\\
\ln \fc{\tau_{st}}{\wt\tau_s \wt\tau_t} & = \te_{st} \fixme{-} \la_{ts}(x_s) - \la_{st}(x_t)
\end{align}
where the last 2 equations are viewed as functions on $X_s,X_s\times X_t$.
**I'm having sign errors and an extra $-1$ added...**
Substitute the first equation into the second to get
$$
\ln \tau_{st} = \la_{ss} + \la_{tt} + \te_{st}(x_s,x_t) + \te_s(x_s) + \te_t(x_t) + \sum_{u\in N(s)\bs t} \la_{us}(x_s) + \sum_{u\in N(t)\bs s} \la_{ut}(x_t).
$$
Letting $M_{ts} = \exp(\la_{ts}(x_s))$, 
\begin{align}
\tau_s(x_s) &= \ka_s \exp^{\te_s(x_s)} \prod_{t\in N(s)}M_{ts}(x_s)\\
\tau_{st}(x_s,x_t) &= \ka_{st} \exp^{\te_{st}(x_s,x_t)+\te_s(x_s) + \te_t(x_t)} \prod_{t\in N(s)\bs t}M_{us}(x_s) \prod_{u\in N(t)\bs s} M_{ut}(x_t).\\
\end{align}
The constraint $C_{st}$ becomes
$$
M_{st}(x_s) \propto \sum_{x_t} \ba{\exp\ba{\te_{st}(x_s,x_t) + \te_t(x_t)} \prod_{u\in N(t)\bs s} M_{ut}(x_t)}.
$$
This is exactly the sum-product update.


$A_{\text{Bethe}}$ is simply an approximation to $A$. It is a lower bound only for certain classes of models. <!--ferro?--> 

**Proposition** (reparameterization properties). Let $\tau^*$ be an optimum of BVP defined by $p_\te$. Then 
$$
p_{\tau^*}(x) = \rc{Z(\tau^*)} \prod_{s\in V} \tau_s^*(x_s) \prod_{(s,t)\in E} \fc{\tau_{st}^*(x_s,x_t)}{\tau_s^*(x_s)\tau_t^*(x_t)} = p_\te(x).
$$

(Note: we had $\te$ to begin with, so this is not surprising. The goal of BVP is to compute $A$ which can be used to compute marginals. But we don't get the real marginals.)

A generalized loop is a subgraph where every vertex has degree $\ge2$.

**Proposition 4.4** (Loop series expansion). For the Ising model, 
\begin{align}
A(\te) &= A_{\text{Bethe}}(\te) + \ln \ba{
1 + \sum_{\phi\ne \wt E\subeq E} \be_{\wt E} \prod_{s\in V}\EE_{\tau_s} [(X_s-\tau_s)^{d_s(\wt E)}]
}\\
\be_{st} :&= \fc{\tau_{st}-\tau_s\tau_t}{\tau(1-\tau_s)\tau_t(1-\tau_t)}\\
\be_{\wt E} :&=\prod_{(s,t)\in E}\be_{st}\\
\tau_{st} &=\tau_{st}(1,1).
\end{align}

Note the term is nonzero only for generalized loops.

*Proof*. Note if $\te,\te'$ are such that $p_\te=p_{\te'}$ then $A(\te)-A(\te') = A_{\text{Bethe}}(\te)-A_{\text{Bethe}}(\te')$. **Q: Why?** (First show $H_{\text{Bethe}}(p_{\te(\mu)}) = H_{\text{Bethe}}(p_{\te'(\mu)})$. Then note for $\mu\in \mathbb L(G)$, $\an{\te'-\te,\mu}=0$.)

Check this for a BP fixed point where $A_{\text{Bethe}}=0$. (See p.3 of 11/16. Check signs.) Calculate (here $\E$ is wrt $\prod_s \tau_s$)
\begin{align}
\fc{\tau_{st}}{\tau_s\tau_t} &= 1+\be_{st}(x_s-\tau_s)(x_t-\tau_t)\\
\exp(A(\wt \te)) &=\E[\prod_{s,t}\in E (1+\be_{st}(x_s-\tau_s)(x_t-\tau_t))].
\end{align}
Expand and use $\E[X_s-\tau_s]=0$.

**Q: is there a nice (nonvariational) expression for $A_{\text{Bethe}}$ like $A$?**

## 4.2 Kikuchi and Hypertree-based models

BVP involves approximating both the entropy and $\mathbb M(G)$. Improve both of these simultaneously. Use more complex junction trees.

A hypergraph can be drawn using a poset diagram of its edges (reverse inclusion).

A hypergraph is acyclic if you can specify (**??**) a junction tree using maximal hyperedges and intersections. The width is (largest hyperedge)-1. A $k$-hypertree is an acyclic hypergraph with a single connected component. 

# 5 Mean field methods

# 6 Variational methods in parameter estimation

# 7 Variational methods based on convex relaxations

# 8 Mode computation

# 9 Conic programming relaxations

# Review

## 1

## 2

## 3

1. Define an exponential family. What does it mean for it to be regular? Minimal? (3.2)
2. Write the Ising model as an exponential family. (3.3)
3. Given $\phi$, define the set of realizable mean parameters $\mathcal M$. What is the forward/backward mapping? (3.4)
4. What are the (realizable) mean parameters for Gaussians? The Ising model? (3.4)
5. Define the correlation (cut) polytope and marginal polytope. (3.4)
6. What are the derivatives of $A$? (3.5)
7. When is $\nb A$ convex/strictly convex/one-to-one? (3.6)
8. What is the relationship between $\nb A$ and $\mathcal M$? (3.6)
9. Define the conjugate dual function $f^*$. When is the double dual the original function? (3.6)
10. Relate $A^*$ to the entropy. (3.6)
11. What is the relationship between $\nb A^*$ and $\nb A$? (3.6)

## 4

1. Define $\mathbb M(G)$, $\mathbb L(G)$.
2. Define the Bethe approximation and variational problem. What is its Lagrangian?
3. Explain the relationship with the sum-product updates. 
4. What is the solution to the problem for tree-structured MRF's?
5. What is the loop series expansion?

# Misc

The treewidth

* [Tree decomposition](https://en.wikipedia.org/wiki/Tree_decomposition)
* [Chordal completion](https://en.wikipedia.org/wiki/Chordal_completion)
* [Treewidth algorithms](https://en.wikipedia.org/wiki/Treewidth#Algorithms)
* [Junction tree algorithm](http://ai.stanford.edu/~paskin/gm-short-course/lec3.pdf)

Having trouble finding the complete algorithm! I want: Given a graph has treewidth $k$,

* Find a choral completion.
* Find the junction tree of the chordal completion, of width $k$.

In time $e^{O(k)}\poly(n)$.

