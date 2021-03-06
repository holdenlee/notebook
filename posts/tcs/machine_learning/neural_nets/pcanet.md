---
title: PCANet -  A simple deep learning baseline for image classification?
published: 2016-09-10
modified: 2016-09-10
tags: pca, neural net
type: paper
showTOC: True
---

# PCANet: A simple deep learning baseline for image classification?

Each stage in a CNN consists of 3 layers:

* convolutional filter bank
* nonlinear processing
* feature pooling

Replace these:

| CNN | PCANet | 
|---|---|
| convolutional filter bank | PCA filter |
| nonlinear processing | binary quantization (hashing) |
| feature pooling | block-wise histograms of binary codes |

Lesson: 
Deep learning has a lot of hype, but in fact simpler, better theoretically justifiable architectures can do just as well or better! In particular, one weakness of DL is that it depends on parameter tuning expertise and *ad hoc* tricks.

Examples:

* ScatNet (wavelet scattering network): filters are wavelet operators, so no learning is needed. (These don't work so well when there is intra-class variability with illumination change and corruption.)
* PCANet cf. OPCA.

Motivations:

1. design a simple deep learning network which should be very easy, even trivial, to train and to adapt to different data and tasks. 
2. such a basic network could serve as a good baseline for people to empirically justify the use of more advanced processing components or more sophisticated architectures for their deep learning networks.

# Architecture

Input: $N$ training images $\{I_i\}_{i=1}^N$ of size $m\times n$.

1.  Learn PCA: Vectorize all $k_1\times k_2$ patches, mean-center and put them all in a matrix $X\in \R^{k_1k_2\times Nmn}$[^f1]. Do rank $L_1$ PCA on $X$. The $l$th filter ($l\in [L_1]$) is
	$$ W_l^1 := mat_{k_1,k_2}(q_l(XX^T))$$
    where $mat_{k_1,k_2}$ maps $\R^{k_1k_2}\to \R^{k_1\times k_2}$ and $q_l$ is the $l$ largest eigenvectors.

	Now let $I_i^l = I_i * W_l^1$. (Zero-pad $I_i$ so that $I_i^l$ has the same size.)
	
	You can apply this multiple times. Suppose we apply it twice to get $I_i^{l_1, l_2}$.
2.  Hashing: Binarize the outputs to get
	$$\{b_{l_1,l_2} = H(I_i^{l_1,l_2})\}$$
	where $H$ is Heaviside function.
	Let
	$$T_i^{l_1} := \sumo{l_2}{L_2} 2^{l_2-1} b_{l_1,l_2}.$$
	(I.e., treat $(b_{l_1,l_2})_{l_2=1}^{L_2}$ categorically.)
3.  Histogram: Express histogram with $L_2$ bins as a vector $Bhist(T_i^l)$. The feature vector of $I_i$ is 
	$$f_i := \text{map Bhist }[T_i^{1:L_1}]\in \R^{2^{L_2}L_1B}.$$
	
[^f1]: Or $N(m-k_1+1)(n-k_1+1)$ if you don't go past the border.

**On many layers**: Note that we DON'T stack by repeating 1-3. Instead, 2-3 happen only once at the end. The stacking happens within 1---doing PCA multiple times.

Note: 

* Nonoverlapping blocks are suitable for faces. 
* Overlapping blacks are useful for digits, textures, and objects.
* Histogram gives some translation invariance (why??).
* Model parameters $k_1,k_2,L_1,L_2$. Ex. $L_1=L_2=8$.
* Two-stage PCANet is good.
* PCANet with absolute rectification layer (??) after the first stage doesn't help.
* The overall process is linear. ?? Combining two stages. Two stages works better. Two-stage PCA filters have a low-rank factorization. It has $L_1k_1^2 + L_2k_2^2$ rather than $L_1L_2(k_1+k_2-1)^2 $ variables.

## Variations

* RandNet: use random filters (from standard Gaussian)
* LDANet: Use multi-class linear discriminant analysis. (Think: supervised version of PCA.) [LDA](../tcs/machine_learning/matrices/lda.html)

(Does this mean LDANet will fail on things like concentric circles?)

# Experiments

Face recognition, MNIST.

MNIST: basic (10000-2000-50000), rot, noise bg, image bg, etc.

# Questions

* What is "block size"? (vs. filter, image size)
* How do you classify using PCANet? (ex. do you train a SVM on top?)
* How about stacking?
    * An intriguing research direction will then be how to construct a more complicated (say more sophisticated filters possibly with discriminative learning) or deeper (more number of stages) PCANet.
	* Some preprocessing of pose alignment and scale normalization might be needed for good performance guarantee. The current bottleneck that keeps PCANet from growing deeper (e.g., more than two stages) is that the dimension of the resulted feature would increase exponentially with the number of stages.
