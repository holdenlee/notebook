---
title: Neural nets basics
published: 2016-03-13
modified: 2016-03-13
tags: neural net
type: concept
---

#Types

* neural net (vanilla)
* convolutional neural net
* recurrent neural nets
    * LSTM
* A **Boltzmann machine** has joint distribution of two adjacent layers to be $\exp(x^TAh)$. If it has only two layers it is reversible, i.e., $\Pj(x|h),\Pj(h|x)$ are both easy to calculate. (A regularized version would be $\exp(x^TAh - hh^T)$. (?))
    * A **DBM** stacks these units (so that the probability of a configuration is now $\exp\pa{\sum x_i^TA_ix^{i+1}}$). It loses reversibility.
	* This is a graphical model. It's a probability distribution rather than a deterministic function as in a vanilla neural net.

#Functions

* RELU $(x\ge 0) x$.

#Features

* Dropout
    * On nodes: zero out each node in a layer with probability $1-\rh$.
