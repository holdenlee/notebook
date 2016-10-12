---
title: Generalization of neural nets
published: 2016-10-10
modified: 2016-10-10
tags: neural nets
type: research
showTOC: True
---

How can we show generalization error of neural networks is small?

# Rademacher complexity

The natural way to proceed is to calculate the Rademacher complexity of the neural net. 

[BM02](http://www.jmlr.org/papers/volume3/bartlett02a/bartlett02a.pdf) give generalization bounds for 2-layer NN and say that it generalizes to more layers, but I'm not sure how. (There's a "trivial" way of doing it with Lipschitzness which seems to grow exponentially with depth; I feel there may be a more natural way to do it with "composition".)

Given the dimension of each layer, a Lipschitz sigmoid/threshold function, and a bound on the size of the coefficients, what are the bounds we get from Rademacher complexity? How are they unsatisfactory? (Ex. in practical cases, is the sample size too small? Is it, e.g., a difference between a sample of polynomial size and linear size, or something larger?)

# Local minima generalization

I thought a bit about whether local optima would generalize. Do you have any intuitions regarding why? This is meaningful if it generalizes with fewer samples than one would calculate from e.g. Rademacher complexity. (My first thought is that having derivative 0 in all directions (and also nonnegative Hessian) is much less likely to happen by chance than the value being small.)

Also, is the right statement "under xx conditions whp all local optima generalize"? Given that there may be many local optima it seems there's likely to be some (most) local optima that generalize well and some that don't; perhaps it takes much fewer samples to have "most" local minima generalize. However, this seems a much more difficult statement to work with (ex. of the type people have been trying to get intuition from statistical physics). Perhaps we also need to tie it to the SGD algorithm in some way.

# Email

I thought a bit about your suggestion that local optima would generalize. Do you have any intuitions regarding why or what a statement of this would be like?

Here are some preliminary thoughts/questions I had.

* Focusing on neural networks: Rademacher complexity would give a baseline for generalization. Given the dimension of each layer, a Lipschitz sigmoid/threshold function, and a bound on the size of the coefficients, what are the bounds we get from Rademacher complexity? How are they unsatisfactory? (Ex. in practical cases, is the sample size too small? Is it, e.g., a difference between a sample of polynomial size and linear size, or something larger?) [BM02](http://www.jmlr.org/papers/volume3/bartlett02a/bartlett02a.pdf)
* Saying that local min generalizes is significant if it generalizes with fewer samples than one would calculate from e.g. Rademacher complexity. 
* Is the right statement "under xx conditions whp all local optima generalize"? Given that there may be many local optima it seems there's likely to be some (most) local optima that generalize well and some that don't; perhaps it takes much fewer samples to have "most" local minima generalize. However, this seems a much more difficult statement to work with (ex. of the type people have been trying to get intuition from statistical physics). Perhaps we need to tie it to the SGD algorithm in some way.
