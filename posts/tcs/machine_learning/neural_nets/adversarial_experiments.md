---
title: Adversarial experiments
published: 2017-03-02
modified: 2017-03-02
tags: neural nets, uncertainty, aaml
type: research
showTOC: True
---

# Results

Trained for 100 epochs. Accuracy (out of 1)

| Mixture\\Attack | 0.3 fgs | 0.5 fgs | 1.0 fgs (sanity check) | 
| --- | --- | --- | --- |
| 1 | 0.9133 | 0.8890 | 0.9862 |
| 100 | 0.9933 | 0.9932 | 0.9922 |

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
* Port over to own training loop.
* Output accuracies, etc. over time as list.

# Code to run

In `adversarial/`,
```
. start # do every time to set up virtualenv
# pretrain 100  nets
mkdir pretrain
nohup python train_many_run.py --t=100 > pretrain/log.txt 2>&1 &
# control
mkdir baseline_epochs100_ep0.3 
nohup python mnist_tutorial_tf.py --nb_epochs=100 > baseline_epochs100_ep0.3/log.txt 2>&1 &
# train mixture of 100
mkdir train_mix100_pretrain1_epochs100_ep0.3_reg1
nohup python train_mix.py --t=100 --nb_epochs=100 > train_mix100_pretrain1_epochs100_ep0.3_reg1/log.txt 2>&1 &
# control 0.5
mkdir baseline_epochs100_ep0.5
nohup python mnist_tutorial_tf.py --nb_epochs=100 --epsilon=0.5 > baseline_epochs100_ep0.5/log.txt 2>&1 &
# train mixture of 100 @ 0.5
mkdir train_mix100_pretrain1_epochs100_ep0.5_reg1
nohup python train_mix.py --t=100 --nb_epochs=100 --epsilon=0.5 > train_mix100_pretrain1_epochs100_ep0.5_reg1/log.txt 2>&1 &
# Sanity check
mkdir baseline_epochs100_ep1
nohup python mnist_tutorial_tf.py --nb_epochs=100 --epsilon=1.0 --train_dir=baseline_epochs100_ep1/ > baseline_epochs100_ep1/log.txt 2>&1 &
mkdir train_mix100_pretrain1_epochs100_ep1_reg1
nohup python train_mix.py --t=100 --nb_epochs=100 --epsilon=1.0 > train_mix100_pretrain1_epochs100_ep1_reg1/log.txt 2>&1 &
```
