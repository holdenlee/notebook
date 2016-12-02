---
title: (ALM16) WHY ARE DEEP NETS REVERSIBLE - A SIMPLE THEORY, WITH IMPLICATIONS FOR TRAINING
published: 2016-03-13
modified: 2016-03-13
tags: neural net
type: paper
link: http://arxiv.org/pdf/1511.05653
showTOC: True
---

Arora, Sanjeev, Yingyu Liang, and Tengyu Ma. "Why are deep nets reversible: A simple theory, with implications for training." arXiv preprint arXiv:1511.05653 (2015).

http://arxiv.org/pdf/1511.05653

#Summary

Consider a feedforward net with input $x$ and output $h$. ALM give a model under which a neural net can be said to be predicting the output distribution. This also gives a theoretical explanation of why it's possible to use a neural net to do the following: given $h$, generate some $x$ that could have given rise to that $h$ (cf. neural net dreams).

Their theoretical explanation has two important ingredients for theoretical explanations:

1. It specifies a joint distribution of $x,h$. (Specifying $x|h$ may also be good enough).
2. It gives a proof that the deep net does compute the most likely $h$ given $x$ (in some sense, up to some error).

#Model

(See [neural net basics](basics.html).)

We want to model (input, output) by a probability distribution, and prove that a neural net is predicting the output given the input, with respect to that probability distribution.

##Boltzmann machine

A **Boltzmann machine** is a joint distribution of random variables $x,h \in \R^{m\times n}$ given by
$$\Pj(x,h) \approx \exp(-x^TAh + \pat{regularization}).$$
It is reversible because $\Pj(x|h),\Pj(h|x)$ are both easy to calculate.
(Deep Boltzmann machines are much less nice---they lose reversibility.)

Compare this to a 2-layer neural net. Note a Boltzmann machine is a probabilistic model, not a neural net. A neural net and a Boltzmann machine both model the relationship between an input vector and an output vector, but do it differently: A neural net deterministically computes an output as a function of its input, while a Boltzmann machine gives a probability distribution on (input, output). A Boltzmann machine is trivially reversible; our hope is that a neural net is also reversible.
<!-- How are these models related? A Boltzmann machine is one of the most natural generative models for neural nets; one hope is that a neural net is predicting a distribution given by a Boltzmann machine.
Note by this reversibility, there is not much to prove -->

Think of $x$ as the observed layer and $h$ as the hidden layer. (For example, think of it as the middle layer of an autoencoder. Because we're not considering any layers put on top of $h$, we also think of it as the output.)

We don't worry about learning (ex. gradient descent) here. We just consider a neural net statically.

<!-- Note we're *not* actually using the Boltzmann machine model.-->

##1-layer neural net

The model is the following. Key aspects of the model are modeling weights by random matrices[^f0], hypothesizing/enforcing sparsity, and allowing dropout (this is a standard training technique, so we want the theoretical results to hold in this setting).[^f1]

Here $x\in \R^n,h\in \R^m$ and $m<n$. The hidden layer has fewer nodes, so the forward map $x\mapsto h$ is many-to-one. This is necessary if we want to be able to reconstruct $h$ from $x$ with high probability.

[^f0]: Because we use properties such as eigenvalue concentration, this suggests that the theorem will still hold for "random-like" matrices, i.e., matrices having these properties.

[^f1]: Dropout encourages all of the nodes to learn useful features, because the neural net will essentially rely on a subset of them to make a prediction. (Think of nodes as taking a "majority vote" over inputs; dropout makes sure this still works even if you only take a subset.)

* Generate $h\sim D_h$ where $D_h$ is any distribution on $\R^n_{\ge 0}$ satisfying the following: With $1-\text{neg}(n)$ probability,
    * (Sparsity) $\ve{h}_0\le k$.
	* (No coordinate much larger than the average) $\ve{h}_{\iy}\le \be \ve{h}$ where $\be = O\sfc{\ln k}{k}$.
* Let $W\in \R^{n\times m}$ be a matrix with random $N(0,1)$ entries.
*   Generate the observed variable by
    $$ x \sim r(\al W h)\odot n_{\rh}, $$
	where
	* $n_{\rh}$ is a vector of iid draws from Bernoulli$(\rh)$, and $\odot$ is componentwise multiplication, i.e., entries are zeroed out with probability $1-\rh$.
	* $\al=\fc{2}{\rh n}$, so that it normalizes the effect of dropout. (Why factor of 2?)

The feedforward neural net does the following operation. For some $b$,

* Given $x$, compute $\hat h = r(W^Tx+b)$, where $r(x)=\sgn(x)\cdot (x\ge 0)$[^f2] is the **ReLU (rectified linear unit)** function.
    * If we're using dropout (with parameter $\rc2$, say), replace $x$ by $x \odot n_{\rc 2}$ before doing this.

The hope is that $\hat h \approx h$. Why do we take the matrix in the proposed inverse map to be $W^T$? For random matrices, the transpose is like an inverse, because $\ve{W^TW-I}_2$ will be small.

[^f2]: We use the notation $(P)=\begin{cases}
1,&P\text{ true}\\
0,&P\text{ false}.
\end{cases}$

##Multi-layer neural net

Let $W_t,\ldots, W_1$ be random matrices. Basically just iterate the construction $t$ times in both the generative model and the feedforward net (from $h^{(t)}$ get $h^{(t-1)},\ldots, h^{(0)}=x$ and from $x$ generate $\wh h^{(1)}, \ldots , \wh h^{(t)}$). In the dropout case, do dropout on each layer.

#Theorems and proof sketches

##Baby theorem

To get an idea of why reversibility might hold, let's consider a random one-layer neural net without nonlinearities (or bias), which is just multiplying by a random matrix. In this case $x=\rc nWh$, $\wh h = W^Tx=\rc n W^TWh$.

**Theorem (Baby version)**: Let $h\in \{0,1\}^m$ be fixed, $m<n$. Suppose $W\in \R^{n\times m}$ has $N(0,1)$ entries. Then for any polynomial $p(n)$ there is $C$ so that 
$$\Pj_{W}\ba{\ve{W^TWh - h}_{\iy}\le C\ln(mn)\sfc{m}{n}}\ge 1-\rc{p(n)}.$$

*Proof*: We have
\begin{align}
(W^TWh)_i &= (w_{i\bullet})^TW h\\
&=\rc n (w_{i\bullet})^T w_{i\bullet}h + \ub{\rc n\sum_{j\ne i} (w_{i\bullet})^T w_{j\bullet} h}{\text{noise}}\\
&=\rc n (w_{i\bullet})^T w_{i\bullet} h +  \rc n\sum_{k=1}^m w_{ik} \sum_{j\ne i} W_{jk} h_k.
\end{align}
By Chernoff, $\rc n w_{i\bullet}^T w_{i\bullet}$, as a sum of $n$ variables distributed as $\chi_1^2$, is $\rc{\sqrt{n}}$-concentrated around 1. There are $<mn$ terms in the noise term, so it is $\fc{\sqrt{mn}}{n}$ concentrated around 0 (a little work is needed here---details left to the reader). Thus we get $\sfc{m}{n}$-concentration around 0.

If we bound by $\ln(mn)$ times this quantity, then we can use the union bound to finish. $\square$

Before moving on, we note two things.

1. To get a good bound here, we need $n\gg m$, i.e., the hidden layer needs to be much smaller. Often this is not true in practice.
2. We get a $L^{\iy}$ bound which naively doesn't give a good $L^2$ bound.

The key next step is to assume that $h$ is sparse. It turns out then having a sigmoid function (ReLU) can be naturally interpreted as picking out the nonzero coordinates, ``recovering" the sparse $h$. Thus, *thresholding has a denoising effect*. This allows better recovery (in the $L^2$ norm).

##Reversibility of one-layer nets with dropout and ReLU

**Theorem 2.3**: (Formulation in appendix A.) Let $W,h,x$ be generated as in the model. Suppose $k$ is such that $k<\rh n<k^2$ (the number of non-dropped entries greater than the minimum sparsity, but also not too much). Then
$$
\ab{\Pj_{x,h,W}\ba{\ve{r(W^T x+b) - h}^2\le \wt O\pf{k}{\rh n}\ve{h}^2}} \ge 1-\rc{\poly(n)}.
$$

*Proof (Theorem 2.3)*:

1.  **Lemma 2.5**: For $\de=\wt O\prc{\sqrt m}$, 
    $$\Pj_{W,h,x}\ba{\ve{W^Tx - h}_\iy\le \de\ve{h}^2} \ge 1-\rc{\poly(n)}.$$

    *Proof of (2.5)$\implies$(2.3):*
	If we used the naive $L^\iy-L^2$ bound, we get that w.h.p. the $L^2$ norm is at most $m(\de\ve{h})^2 = \wt O\pf{m\ve{h}^2}{t}$, which is too large. We need to use sparsity to get a good bound.
	The idea is to zero out the entries with $h_i=0$ by adding a bias term $b$ and thresholding using $r$. The $L^{\iy}$ bound in Lemma 2.3 tells us the offset necessary to zero out the entries where $h_i=0$, $b=-\de \ve{h}_1$. With this value of $b$,
	\begin{align}
	h_i&=0 &\implies ((W^Tx)_i+b_i)&\in [-2\de \ve{h},0]&\implies \hat h_i&=r((W^T)x_i + b_i) &= h_i = 0\\
	h_i&\ne 0 & \implies |\wt h_i-h_i| &\le 2\de\ve{h}.
	\end{align}
	Square and multiply by $k$.
2.  *Proof of Lemma 2.5:* We have
    \begin{align}
	x_j &= r\pa{\al \sumo im W_{ji} h_i} (n_\rh)_j\\
	\hat h_i &= \sumo jn (W^T)_{ij} x_j\\
	&= \sumo jn \ub{W_{ji} r\pa{\al \sumo km W_{jk} h_k}}{=:Z_j} (n_\rh)_j.
	\end{align}
	As before, think of the sum inside $r$ as a main term plus noise:
	$$\sumo km W_{jk} h_k = W_{ji} h_i + \sum_{k\ne i} W_{jk} h_k.$$
	We want to compute $\E[\hat h_i|h]$. To do this we need to understand the distribution of expressions that look like $Z_j$.
	*   **Lemma (Technical)**: Let $w\sim N(0,1), \xi \sim N(0,\si^2), \si=\Om(1), 0\le h\le \ln \si$. Then
	    \begin{align}
		\EE_{w,\xi} [w\cdot r(wh+\xi)] & = \fc h2 \pm \wt O\prc{\si^3}\\
		\EE_{w,\xi} [w^2\cdot r(wh+\xi)] & \le 3h^2 + \si^2.
	    \end{align}
		*Proof:* To calculate the expectation, take the integral over $\xi$ first and then $w$. $w,\xi$ are Gaussians, so we can evaluate the expectation
		$$ \E[\E[w\cdot r(wh+\xi)|w]] = \fc{h}2+\E[G(w)]$$
		for some calculable error $G$. Estimate $G$ with its Taylor expansion (of degree 4). Now calculate $\E[G(w)]$ by estimating it for values below and above a cutoff. Using the lemma on the terms and noting $\E\ve{n_j}_0=\rh n$, and the normalizing constant $\al=\fc{2}{\rh n}$, we have
		$$ \E[\wh h_i|h] = h_i \pm \wt O\prc{k^{\fc 32}}.$$
	* Show that $\wh h_i|h_i$ concentrates with high probability. The $Z_j$ are independent so we can use a version of Matrix Bernstein. Technically it seems we have to use a version for subexponential random variables, in terms of Orlicz norms, and check that $Z_j$ hve small norm in expectation. See Theorem D1.

<!--Write
\begin{align}
x_j &= r(W_{ji} h_i + \ub{\sum_{l=1}^m W_{jl} h_l}{=:\eta_j}) (j\in T),\\
h_i &= \sum_{j=1}^n W_{ji}x_j
\end{align}
where $T$ is the set of non-zeroed out coordinates. We have $h_i = $. 
We want to show this is close to $h_j$ with high probability. 
-->

##Reversibility for 2+ layers

**Theorem **: Similar theorems hold for 2 and 3 layers, in a weaker sense.

(I haven't gone through this.)

#Experiments

The theory gives a way to improve training. Take a labeled data point $x$, use the current feedforward net to compute the label $h$, and use the **shadow distribution** $p(x|h)$ to create a synthetic data point $\wt x$, and use $(\wt x,z)$ as a training pair.

#Questions

* How realistic is the sparsity assumption? How realistic is the model?
* Can we use Boltzmann machines as the model instead?
* What complications come up for 2+ layers? Is there a proof for any constant number of layers without loss?

<!---
Show that feedforward deep nets compute z|x in this model. (You can define this by
MLE, MAP, etc.)
-->
