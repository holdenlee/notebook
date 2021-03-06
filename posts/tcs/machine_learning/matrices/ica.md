---
title: ICA (Independent components analysis)
published: 2016-06-28
modified: 2016-06-28
tags: ICA
type: notes
showTOC: True
---

[Reference](http://cs229.stanford.edu/notes/cs229-notes11.pdf)

Given that the components of $s\in \R^n$ are independent, and we observe $x=As$, we want to find $W=A^{-1}$ and recover $s$. Let $w_i^T$ be the rows of $W$.

When the $s_i$ are non-gaussian, the solution is unique up to permutation and scaling. (Otherwise, there is rotational invariance.)



#Algorithm

Suppose the cdf of the components is logistic. (This is a reasonable default. Mean-center first.) Let $g(s) = \rc{1+e^{-s}}$.

Change of coordinates gives $p_x(x) = p_s(Wx)\det(W)$. The log-likelihood is
$$\ell(W) = \sumo im \pa{\sumo jn \ln g'(w_j^T x^{(i)}) + \ln |W|}.$$
Use stochastic gradient ascent.

Note:  for problems where successive training examples are correlated, when implementing stochastic gradient ascent, it also sometimes helps accelerate convergence if we visit training examples in a randomly permuted order.

#Tensor algorithm

See "new_thread.pdf" page 30.
