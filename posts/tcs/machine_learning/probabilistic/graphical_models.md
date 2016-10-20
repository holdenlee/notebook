---
title: [WJ08] Graphical Models, Exponential Families, and Variational Inference
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

# 4 Bethe approximation and sum-product algorithm

# 5 Mean field methods

# 6 Variational methods in parameter estimation

# 7 Variational methods based on convex relaxations

# 8 Mode computation

# 9 Conic programming relaxations

