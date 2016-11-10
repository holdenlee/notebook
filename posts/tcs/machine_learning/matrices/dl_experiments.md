---
title: DL experiments
published: 2016-10-17
modified: 2016-10-17
tags: dictionary learning
type: research
showTOC: True
---

What are convergence guarantees for dictionary learning? Consider the settings

* AGMM15 (Alternating minimization)
* 2-layer NN
	* With $b^Ty$
	* With $\sgn(b^Ty)$

<!--
Sanjeev told me you did some experiments, so I wanted to check with you.

Experimentally, does dictionary learning converge to the right dictionary under random initialization? What if we randomly initialize with samples drawn from $x=Ah$? What about for the neural net (backprop) model you showed me last time - does random initialization (with samples) converge to the dictionary? If you have code for experiments, please send it to me.

I've done a lot of the calculations for neural nets learning dictionaries, and am getting stuck on the following: it appears that the gradient of the entire matrix is correlated with the right direction, but individual rows may not be (so a row may get far away until it no longer decodes correctly). Did you encounter something like this? If you have the bandwidth I'd be interested in working with you on this.

-->

# Experiments

Code is in `dl_convergence.py`. Run on ionic.

# Results

<!--1218589: -->

* s = 3
* m = 50 # hidden vector
* n = 25 # observed vector
* q = s/m
* alpha = .01
* batchsize = 1024
* vary sigma (how close initialization is)
<!-- * Approximate convergence for sigma = .05, .1; not 0.5-->

Next,

* add random initialization - check
* vary (s,m,n)
* check sparsity of learned vectors (do thresholding too) - check
* add initialization from samples - check
	* try overcomplete initialization from samples - check

## First observations

See `am_dl_3_50_25.txt` and `slurm-1218768.out`

* Converges when close enough (as in AGMM15). For this, even 0.5 is close enough. Note it doesn't converge to $A$ - it converges to something that has columns $\approx 0.1$ away from $A$, consistant bias. (This makes sense.)
* Random initialization does not converge to global optimum. Initialization with samples seems to do slightly better.

# Evaluation

How to evaluate?

* Closeness of columns.
* Loss: how much sparsity, and how far away. (Reconstruction error)
    * How does reconstruction error compare to SVD? (Make dimensions comparable.)
* Put in random SVM on top. Can it learn the SVM well?
* Check framework in [HM16].

# Code

* Displaying images
	* [No PIL](http://stackoverflow.com/questions/902761/saving-a-numpy-array-as-an-image)
	* [PIL](http://stackoverflow.com/questions/2659312/how-do-i-convert-a-numpy-array-to-and-display-an-image)
	* [Pillow](https://pillow.readthedocs.io/en/3.4.x/reference/index.html)

# Data

In `am_dls_data.pickle`, data is stored as list `(m,n,s, st, loss, mins1, mins2, mins3, A, B, AB)`.
