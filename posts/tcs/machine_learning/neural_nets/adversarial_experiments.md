---
title: Adversarial experiments
published: 2017-03-02
modified: 2017-03-02
tags: neural nets, uncertainty, aaml
type: research
showTOC: True
---

See [github](https://github.com/holdenlee/adversarial).

# Results

Trained for 100 epochs. Accuracy (out of 1)

| Mixture\\Attack | 0.3 fgs | 0.5 fgs | 1.0 fgs (sanity check) | 
| --- | --- | --- | --- |
| 1 | ? | ? | ? |
| 10 | ? | ? | ? |
| 100 | ? | ? | ? |


# Todo

## To solve the problem

* $L^1$ regularization
    * Multiplicative weights
	    * Try training with independent updates, multiplicative weights.
		* (Check YZ's code.)
		* Try sleeping, etc. - regularize more strongly so that weights don't become too small/large.
* Posterior over parameters - use to estimate class of new example
	* Fisher information or Langevin
	* If this fails, it suggests the objective is wrong. The net with smallest objective value (including any implicit regularization) does NOT generalize. Try a different regularization.
* Autoencoder idea 
* Regularization/Lipschitz/wavelet idea
    * Problem: wavelet would penalize rotation; it's hard to do rotation invariance
* Take top $k$ only.
* Normalization (batch normalization? vs. just normalize current)
* Train with confidence, uncertainty - vote to abstain
* Path norm

## Exploratory

* Baselines
	* How transferable are adversarial examples between the 100 networks? DO THIS
	* How well does majority do against adversarial example against the mixture?
* Examine activations of adversarial examples in hidden layer. Do they look different for adversarial examples? (cf. Dan: max softmax)
* What are the weights given to the networks in the mixture? How does this change over time?
* Is pretraining necessary?
* Compare 100 networks to 1 network with 100x size. Which does better?
* Adversarial examples for autoencoders?

## Nice things

* Set up tensorboard to show histograms, real and adversarial images, etc.
* Run with many different settings.

# Half-done

* Look at which samples are misclassified by which networks: are they the same or different?
    * Jaccard similarity
	* How about if you train an ensemble together on regular examples?
* Does clamping help?

# Done

* Correlation between correct classifications for independent networks (correlated, ~0.3)
* Correlation between gradients for different networks (not correlated)
* Port over to own training loop. 
* End - save
* Output accuracies, etc. over time as list.
* Plotting!
* Hyperparameter search
* Correlation between correct classifications

# Experiments 4/5/17

