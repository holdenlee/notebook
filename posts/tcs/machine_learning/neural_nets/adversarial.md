---
title: Adversarial examples in neural networks
published: 2017-02-21
modified: 2017-02-21
tags: neural nets, uncertainty, aaml
type: research
showTOC: True
---

See [my experiments](adversarial_experiments.html). 

See also [confidence](confidence.html).

# Introduction

## Statement

Neural networks can be easily fooled---ex. an adversary adding a small amount of noise can change the classification from "dog" to "cat" with high confidence. It can be fooled even by a weak adversary with just black-box access!

Related to making NN's resistant: Have NN's give a confidence bound.

Ideas:

* Use uncertainty quantification from statistics: Fisher information. See personal communication with Jacob S.
* Use an ensemble of neural nets. Train an ensemble in parallel, vs. train together against a discriminator.
* Sleeping in NN
* Use some kind of calibration. I have a suspicion that cross-entropy simply doesn't generalize because losses are unbounded.
* Active learning
* Make Lipschitz/other regularization. Give noisy example with the kind of noise you want to be resistant against. (ex. use wavelet basis in convolution)
* Boosting
* $\iy\to 2$ norm. SDP relaxation, etc. (Jacob S)
* Path norm SGD.
* Quantization. Can we still get adversarial examples if all values are rounded to 0 or 1? (both during training and test) (Maybe adversarial for $L^1$ norm now, change the coordinates with largest gradient.)
* PCA. Can we just kill coefficients of large components? Can we train adversarially against these?
* Enforce sparsity (or recover manifold) in hidden layers.
* "How much more does it cost to train this example correctly?"

## Blog posts

* [breaking linear classifiers](http://karpathy.github.io/2015/03/30/breaking-convnets/) [h](http://scrible.com/s/6wE0Q)
* [myths](http://www.kdnuggets.com/2015/07/deep-learning-adversarial-examples-misconceptions.html) [h](http://scrible.com/s/4wU0Q)
* [OpenAI blog post](https://openai.com/blog/adversarial-example-research/)

## Literature

* [SZSB14] Intriguing properties of neural networks [paper](https://arxiv.org/pdf/1312.6199.pdf?not-changed)
* Ian J Goodfellow, Jonathon Shlens, and Christian Szegedy. Explaining and harnessing adversarial examples. arXiv preprint arXiv:1412.6572, 2014.
* [NYC15] Deep Neural Networks are Easily Fooled - High Confidence Predictions for Unrecognizable Images
* [Papernot 2016]: construct substitute model. Synthesizes training set.
* [Moosavi-Dezfooli 2016]: universal perturbation that transfers
* [LCLS17] Delving into Transferable Adversarial Examples and Black-box Attacks

## Experiments

* Reproduce adversarial examples result on a simple dataset, e.g. MNIST.
* Try training an ensemble of NN in parallel and compare to predictions of a single one.

## Theory

* Think in terms of learning theory, VC dimension...

# [LCLS17] Delving into Transferable Adversarial Examples

1. Model, training data, training process, test label set unknown to attacker.
2. Large dataset (ImageNet)
3. Do not construct substitute model

What is the difference between targeted and non-targeted transferability?

1. Non-targeted: $x^*\approx x$, $f_\te(x^*)\ne f_\te(x) = y$. (Constrain $d(x,x^*)\le B$.)
2. Targeted: $x^*\approx x$, $f_\te(x^*)=y^*$.

3 approaches: Suppose $f = \max_i J_\te(x)_i$, where $J_\te(x)$ is vector of probabilities.

1. Optimization $\amin_{x^*} \la d(x,x^*) - \ell(\one_y, J_\te(x^*))$. Ex. $\ell(u,v) = \ln (1-u\cdot v)$.
2. Fast gradient $x^* \leftarrow \text{clamp}(x+B\sign (\nb_x \ell(\one_y, J_\te(x))))$.
3. Fast gradient sign $x^* \leftarrow \text{clamp}\pa{x+B\nv{\nb_x\ell(\one_y, J_\te(x))}}$.

Approaches for targeted: Replace constraint with $f_\te(x^*)=y^*$


1. Optimization $\amin_{x^*} \la d(x,x^*) \redd{+} \redd{\ell'(\one_{y^*}}, J_\te(x^*))$. Ex. $\ell'(u,v) = \redd{-\sum_i u_i \lg v_i}$.
2. Fast gradient $x^* \leftarrow \text{clamp}(x\redd{-}B\sign (\nb_x \redd{\ell'(\one_{y^*}}, J_\te(x))))$.
3. Fast gradient sign $x^* \leftarrow \text{clamp}\pa{x\redd{-}B\nv{\nb_x\redd{\ell'(\one_y}, J_\te(x))}}$.

## Experiments

Choose 100 images (ILSVRC2012 dataset) which can be correctly classified by all 5 models.

Non-target transferability: accuracy = percentage of adversarial examples for one model correctly classified for the other. (For NN to be good, want this to be high)

Targeted transferability: matching rate = percentage of adversarial examples classified as target label by other model. (Want this to be low)

Root mean square deviation $d(x^*,x) = \sfc{\sum_i (x_i^*-x_i^2)}{N}$.

Q: isn't the optimizer using gradient information? (We can estimate it by sampling though!)

Use small learning rate to generate images with RMSD<2. Actually can set $\la=0$.

(Accuracy is low. But what is the confidence?)

* Optimization can mislead the models.
* FG cannot fully mislead the models. A potential reason is that, FG can be viewed as approximating the optimization, but is tailored for speed over accuracy.

Find the minimal transferable RMSD by linear search.

Note FGS minimizes distortion's $L_\iy$ norm while FG minimizes $L_2$ norm.

Target labels do not transfer. Fast gradient-based approaches don't do well because they only search in 1-D subspace.

## Ensemble-based approaches

These do better! If an adversarial image remains adversarial for multiple models, it is more likely to transfer to other models.
$$
\amin_{x^*} -\ln \pa{\pa{\sumo ik \al_i J_i(x^*)}\cdot \one_{y^*}} + \la d(x,x^*)
$$
For each of the five models, we treat it as the black-box model to attack, and generate adversarial images for the ensemble of the rest four, which is considered as white-box. This attack does well!

Non-targeted adversarial images have almost perfect transferability!

Fast gradient doesn't work with ensemble.

## Geometry

* The gradient directions of different models in our evaluation are almost orthogonal to each other. - this makes sense
* Choose 2 orthogonal directions, one being a gradient direction. There are up to 21 different regions
	* Boundaries align well.
	* Boundary diameter along gradient direction smaller. (Even in the direction of increasing the prediction probability!)
	
# Questions

* Can you use adversarial examples to improve training?
* What if you try denoising first?
