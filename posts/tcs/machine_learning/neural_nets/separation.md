---
title: Neural net separation
published: 2017-02-09
modified: 2017-02-09
tags: neural nets, circuit complexity
type: research
showTOC: True
---

[Notes](https://www.dropbox.com/s/d68tepx2x5h13at/representation.pdf?dl=0) (See section 2.)

# k vs. k+1 

One idea:

## Relate to arithmetic circuits

Cf. CSS16. 

Idea: write out everything as power series. Perhaps fix a probability measure such as Gaussian. 

The circuit model is $\sum P \sum P...$ where $P$ is any univariate power series. We hope that it can be approximated by its first few terms, so that we get a polynomial.

Restrict the $k+1$-depth circuits to be somewhat smooth, so they can be approximated by the first few terms of the power series.

### Problem 1: Approximation

We can find pairs of functions which differ very much on the first few terms of their power series but that are arbitrarily close on $L^2(\mu)$. 

The natural thing to do is to look at families of orthogonal polynomials on $\mu$. But these 

* don't distribute nicely (ex. we can write $(x+y)^n$ as a sum of $n+1$ terms, but not $He_n(x+y)$) - I don't think this is such a big deal though.
* letting $\Pi_d$ be projection to degree $\le d$ part, we don't have $\Pi_d\circ P \circ \Pi_d = \Pi_d \circ P$. So it's very hard to argue composition.

Can we require our approximating function to also be somewhat smooth? Then e.g. we can use compactness (Arzela-Ascoli) - arbitrarily close approximation means expressible, otherwise you can't get closer than $\ep$. But $\ep$ might depend on $n$... (Ex. with certain bounds on coefficients, and a requirement that your power series starts with $p(x)$, what is the minimial $L^2(\mu)$ norm it has?)

Order of quantifiers?

### Problem 2: Arithmetic question

The circuit model is $\sum P \sum P...$ where $P$ is any univariate power series/polynomial. Find a polynomial that is attainable by the degree $\le d$ portion of a depth $k+1$ circuit (depth $k+1$ means $\sum (P\sum)^{k}$) that is not attainable by the degree $\le d$ portion of any depth $k$ circuit of subexponential size.

**What are separation results for normal arithmetic circuits?**

Look at constant-depth circuits: keep $k$ fixed; you're allowed to take $n\to \iy$.


