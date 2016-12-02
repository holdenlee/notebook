---
title: (PMDH16) Convolutional Patch Representations for Image Retrieval - an Unsupervised Approach
published: 2016-09-26
modified: 2016-09-26
tags: neural net, vision
type: paper
showTOC: True
---

We write things in the continuous limit. In actuality we have to discretize.

Define the kernel $K:(\Om \to \R)\times (\Om\to \R) \to \R$ by
\begin{align}
K(M,M') = \sum_{z,z'\in \Om} e^{-\rc{2\be^2}\ve{z-z'}^2} \ka (P_z, P_{z'}')\\
\ka(P_z,P_{z'}') & = \ve{P_z}\ve{P_{z'}'} e^{-\rc{2\al^2} \ve{\wt P_z - \wt P_{z'}}^2}
\end{align}
where $P_z =M_{z+[0,e)\times [0,e)\times [0,d)}$.

# Background

A [reproducing kernel Hilbert space (RKHS)](https://en.wikipedia.org/wiki/Reproducing_kernel_Hilbert_space) is a Hilbert space of functions $X\to \R$ in which point evaluation $L_x[f] = f(x)$ is a continuous linear functional. (Equivalently, it is bounded, $f(x)\le M_x\ve{f}_H$.

* $L^2$ is not a RKHS---it consists of equivalence classes of functions.
* $H=\set{f\in L_2(\R)}{\Supp(\phi)\subeq [-a,a]}$ is RKHS. Here $K_x(y) = \fc{\sin(a(y-x))}{\pi(y-x)}$ (bandlimited Dirac delta).

**Theorem** A Hilbert space of functions is a RKHS iff for every $x\in X$, there exists $K_x$ such that $g(x) = \an{g, K_x}$.[^f1]

*Proof*. $\Leftarrow$: inner product is continuous. $\Rightarrow$: Riesz representation.

[^f1]: Letting $f_x=\delta_x$ is cheating---we want actual functions, not distributions.

Note $K_x(y) = \an{K_x,K_y}=:K(x,y)$. $K$ is symmetric and positive definite. (Think of $K$ as $X_0^\R\times X_0^\R\to \R$ where $X_0^\R$ is the set of functions $X\to \R$ nonzero only at a finite number of $x$'s. I.e. formal span of $X$.)

[Representer theorem](https://en.wikipedia.org/wiki/Representer_theorem) states that every function in an RKHS that minimises an empirical risk function can be written as a linear combination of the kernel function evaluated at the training points

**Theorem (Moore-Aronszajn)**. Suppose $K$ is a symmetric, positive definite kernel on a set $X$. Then there is a unique Hilbert space of functions on $X$ for which $K$ is a reproducing kernel.

*Proof*. Extend $K$ by bilinearity to $\spn(X)$. Take the completion. (Extend to functions $f=\sumo i{\iy} a_i K_{x_i}(x)$ where $\sumo i{\iy} a_i^2 K(x_i,x_i)$.

(Question: how to realize this inner product as an integral?)

See also: Mercer's theorem

