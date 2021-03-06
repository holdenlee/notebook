---
title: Hidden Markov Models
published: 2016-10-11
modified: 2016-10-11
tags: none
type: summary
showTOC: True
---

* [HKZ12] A spectral algorithm for learning Hidden Markov Models
* Continuous HMM [LBGS10] [paper](http://repository.cmu.edu/cgi/viewcontent.cgi?article=1057&context=machine_learning)

**Question**: how robust to noise are these?

# [SCH16] Unsupervised Part-Of-Speech Tagging with Anchor Hidden Markov Models

Reduce anchor-HMM to separable NMF. In anchor-HMM for every hidden state, there is an observed state that can only come from that hidden state. The anchor observations for $h$ are
$$
A(h) = \set{x\in [n]}{o(x|h)>0\wedge o(x|h')=0\forall h'\ne h}.
$$
Let $T_{h'h} = t(h'|h)$ denote transition probabilities and $O_{xj}=o(x|h)$ denote observation probabilities.

The key is to define random variables $Y_I$ depending on $H_I$ (nontrivially) so that $\Pj(Y_I|H_I,X_I) = \Pj(Y_I|H_I)$. We can take $Y_I=X_{I+1}$! (More accurately, it's a vector, $[Y_I]_{x'} = (X_{I+1}=x')$.)

Let $\wt O_{xh} = \Pj(h|x)$, $(\Om_X)_{yx} = \Pj(Y_I=y|X_I=x)$, $\Te_{hy} = \EE(Y_I=y|H_I=h)$. Then 
$$\Om = \wt O \Te$$
is a separable NMF.

Brown model is an especially nice A-HMM where the anchors partition the set of all observations.


# Misc

The unsupervised log-linear model
described in Berg-Kirkpatrick et al. (2010).

Agnostic HMM? Can spectral methods work?
