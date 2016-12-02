---
title: (A16) Provable algorithms for inference in topic models
published: 2016-04-04
modified: 2016-04-04
tags: topic models
type: paper
showTOC: True
---

#Model

##Definitions

Define

*   the $\ell_1$ condition number
    $$\ka(A) = \min \set{\ka}{\forall x\in \R^k, \ve{Ax}_1\ge \rc{\ka}\ve{x}_1}$$
*   the $\ell_\iy\to \ell_1$ condition number
	$$\la(A) = \min \set{\la}{\forall x\in \R^k, \ve{Ax}_1\ge \rc{\la}\ve{x}_\iy}$$
*   the $\de$-biased $\ell_\iy\to \ell_1$ condition number
    \begin{align}
	\la_\de&=\min_{|BA-I_k|\le \de, B\in \R^{k\times D}} |B|_{\iy}\\
	&=\max_{\ve{Ax}_1\le 1} \ve{x}_{\iy} - \de\ve{x}_1.
	\end{align}
	(The equality follows from a duality calculation.)
*   the restricted $\ell_1\to \ell_1$ condition number is
	$$\ol{\ka}_r(A) = \min\set{\ol{\ka}}{\forall \ve{v}_0, \ve{Av}_1\ge \rc{\ol \ka}\ve{v}}.$$

Note
$$\la_\de\le \la_0=\la \le \ka.$$
(To see this, take $x=By$.)

##Model

* $A$ is a fixed $n\times k$ matrix with $\de$-biased condition number $\la_\de(A)$. (We want this to be small.)
* $x\in \De_k$ is $r$-sparse.
* $y\sim Ax$ ($Ax$ is treated as a probability vector).

#Algorithm

Given $y\sim Ax$ and $A$,

*   Thresholded linear inverse
	* Let $B=\amin_{|BA-I_k|\le \de, B\in \R^{k\times D}} |B|_{\iy}$ be a $\de$-biased minimum variance inverse.
	* Compute $\wh x = \rc n By$.
	* Let $$x_i = \wh x_i (\wh x_i \ge \ub{2\la_\de(A) \sfc{\ln k}{n} + \de}{\tau}).$$
*   TLI finds the support of $x^*$ with high probability. Now find the MLE $x^*$ given the support. (This is a convex problem.)

#Analysis

##Thresholded linear inverse algorithm

We have
$$ \E \wh x_i  =x_j^* + \sumo jk ((BA)_{ij} - \de_{i,j}) x_j^*.$$
*This is why it's natural to consider the $\de$-biased inverse*: we don't need $B=A^+$ exactly, we can relax this to each $(BA)_{ij} - \de_{i,j}$ being small. Now use Bernstein's inequality to get concentration on the order of $\tau$. Finally use union bound.
<!--check this-->

##MLE estimate

If

* $x^*\in \De_k$ is $r$-sparse
* $x_i^*\ge \fc{\tau}r$ for any $i\in R$,
* $A$ has $\le \ol{\ka}$ restricted $\ell_1\to \ell_1$ condition number (a bound on $\ka$ is sufficient as $\ol\ka\le \ka$)
* $n\ge c\ol{\ka}^2 r^2 \fc{\log k}{\tau^2}$

then with high probability
\begin{align}
\ve{Ax_{MLE}-Ax^*}_1 &\le \wt O\pa{\sfc rn}\\
\ve{x_{MLE}-x^*}_1 &\le \wt O\pa{\ol \ka \sfc rn}
\end{align}

The proof is like the [proof of asymptotic normality of MLE](../../math/statistics/fisher-info.html), but with matrix concentration to get a finite sample bound.

##Sample complexity lower bounds

These exist!


