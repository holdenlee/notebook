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

* Look at which samples are misclassified by which networks: are they the same or different?
    * Jaccard similarity
	* How about if you train an ensemble together on regular examples?
* Baselines
	* How transferable are adversarial examples between the 100 networks?
	* How well does majority do against adversarial example against the mixture?
* Does clamping help?
* Examine activations of adversarial examples in hidden layer. Do they look different for adversarial examples?
* What are the weights given to the networks in the mixture? How does this change over time?
* Try training with independent updates, multiplicative weights.
	* (Check YZ's code.)
	* Try sleeping, etc. - regularize more strongly so that weights don't become too small/large.
* Hyperparameter search
* Autoencoder idea
* Regularization/Lipschitz/wavelet idea
* Is pretraining necessary?
* Compare 100 networks to 1 network with 100x size. Which does better?

## Nice things

* Set up tensorboard to show histograms, real and adversarial images, etc.
* Run with many different settings.

# Done

* Port over to own training loop. 
* End - save
* Output accuracies, etc. over time as list.
* Plotting!
