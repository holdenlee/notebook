---
title: Kernels
published: 2016-12-29
modified: 2016-12-29
tags: kernels, RKHS
type: notes
showTOC: True
---

Mostly from Percy Liang's 229T notes.

# Kernels

If $w=\sumo in \al_i \phi(x^{(i)})$ then $\an{w,\phi(x)} = \sumo in \al_i \an{\phi(x^{(i)}), \phi(x)}$. 

# Equivalences

The following are equivalent (although multiple feature maps can correspond to the same kernel/RKHS):

* Feature map $\phi:X\to H$.
* Symmetric, positive (semi)definite kernel $k:X\times X\to \R$. (for all $S$, $(k(x_i,x_j))_{i,j\in S}$ is PSD.)
* RKHS $\{f:X\to \R\}, \ved_H$.

Proof:

* Feature map to kernel: $k(x,x') = \an{\phi(x), \phi(x')}$.
* RKHS to kernel: Riesz representation (see below). $L_x(f) = \an{R_x,f}$.
* Kernel to RKHS: Moore-Aronszajn. $f=\sumo in \al_i k(x_i,x)$, $\an{f,g} - \sumo in \sumo j{n'} \al_i\be_j k(x_i,x_j')$. (See below.)

# RKHS

A [reproducing kernel Hilbert space (RKHS)](https://en.wikipedia.org/wiki/Reproducing_kernel_Hilbert_space) is a Hilbert space of functions $X\to \R$ in which point evaluation $L_x[f] = f(x)$ is a continuous linear functional. (Equivalently, it is bounded: $f(x)\le M_x\ve{f}_H$.)

* $L^2$ is not a RKHS---it consists of equivalence classes of functions.
* $H=\set{f\in L_2(\R)}{\Supp(\wh f)\subeq [-a,a]}$ is RKHS. Here $K_x(y) = \fc{\sin(a(y-x))}{\pi(y-x)}$ (bandlimited Dirac delta).

**Theorem** A Hilbert space of functions is a RKHS iff for every $x\in X$, there exists $K_x$ such that $g(x) = \an{g, K_x}$.[^f1]

*Proof*. $\Leftarrow$: inner product is continuous. $\Rightarrow$: Riesz representation.

[^f1]: Letting $f_x=\delta_x$ is cheating---we want actual functions, not distributions.

Note $K_x(y) = \an{K_x,K_y}=:K(x,y)$. $K$ is symmetric and positive definite. (Think of $K$ as $X_0^\R\times X_0^\R\to \R$ where $X_0^\R$ is the set of functions $X\to \R$ nonzero only at a finite number of $x$'s. I.e. formal span of $X$.)

**Theorem (Moore-Aronszajn)**. Suppose $K$ is a symmetric, positive definite kernel on a set $X$. Then there is a unique Hilbert space of functions on $X$ for which $K$ is a reproducing kernel.

*Proof*. Extend $K$ by bilinearity to $\spn(X)$. Take the completion. (Extend to functions $f=\sumo i{\iy} a_i K_{x_i}(x)$ where $\sumo i{\iy} a_i^2 K(x_i,x_i)$.)

(Question: how to realize this inner product as an integral?)

See also: Mercer's theorem

# Learning

[Representer theorem](https://en.wikipedia.org/wiki/Representer_theorem) states that every function in an RKHS that minimises an empirical risk function can be written as a linear combination of the kernel function evaluated at the training points.

If 
$$
f^*\in \amin_{f\in H} L(\{(x_i,y_i,f(x_i))\}) + Q(\ve{f}_H^2)
$$
where $Q:[0,\iy)\to \R$ strictly increasing is a regularizer, then 
$$
f^*\in \spn(\set{k(x_i, \cdot)}{i\in [n]}).
$$

Example: kernel ridge regression $\al = (K+\la I)^{-1}Y$.

# Fourier properties

$k:X\times X\to \R$, $X\subeq \R^b$ is shift-invariant if $k(x,x') = h(x-x')$. Let $t=x-x'$.

**Bochner's theorem**. Let $k(x,x') = h(x-x')$ be a continuous shift-invariant kernel ($x\in \R^b$). There exists a unique finite *nonnegative* measure $\mu$ (spectral measure) such that
$$
h(t) = \int e^{-i\an{t,\om}}\mu(d\om).
$$
($h$ is the characteristic function of $\mu$. For $\mu(d\om)=s(\om)d\om$, call $s$ the spectral density.)
(See probability notes.)

# Efficient computation

* Random features: We will write the kernel function as an integral, and using Monte Carlo approximations of this integral. These approximations are of the kernel function and are data-independent.
* Nystrom method: We will sample a subset of the n points and use these points to approximate the kernel matrix. These approximations are of the kernel matrix and are data-dependent.

Ex. when points are clustered into $m$ clusters, kernel matrix looks like block diagonal with $m$ blocks $J$, so rank $m$ approximation is effective.

## Random features

Draw $\om_i\sim \mu$, and estimate
$$
\wh k(x,x') = \rc m \sumo im \phi_{\om_i}(x)\ol{\phi_{\om_i}(x)}.
$$

**Theorem**. Let 
\begin{align}
\mathcal F &= \set{x\mapsto \int \al(\om)\phi_\om(x)\mu(d\om)}{\forall \om, |\al(\om)|\le C}\\
\wh{\mathcal F} &= \set{x\mapsto \rc m\sumo im \al(\om_i)\phi_{\om_i}(x)\mu(d\om)}{\forall \om, |\al(\om)|\le C}
\end{align}
where $\om_i\sim \mu$. Let $\an{f,g}=\EE_{x\sim p^*}[fg]$. Then
$$
\Pj\pa{
\exists \wh f\in \wh{\mathcal F},
\ve{\wh f- f^*}\le \fc{C}{\sqrt m} 
\pa{1+\sqrt{2\ln(1/\de)}}
}.
$$

*Proof*. McDiarmid and Jensen. (p. 133-5, omitted.)

(Q: what about generalization guarantee? See p. 134)

For other kernels, note
$$\an{x,x'}=\E[\an{\om, x}\an{\om,x'}].$$
For $\an{x,x'}^p$, take $p$ independent draws and multiply together. For general $f$, expand in Taylor series.

Comparison to neural nets: "the random features view of kernels defines a function class where $\om_{1:m}$ is chosen randomly rather than optimized, while $\alpha_{1:m}$ are optimized. The fact that random features approximates a kernel suggests that even the random initialization is quite sensible starting point."

For $\phi_\om(x) = \one_{\om^Tx\ge 0}(\om^Tx)^q$, as $m\to \iy$, get the kernel
\begin{align}
k(x,x') &= 2\int\phi_\om(x)\phi_\om(x')p(\om)d\om\\
&= \rc\pi \ve{x}^q\ve{x'}^q J_q\ub{\pf{\cos^{-1}\pf{x^Tx'}}{\ve{x}\ve{x'}}}{\te}\\
J_0(\te) &= \pi - \te\\
J_1(\te) &= \sin\te + (\pi - \te)\cos\te.
\end{align}
(Bessel function?) Decouples magnitude from angle.
(Cho/Saul 2009)

## Nystrom

$$

$$K \approx \matt{K_{II}}{K_{IJ}}{K_{JI}}{K_{JI}K_{II}^{+}K_{IJ}}.$$
$K_{JJ} - K_{JI}K_{II}^{+}K_{IJ}$ is the Schur complement.

Drineas/Mahoney: Choose $I$ by sampling $i$ with probability $\fc{K_{ii}}{\sumo jn K_{jj}}$. (p. 138)

# Universality

Let $X$ be locally compact Hausdorff. $k$ is a $c_0$-universal kernel if $H$ with reproducing kernel $k$ is dense in $C_0(X)$ (continuous bounded functions wrt uniform ($L^{\iy}$) norm).

Carmeli2010: Let $k$ be shift-invariant with spectral measure $\mu$. If $\Supp(\mu) = \R^b$, then $k$ is universal.

# RKHS embedding of probability distributions

Kernels can be used to represent and answer questions about probability distributions without having to explicitly estimate them.

**Maximum mean discrepancy**
$$
D(P,Q,F) := \sup_{f\in\mathcal F}
\pa{
\EE_{x\sim P}[f(x)] - \EE_{x\sim Q}[f(x)]
}.
$$

If $\mathcal F=C_0(X)$, then $D(P,Q,\mathcal F)=0\implies P=Q$. Better: Can let $\mathcal F = \set{f\in H}{\ve{f}_H\le 1}$ where $k$ is universal. (Check proof p. 140)
