---
title: [GRSY15] How Hard is Inference for Structured Prediction?
published: 2016-03-03
modified: 2016-03-03
tags: paper, CBM
type: paper
---

Model: In a $n\times n$ grid, observe $p$-noisy edges $Y_uY_v$ and $q$-noisy nodes $Y_u$. Attempto to recover the original labeling. What is the maximum correlation you can achieve on average?

Answer: Error $p^2n$ up to a constant.

* Achievable: find the partition that maximizes the cut value $\sum X_{uv}Y_uY_v$. Now negate all labelings if it would increase the node agreement.
    * Claim: this is polynomial time. How? This is max cut with negative weights. (https://en.wikipedia.org/wiki/Maximum_cut, http://cstheory.stackexchange.com/questions/2312/max-cut-with-negative-weight-edges, http://cstheory.stackexchange.com/questions/9323/hardness-of-max-cut-on-sparse-graphs)
	* They mention an LP relaxation, but don't actually give the formula...
* Tight: consider the checkerboard graph.

Applications: Image segmentation. (How would you have both node and edge measurements?)

More directions:

* Optimal constant?
* If you can pay to get better observations, how would you spend a budget?
