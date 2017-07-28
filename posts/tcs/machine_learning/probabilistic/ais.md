---
title: Annealed importance sampling
published: 2017-07-20
modified: 2017-07-20
tags: sampling, annealing, temperature
type: topic
showTOC: True
---

# Papers

* [N98] Annealed Importance Sampling
* [BGS14] Accurate and Conservative Estimates of MRF Log-likelihood using Reverse Annealing
* [WBSG17] ON THE QUANTITATIVE ANALYSIS OF DECODER-BASED GENERATIVE MODELS

# log p

We can get an unbiased estimator for $p(x)$, say $\wh p$. But we often want $\ln p(x)$. We use Jensen's inequality and Markov's inequality. So $\ln \wh p$ is a probabilistic lower bound.
$$
\E[\ln \wh p] \le \ln p\implies \quad \Pj(\ln \wh p> \ln p + b) <e^{-b}.
$$
(This is true no matter what the variance is. However, this can be a very loose bound. There is no good way of estimating $\E \ln X$ from draws of $X$ (why not?). Oddly, there is a good way of estimating $\E e^X$ from $X$ by power series expansion. (Power series for $\ln$ is terrible over long distances.))

Note this is prone to overestimation with little indication anything is wrong.

# ELBO

Goal: posterior distribution
$$
p(z|x,\al) = \fc{p(z,x|\al)}{\int_z p(z,x|\al)}.
$$
Pick a family of distributions with variational parameters $q(z_{1:m}|\nu)$. Use $q$ with fitted parameters as proxy.

So want to minimize $KL(q||p)$.

Why $q||p$, not $p||q$? 

* q high, p low is bad. Don't want to make impossible events happen!
* q low, p high is not so bad.

\begin{align}
KL(q||p) &=\EE_q\ba{\ln \fc{q(z)}{p(z|x)}}\\
\ln p &=\ln \int \EE_{z\sim q}\ba{\fc{p(x,z)}{q(z)}}\\
& \ge \EE_q \ln p(x,z) - \EE_q [\ln q] :=ELBO\\
KL(q||p) &=-ELBO - \ln p(x)
\end{align}
$\ln p$ doesn't depend on $q$.

# AIS

Given annealed distributions $p_i\propto f_i$, $p_K=p$ with Markov chains $M_i$ (with transition kernels $T_i$), to estimate $Z=Z_K$,

* Sample from $p_0$.
* Let $w=Z_0$.
* For $k=1:K$
	* $w\leftarrow w \fc{f_k(x_{k-1})}{f_{k-1}(x_{k-1})}$
	* $x_k \sim T_k(\cdot |x_{k-1})$.
* Estimate is $w$.

For probabilistic neural nets, use Gibbs sampler (alternately sample $h$ and $x$) as transition.

Think of this as proposing the distribution given by applying the $T_i$ in sequence.

Giving a stochastic lower bound for $Z$ means we overestimate log-likelihood.

# RAISE

Go the other way using samples from the target distribution This gives a probabilistic lower bound on $\fc{Z_0}{Z}$, so a probabilistic upper bound on $Z$, so we underestimate log-likelihood.

$p(h|v)$ needs to be tractable. ((z|x) in above notation)

For intractable $p(h|v)$ combine the AIS (fixing $v$) and RAISE steps to get a single estimate. See Algorithm 3 for details.

# Notes 

* Is RAISE a provable (stochastic) upper bound? Even in the intractable case?
* I'm surprised AIS/RAISE match so closely. Does this mean partition function calculation for deep belief nets is in practice tractable???
* I think AIS can have large variance. It seems better to do the "evolutionary multiplicative update" thing. Does that have provable guarantees under similar conditions as Langevin annealing? Can AIS fail where this works? (Ex. continuously miss the high-prob stuff, stepping into the low-ratios between layers.)
	* Does this give a better bound in practice? I.e. larger estimate for $Z$? (Warning: not quite unbiased anymore...)
